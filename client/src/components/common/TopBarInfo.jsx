import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function TopBarInfo() {
    const [visible, setVisible] = useState(false)

    const handleHideBar = () => {
        localStorage.setItem('noticeBarDismissed', "true")
        setVisible(false)
    }

    useEffect(() => {
        const dismissed = localStorage.getItem('noticeBarDismissed')
        if (dismissed !== "true") {
            setVisible(true)
        }
    }, [])

    if (!visible) {
        return null;
    }

    return (
        <>
            <div className="w-full bg-s-text text-yellow-900 text-sm overflow-hidden">
                <div className="max-w-[1200px] mx-auto flex items-center px-4 py-1 relative overflow-hidden">
                    <div className="animate-marquee inline-block font-semibold text-red-600">
                        🚀 This site is deployed on a free Render instance — the server might take a few seconds to wake up.
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