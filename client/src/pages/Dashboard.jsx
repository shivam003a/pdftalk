import { useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import UploadPdf from '../components/dashboard/UploadPdf'
import ChatInterface from '../components/dashboard/ChatInterface'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getChatById } from '../redux/slices/chat.slices';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

function Dashboard({ layout }) {
    const { chatId } = useParams();

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchChat = async () => {
            if (chatId) {
                let response = await dispatch(getChatById(chatId));
                if (getChatById.fulfilled.match(response)) {
                    toast.success("Chat Fetched");
                } else {
                    toast.error(response?.payload);
                }
            }
        };

        fetchChat();
    }, [chatId, dispatch]);


    return (
        <>
            <Helmet>
                <title>Dashboard – Chat with Your PDFs | PDFTalk AI</title>
                <meta
                    name="description"
                    content="Chat with your uploaded PDFs in real time. AI-powered Retrieval-Augmented Generation (RAG) with LangChain, HuggingFace, and Pinecone for accurate answers."
                />
            </Helmet>

            <div className="w-screen h-dvh bg-secondary">
                <div className="w-full h-full mx-auto overflow-hidden flex items-center justify-center">
                    <Sidebar
                        chatId={chatId}
                    />
                    <div className='w-full h-dvh flex items-center justify-center'>
                        {
                            layout === 'upload' ? (
                                <UploadPdf />
                            ) : (
                                <ChatInterface
                                    chatId={chatId}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;