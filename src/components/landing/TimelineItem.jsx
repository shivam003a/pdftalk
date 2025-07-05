import Image from "next/image"

function TimelineItem({ data, index }) {
    return (
        <>
            <div className={`w-8/10 sm:w-4/10 bg-s-text rounded-xl p-2 translate-x-5 relative ${index % 2 ? "sm:-translate-x-[52%]" : "sm:translate-x-[52%]"}`}>
                <div className={`absolute w-3 h-3 bg-blue-600 rounded-full -top-1 ${index % 2 ? '-left-4 sm:-right-4 sm:left-auto' : '-left-4 sm:-left-4'}`}></div>
                <div className={`flex gap-2 ${index % 2 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                    <div className="flex-7/10 flex flex-col gap-1">
                        <span className="text-2xl font-poppins font-bold">{data?.id}.</span>
                        <h2 className="font-poppins text-lg font-semibold text-primary">{data?.title}</h2>
                        <p className="font-poppins text-sm font-light">{data?.description}</p>
                    </div>
                    <div className="flex-3/10 rounded-xl overflow-hidden">
                        <Image
                            src="https://picsum.photos/200/200"
                            alt=""
                            className="w-full h-full object-cover"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TimelineItem