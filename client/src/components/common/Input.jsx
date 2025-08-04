'use client'
import { useState } from "react"
import { IoPersonSharp } from "react-icons/io5"
import { MdMailOutline, MdLockOutline } from "react-icons/md"
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function Input({ element, icon, type, name, placeholder, className, value, onChange }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='flex items-center justify-start gap-4 p-2 self-stretch border-b border-gray relative'>
            {
                icon === 'name' ? (
                    <IoPersonSharp size={16} />
                ) : (icon === 'password' ? (
                    <MdLockOutline size={16} />
                ) : (<MdMailOutline size={16} />))
            }
            <input
                type={element === 'password' ? (showPassword ? 'text' : 'password') : ('text')}
                name={name}
                placeholder={placeholder}
                className={`${className} w-full border-0 outline-0 font-poppins font-light text-[13px]`}
                value={value}
                onChange={onChange}
            />
            {
                element === 'password' && <div className="absolute right-1 bottom-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
            }
        </div>
    )
}