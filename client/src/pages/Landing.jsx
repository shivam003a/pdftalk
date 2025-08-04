import Navbar from '../components/common/Navbar'
import Hero from "../components/landing/Hero"
import Features from '../components/landing/Features'
import HowItWorks from "../components/landing/HowItWorks"
import FAQs from '../components/landing/FAQs'
import Footer from '../components/common/Footer'

export default function Landing() {

    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <FAQs />
            <Footer />
        </>
    )
}