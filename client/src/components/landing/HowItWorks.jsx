import { useRef } from "react";
import Timeline from "./Timeline";
import { motion, useInView } from 'motion/react'

export default function HowItWorks() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <div className="bg-primary">
            <div className="mx-auto flex max-w-[1200px] min-h-screen flex-col items-center justify-start gap-4 p-3">
                <motion.span
                    ref={ref}
                    className="text-s-text font-poppins my-8 text-4xl font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    How It Works?
                </motion.span>
                <Timeline />
            </div>
        </div>
    );
}
