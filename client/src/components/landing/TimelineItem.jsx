import { motion, useInView } from 'motion/react'
import { useRef } from "react"

function TimelineItem({ data, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <>
            <motion.div
                className={`w-8/10 sm:w-4/10 bg-s-text rounded-xl p-2 translate-x-5 relative ${index % 2 ? "sm:-translate-x-[52%]" : "sm:translate-x-[52%]"}`}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className={`absolute w-3 h-3 bg-blue-600 rounded-full -top-1 ${index % 2 ? '-left-4 sm:-right-4 sm:left-auto' : '-left-4 sm:-left-4'}`}></div>
                <div className={`flex gap-2 ${index % 2 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                    <div className="flex-7/10 flex flex-col gap-1">
                        <span className="text-2xl font-poppins font-bold">{data?.id}.</span>
                        <h2 className="font-poppins text-lg font-semibold text-primary">{data?.title}</h2>
                        <p className="font-poppins text-sm font-light">{data?.description}</p>
                    </div>
                    <div className="flex-3/10 rounded-xl overflow-hidden">
                        <img
                            src={data?.image}
                            alt=""
                            className="w-full h-full object-cover"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default TimelineItem