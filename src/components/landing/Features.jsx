import { useRef } from "react";
import { features } from "../../utils/features.js";
import { motion, useInView } from "motion/react";

function Features() {
    const titleRef = useRef(null)
    const elementRef = useRef(null)

    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" })
    const isElementInView = useInView(elementRef, { once: true, margin: "-100px" })

    return (
        <>
            <div className="bg-secondary">
                <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-start gap-4 p-3">
                    <motion.span
                        className="text-s-text font-poppins my-8 text-4xl font-semibold"
                        ref={titleRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        Features
                    </motion.span>
                    <div
                        className="mb-8 flex w-full flex-col items-stretch justify-start"
                        ref={elementRef}
                    >
                        {features.map((i, idx) => (
                            <motion.div
                                key={idx}
                                className={`${i?.bgColor} group flex cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden p-3 text-black transition-all duration-300`}
                                initial={{ opacity: 0 }}
                                animate={isElementInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="text-xl font-poppins">{i?.icon}</div>
                                    <div className="text-sm font-medium font-poppins">{i?.title}</div>
                                </div>

                                <div className="mt-2 flex max-h-0 flex-col gap-2 text-sm opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                                    {i?.description?.map((j, key) => (
                                        <span className="font-poppins text-xs" key={key}>{"> " + j}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Features