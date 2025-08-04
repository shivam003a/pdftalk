'use client'

import { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react';

function Accordian({ question, answer }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-primary w-full rounded-xl transition-all duration-200 ease-in-out">
            <div
                className="flex justify-between p-4 items-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <span className="text-white font-poppins text-sm font-medium">
                    {question}
                </span>
                <span className="text-white">
                    {open ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                </span>
            </div>

            {/* Transition Container */}
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${open ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
            >
                <div className="text-[#90a8b2] text-sm font-poppins px-4 pb-4">
                    {answer}
                </div>
            </div>
        </div>
    )
}

export default Accordian
