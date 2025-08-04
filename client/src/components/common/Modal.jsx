import { X } from 'lucide-react'
import { useEffect } from 'react';

export default function Modal({ children, open, setOpen, headerTitle, verticalAlign = "items-center" }) {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e?.key === 'Escape') {
                console.log('clicked')
                setOpen(false)
            }
        }
        document.addEventListener('keydown', handleEsc)

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [setOpen])

    if (!open) {
        return null;
    }
    return (
        <div
            className={`w-screen h-screen fixed top-0 bottom-0 left-0 right-0 overflow-hidden z-100 flex ${verticalAlign} justify-center backdrop-blur-sm bg-off-white/5`}
            onClick={() => setOpen(false)}
        >
            <div className="max-w-[900px] max-h-[450px] w-full h-full sm:w-[700px] bg-primary p-4 rounded-lg overflow-hidden m-2"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-center justify-between pb-4'>
                    <span className='text-off-white font-poppins'>{headerTitle}</span>
                    <span
                        onClick={() => setOpen(false)}
                        className='cursor-pointer'
                    >
                        <X color='#faf9f6' />
                    </span>
                </div>
                <div className="max-h-[calc(450px-3rem)] h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}