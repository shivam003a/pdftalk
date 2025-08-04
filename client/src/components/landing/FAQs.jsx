import { faqs } from "../../utils/faqs"
import Accordian from "../common/Accordian"

function FAQs() {
    return (
        <>
            <div className="bg-secondary">
                <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-start gap-4 p-3">
                    <span className="text-s-text font-poppins my-8 text-4xl font-semibold">
                        FAQs
                    </span>

                    <div className="w-full flex flex-col gap-2 mb-8">
                        {
                            faqs.map((faq, index) => (
                                <Accordian key={index} question={faq?.question} answer={faq?.answer} index={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FAQs