import { useSelector } from 'react-redux'
import { SquarePlus, PanelRight, Search, LogOut, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/auth.slices.js'
import { Loader } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAllChats, deleteChatById } from '../../redux/slices/chat.slices.js'
import toast from 'react-hot-toast'
import Modal from '../common/Modal'

export default function Sidebar({ chatId }) {
    const { user } = useSelector((state) => state.auth)
    const { chats, loading } = useSelector((state) => state.chat)
    const [showSidebar, setShowSidebar] = useState(false)
    const [open, setOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchChats, setSearchChats] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSidebar = (e) => {
        setShowSidebar((prev => !prev))
    }

    const handleLogout = async (e) => {
        e?.stopPropagation();

        const toastId = toast.loading('Logging out...')
        const result = await dispatch(logout())
        if (logout.fulfilled.match(result)) {
            navigate('/login', { replace: true })
            toast.dismiss(toastId)
            toast.success(result?.payload?.message)
        } else {
            toast.dismiss(toastId)
            toast.error(result?.payload)
        }
    }

    const removeChatById = async (deleteChatId) => {
        const toastId = toast.loading("Deleting...")
        const result = await dispatch(deleteChatById({ deleteChatId, chatId }))
        if (deleteChatById.fulfilled.match(result)) {
            toast.dismiss(toastId)
            toast.success("Chat deleted Successfully")
            if (result.payload?.redirect) {
                navigate('/chat', { replace: true })
            }
        } else {
            toast.dismiss(toastId)
            toast.error("Error deleting chat")
        }
    }

    useEffect(() => {
        dispatch(getAllChats())
    }, [])

    useEffect(() => {
        if (window.innerWidth >= 640) {
            setShowSidebar(true)
        } else {
            setShowSidebar(false)
        }
    }, [])

    useEffect(() => {
        const timerId = setTimeout(() => {
            const filterChats = chats?.filter((chat) => (
                chat?.chatName?.toLowerCase().includes(searchText.toLowerCase())
            ))
            setSearchChats(filterChats)
        }, 300)

        return () => {
            clearTimeout(timerId)
        }
    }, [searchText, chats])

    return (
        <>
            <aside className={`${showSidebar ? 'w-60' : 'w-10'} h-screen bg-primary transition-all duration-300 linear overflow-hidden flex flex-col`}>
                {/* logo and side button for expanding and contracticting */}
                <div className='p-2 flex items-center justify-between'>
                    <NavLink to={'/'}>
                        <img
                            src='/pdftalk.png'
                            alt='pdftalk'
                            className={`${showSidebar ? 'flex' : 'hidden'} w-14 h-9`}
                        />
                    </NavLink>
                    <div onClick={handleSidebar} className='cursor-pointer'>
                        <PanelRight color='#faf9f6' size={22} strokeWidth={1} />
                    </div>
                </div>

                {/* tools */}
                <div className='mt-4 flex flex-col gap-3 p-2'>
                    <div className='w-full flex items-center justify-start gap-2 cursor-pointer' onClick={() => navigate('/chat', { replace: true })}>
                        <div><SquarePlus color='#faf9f6' size={22} strokeWidth={1} /></div>
                        <span className={`${showSidebar ? 'flex' : 'hidden'} text-off-white font-poppins text-xs`}>New chat</span>
                    </div>
                    <div className='w-full flex items-center justify-start gap-2 cursor-pointer' onClick={(e) => setOpen((prev) => !prev)}>
                        <div><Search color='#faf9f6' size={22} strokeWidth={1} /></div>
                        <span className={`${showSidebar ? 'flex' : 'hidden'} text-off-white font-poppins text-xs`}>Search chats</span>
                    </div>
                </div>

                {/* chats */}
                <div className={`${showSidebar ? 'flex flex-col' : 'hidden'} p-2 pr-0 mt-2 overflow-y-hidden h-full`}>
                    <div className='text-xs text-[#B2BEB5] mb-2'>Chats</div>
                    <div className='w-full h-full flex justify-center items-start overflow-x-hidden overflow-y-auto style-scrollbar'>
                        {
                            loading ? (<Loader color='#faf9f6' strokeWidth={1} className='animate-spin' />) : (
                                <div className='flex flex-col items-start justify-start gap-2 w-full pr-2'>
                                    {
                                        chats && chats.length > 0 && chats.map((chat, i) => (
                                            <div
                                                className='text-xs text-off-white w-full h-full font-poppins cursor-pointer hover:bg-secondary p-1 whitespace-nowrap overflow-hidden rounded-sm flex justify-between gap-2'
                                                onClick={() => navigate(`/chat/${chat?._id}`)}
                                                key={`chats-${i}`}
                                            >
                                                <span className='w-9/10 overflow-hidden'>{chat.chatName}</span>
                                                <span
                                                    className='w-1/10'
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        removeChatById(chat._id)
                                                    }}
                                                >
                                                    <Trash color='#faf9f6' strokeWidth={1} size={16} />
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* profile fixed */}
                <div className="w-full flex items-center justify-between bg-primary hover:bg-secondary cursor-pointer">
                    <div className={`${showSidebar ? 'flex' : 'hidden'} items-center`}>
                        <div className='w-7 h-7 m-2 rounded-full bg-red-200 flex items-center justify-center font-poppins text-primary aspect-square'>{user?.name[0]}</div>
                        <div className='flex flex-col my-2'>
                            <span className='text-off-white font-poppins text-[13px]'>{user?.name}</span>
                            <span className='text-[#B2BEB5] font-poppins text-[10px]'>{'Free'}</span>
                        </div>
                    </div>
                    <div className='m-2' onClick={handleLogout}><LogOut color='#faf9f6' size={20} strokeWidth={1} /></div>
                </div>

                {/* search modal */}
                <Modal
                    headerTitle={'Search'}
                    open={open}
                    setOpen={setOpen}
                    verticalAlign='items-start pt-20'
                >
                    <div className='flex flex-col h-full'>
                        <input
                            name='search'
                            placeholder='Search chats'
                            className='py-3 px-2 bg-secondary w-full border-0 outline-0 text-off-white search-input mb-2 rounded-lg'
                            value={searchText}
                            onChange={(e) => setSearchText(e?.target?.value)}
                        />

                        <div className='flex-1 h-full gap-2 overflow-x-hidden overflow-y-auto style-scrollbar pb-3'>
                            {Array.isArray(searchChats) && searchChats.length > 0 ? (
                                searchChats.map((chat) => (
                                    <div
                                        className="hover:bg-secondary p-2 rounded-lg text-off-white font-poppins text-xs cursor-pointer"
                                        onClick={() => {
                                            setOpen(false);
                                            navigate(`/chat/${chat?._id}`);
                                        }}
                                        key={chat?._id}
                                    >
                                        {chat?.chatName}
                                    </div>
                                ))
                            ) : (
                                <div className="text-off-white font-poppins text-xs opacity-60">
                                    No chats found
                                </div>
                            )}

                        </div>
                    </div>
                </Modal>
            </aside>
        </>
    )
}