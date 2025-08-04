import { NavLink, useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Carousel from '../components/common/Carousel'
import { carouselSlides } from '../utils/carouselSlides'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { signUpZodSchema } from '../utils/zodSchema'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { authSuccess, authFailed, setLoading } from '../redux/slices/auth.slices'

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
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState({})
    const { loading } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleSignup(e) {
        e.preventDefault();
        dispatch(setLoading(true))

        try {
            // input field validation
            signUpZodSchema.parse({
                name: authDetail?.name,
                email: authDetail?.email,
                password: authDetail?.password
            })

            setError({})
            const response = await fetch(`${import.meta.env.VITE_BE_URI}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": 'application/json'
                },
                body: JSON.stringify({
                    name: authDetail?.name,
                    email: authDetail?.email,
                    password: authDetail?.password
                }),
                credentials: 'include'
            })

            const body = await response.json()

            if (response?.ok) {
                dispatch(authSuccess(body.data))
                toast.success(body?.message || "Registered!");
                navigate('/chat', { replace: true })
            } else {
                dispatch(authFailed(body?.message || "Something Went Wrong"))
                toast.error(body?.message || "Something went wrong");
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                const errorMessage = {};
                err.issues.forEach(e => {
                    const field = e.path.join('.');
                    errorMessage[field] = e.message;
                });
                setError(errorMessage);
            }
            else {
                dispatch(authFailed('An unexpected error occurred'))
                console.log(err)
                toast.error("An unexpected error occurred.");
            }
        }
        dispatch(setLoading(false))
    }

    return (
        <>
            <div className="w-screen h-dvh bg-primary bg-no-repeat bg-cover flex items-center justify-center">
                <div className="w-full h-full max-h-[900px] sm:h-9/10 max-w-[1200px] mx-auto flex items-center justify-center overflow-hidden">
                    {/* left div */}
                    <div className='w-full h-full flex-1/2 overflow-hidden hidden sm:flex'>
                        <Carousel
                            slides={carouselSlides}
                        />
                    </div>

                    {/* right div */}
                    <div className='w-full h-full flex-1/2 flex flex-col items-center justify-start bg-off-white p-6 gap-8'>
                        <div className='w-full flex items-center justify-end relative'>
                            <NavLink to={'/'}>
                                <img
                                    src="/pdftalk_black.png"
                                    width={84}
                                    height={28}
                                    alt="pdftalk"
                                    className='h-16 absolute -top-5 -left-3 sm:hidden'
                                />
                            </NavLink>
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
                                        <>
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
                                            {error[input?.name] && <span className='text-red-500 text-[10px] font-poppins -mt-3 font-light'>{error[input?.name]}</span>}
                                        </>
                                    ))
                                }
                                <button
                                    className='flex justify-center mt-4 bg-s-text text-primary font-semibold py-3 px-6 font-poppins text-sm rounded-md text-center'
                                    onClick={handleSignup}
                                    disabled={loading}
                                >
                                    {loading ? <Loader
                                        className='animate-spin text-center'

                                    /> : 'Sign Up'}
                                </button>
                                <span className='font-poppins text-sm text-center text-primary'>
                                    Already have an account?
                                    <NavLink to='/login' className="text-s-text"> Login</NavLink>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}