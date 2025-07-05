import { lazy, Suspense } from "react";
import Loading from "../loading";

// Lazy imports
const Navbar = lazy(() => import('@/components/common/Navbar'))

export default function Login() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Navbar />
            </Suspense>
        </>
    )
}