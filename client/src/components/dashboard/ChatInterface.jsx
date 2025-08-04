import { Download, Loader, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ChatInterface({ chatId }) {
    const [query, setQuery] = useState('')
    const [loadingState, setLoadingState] = useState(false)
    const [messages, setMessages] = useState([])
    const messageRef = useRef(null)
    const { chat, loading, error } = useSelector((state) => state.chat)

    const handleAskQuery = async (e) => {
        e.preventDefault();

        if (!chatId) {
            toast.error("No chatId provided")
        }

        setLoadingState(true)
        try {
            if (query.trim()) {
                setMessages((prev) => (
                    [...prev, {
                        role: 'user',
                        content: query
                    }]
                ))
            }
            setQuery('')

            const response = await fetch(`${import.meta.env.VITE_BE_URI}/api/query`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    chatId: chatId,
                    query: query
                }),
                credentials: 'include'
            })

            const body = await response.json()

            if (response.ok) {
                setMessages(body?.data)
            } else {
                toast.error(body?.message)
            }
        } catch (e) {
            toast.error(e?.message)
            setLoadingState(false)
        }
        setLoadingState(false)
    }

    const exportChat = () => {
        let textContent = ""
        textContent += `PDFurl: ${chat.pdfUrl}\n\n\n`

        for (let i = 0; i < messages.length; i += 2) {
            const question = messages[i]?.content || "";
            const answer = messages[i + 1]?.content || "";

            textContent += `Question: ${question}\n\n`;
            textContent += `Answer: ${answer}\n\n\n\n`
        }

        const blob = new Blob([textContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a');
        link.href = url;
        link.download = `${chat.chatName}.text`
        link.click();

        URL.revokeObjectURL(url)

    }

    useEffect(() => {
        setMessages(chat?.messages)
    }, [chat, chatId])

    useEffect(() => {
        if (messageRef?.current) {
            messageRef?.current.scrollIntoView({ behaviour: 'smooth' })
        }
    }, [messages])

    if (!chat?._id) {
        return <div className="w-full h-screen flex justify-center items-center font-poppins text-off-white text-xl">
            No Chat Found.
        </div>
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                {/* pdf */}
                <div className='hidden sm:flex w-4/10 h-full overflow-x-hidden overflow-y-auto style-scrollbar style-scrollbar justify-center items-center'>
                    {chat?.pdfUrl ? (
                        <iframe
                            src={`${chat?.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                            className='w-full h-full'
                            type="application/pdf"
                            style={{ border: 'none' }}
                            title='PDF Viewer'
                        />
                    ) : (
                        <span className="font-poppins text-off-white">No PDF to load!</span>
                    )}
                </div>

                {/* chat */}
                <div className='w-full sm:w-6/10 h-screen relative'>
                    <div className="mx-auto max-w-[900px] w-full h-full flex items-center justify-center overflow-auto">
                        <div className="w-full h-full flex flex-col gap-2 p-2 overflow-x-hidden overflow-y-auto pb-16 style-scrollbar">
                            {
                                messages && messages.length > 0 && messages.map((m) => {
                                    const sender = m?.role;
                                    return (
                                        <div
                                            className={`bg-primary text-off-white p-2 max-w-8/10 font-poppins font-light rounded-lg text-sm whitespace-pre-wrap ${sender === 'ai' ? 'self-start' : 'self-end'}`}
                                            key={m?.id}>
                                            {m.content}
                                        </div>
                                    )
                                })
                            }
                            {loadingState &&
                                <div className={`bg-primary text-off-white p-2 max-w-8/10 font-poppins rounded-lg text-sm self-start`}>
                                    <Loader className="animate-spin" size={18} strokeWidth={1} />
                                </div>
                            }
                            <div ref={messageRef}></div>
                        </div>

                        {/* questiion input */}
                        <form onSubmit={handleAskQuery} className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center justify-center w-7/10 backdrop-blur-md rounded-3xl bg-amber-50/20 px-2 py-3 gap-2">
                            <input
                                type="text"
                                placeholder="Ask a question"
                                value={query}
                                onChange={(e) => setQuery(e?.target?.value)}
                                className="w-9/10 border-0 outline-0 text-off-white chat-input font-poppins text-sm font-light"
                            />
                            <button type="submit">
                                <Send color="#faf9f6" strokeWidth={1} size={20} />
                            </button>
                        </form>

                        {/* export */}
                        {
                            messages && messages?.length > 0
                            && <div className="absolute right-0 top-3 bg-s-text px-2 py-3 rounded-l-lg cursor-pointer" onClick={exportChat}>
                                <Download strokeWidth={2} color="black" size={16} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}