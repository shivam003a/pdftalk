import { useEffect, useState } from "react"
import { X } from "lucide-react"

const SHOW_NOTICE = import.meta.env.VITE_SHOW_NOTICE === "true";
const NOTICE_MESSAGE = import.meta.env.VITE_NOTICE_MESSAGE || "";

export default function TopBarInfo() {
    const [visible, setVisible] = useState(false)

    const handleHideBar = () => {
        localStorage.setItem('noticeBarDismissed', "true")
        setVisible(false)
    }

    useEffect(() => {
        if (!SHOW_NOTICE) {
            return;
        }
        const dismissed = localStorage.getItem('noticeBarDismissed')
        if (dismissed !== "true") {
            setVisible(true)
        }
    }, [])

    if (!visible || !SHOW_NOTICE || !NOTICE_MESSAGE) {
        return null;
    }

    return (
        <>
            <div className="w-full bg-s-text text-yellow-900 text-sm overflow-hidden">
                <div className="max-w-[1200px] mx-auto flex items-center justify-center px-4 py-1 relative overflow-hidden">
                    <div className="w-full animate-marquee inline-block font-semibold text-red-600 text-nowrap">
                        {NOTICE_MESSAGE}
                    </div>
                    <button
                        className="bg-s-text absolute right-0 top-1/2 -translate-y-1/2 text-xl font-bold text-yellow-900 hover:text-yellow-700 cursor-pointer"
                        onClick={handleHideBar}
                    >
                        <X size={18} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </>
    )
}