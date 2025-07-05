import TimelineItem from "./TimelineItem"
import { howItWorkStep } from "../../utils/howItWork"

function Timeline() {
    return (
        <>
            <div className="w-full h-full relative flex justify-center items-center mb-8">
                <div className="absolute left-0 translate-x-2 sm:left-1/2 sm:-translate-x-1/2 h-full border-l-2 border-dotted border-s-text"></div>

                <div className="w-full flex flex-col items-start sm:items-center gap-8 sm:gap-14">
                    {
                        howItWorkStep.map((data, index) => <TimelineItem data={data} index={index} key={index} />)
                    }
                </div>

            </div>
        </>
    )
}

export default Timeline