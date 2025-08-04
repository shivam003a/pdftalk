import { useEffect, useState } from 'react';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom'

export default function Carousel({ slides }) {
    const [current, setCurrent] = useState(0)

    function goNext() {
        setCurrent((prev) => (prev + 1) % slides.length)
    }

    function goPrevious() {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides?.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* slides */}
            <div
                className='h-full flex transition-transform duration-500 ease-in-out'
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {
                    slides && slides?.length && slides?.map((slide, index) => (
                        <div
                            key={index}
                            className="w-full bg-cover bg-no-repeat flex-shrink-0 relative overlay"
                            // style={{ backgroundImage: `url('${slide?.src}')` }}
                            style={{ backgroundImage: `url(${slide.src})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        >
                            {/* overlay */}
                            <div className="absolute inset-0 bg-black/70" />

                            {/* content */}
                            <div className='relative z-10 w-full h-full flex flex-col gap-2 items-start justify-end px-4 pb-16'>
                                <span className='text-s-text font-poppins font-semibold tracking-wider text-3xl'>{slide?.title}</span>
                                <span className='text-[#cbc9c8] font-poppins font-light text-sm'>{slide?.description}</span>
                            </div>

                        </div>
                    ))
                }
            </div>

            {/* navigation buttons */}
            <NavLink to='/' className='p-4 absolute top-0 left-0'>
                <img
                    src='/pdftalk.png'
                    alt="pdftalk"
                    className="h-12"
                    width={96}
                    height={48}
                />
            </NavLink>
            <div className='flex gap-1 p-4 absolute left-0 bottom-0'>
                <button
                    onClick={goPrevious}
                    className='cursor-pointer'
                >
                    <CircleArrowLeft color='#cbc9c8' strokeWidth={1} size={26} />
                </button>
                <button
                    onClick={goNext}
                    className='cursor-pointer'
                >
                    <CircleArrowRight color='#cbc9c8' strokeWidth={1} size={26} />
                </button>
            </div>
        </div>
    )
}