'use client'
import Link from 'next/link'
import Input from '@/components/common/Input'
import Carousel from '@/components/common/Carousel'
import { carouselSlides } from '@/utils/carouselSlides'
import { useState } from 'react'

const signupArray = [
    {
        element: 'name',
        icon: 'name',
        type: 'text',
        name: 'name',
        placeholder: 'Your Name',
    },
    {
        element: 'email',
        icon: 'email',
        type: 'text',
        name: 'email',
        placeholder: 'Your Email',
    },
    {
        element: 'password',
        icon: 'password',
        type: 'password',
        name: 'password',
        placeholder: 'Password',
    }
]


export default function SignUp() {
    const [authDetail, setAuthDetail] = useState({
        email: '',
        password: ''
    })

    return (
        <>
            <div className="w-screen h-screen bg-primary bg-no-repeat bg-cover flex items-center justify-center">
                <div className="w-full h-full max-h-[900px] sm:h-9/10 max-w-[1200px] mx-auto flex items-center justify-center bg-white overflow-hidden">
                    {/* left div */}
                    <div className='w-full h-full flex-1/2 overflow-hidden hidden sm:flex'>
                        <Carousel
                            slides={carouselSlides}
                        />
                    </div>

                    {/* right div */}
                    <div className='w-full h-full flex-1/2 flex flex-col items-center justify-start bg-off-whitex p-6 gap-8'>
                        <div className='w-full flex items-center justify-end'>
                            <span className='bg-s-text text-primary font-semibold rounded-2xl py-2 px-7 font-poppins text-xs'>Sign up</span>
                        </div>
                        <div className='w-full h-full flex flex-col max-w-9/10 sm:max-w-8/10 p-4'>
                            <div className='flex flex-col gap-1'>
                                <h1 className='font-poppins text-3xl font-semibold text-primary'>Welcome to <span className='text-s-text'>pdfTalk!</span></h1>
                                <p className='font-poppins text-sm text-gray'>Create your account</p>
                            </div>

                            <div className='mt-10 flex flex-col gap-4'>
                                {
                                    signupArray?.map((input, index) => (
                                        <Input
                                            icon={input?.icon}
                                            type={input?.type}
                                            name={input?.name}
                                            placeholder={input?.placeholder}
                                            key={index}
                                            for={input?.element}
                                            element={input?.element}
                                            value={authDetail[input?.element] ?? ''}
                                            onChange={(e) => {
                                                setAuthDetail((prev) => ({
                                                    ...prev, [input?.element]: e?.target?.value
                                                }))
                                            }}
                                        />
                                    ))
                                }
                                <button className='mt-4 bg-s-text text-primary font-semibold py-3 px-6 font-poppins text-sm rounded-md'>Sign up</button>
                                <span className='font-poppins text-sm text-center text-primary'>
                                    Already have an account?
                                    <Link href='/login' className="text-s-text"> Login</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}