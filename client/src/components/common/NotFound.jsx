import Navbar from './Navbar';
import { NavLink } from 'react-router-dom'
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <div className="w-screen h-dvh bg-primary">

                <Navbar />
                {/* not found content */}
                <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center bg-primary text-s-text p-4">
                    <div className="w-full relative flex flex-col items-center justify-center">
                        <h1 className="text-[128px] font-bold text-secondary tracking-widest font-poppins">404</h1>
                        <p className="text-4xl font-semibold font-poppins tracking-wider absolute top-1/2 -translate-y-1/2 text-center">Lost? This page isn’t here</p>
                    </div>
                    <NavLink
                        to={"/"}
                        className="border-s-text font-poppins text-s-text mt-4 rounded-lg border px-8 py-3 text-lg flex items-center gap-2"
                    >
                        <ArrowLeft />
                        <span>Go back home</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
