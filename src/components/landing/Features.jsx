import { features } from "../../utils/features.js";

function Features() {
    return (
        <>
            <div className="bg-secondary">
                <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-start gap-4 p-3">
                    <span className="text-s-text font-poppins my-8 text-4xl font-semibold">
                        Features
                    </span>
                    <div className="mb-8 flex w-full flex-col items-stretch justify-start">
                        {features.map((i, idx) => (
                            <div
                                key={idx}
                                className={`${i?.bgColor} group flex cursor-pointer flex-col items-start justify-center gap-2 overflow-hidden p-3 text-black transition-all duration-300`}
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Features