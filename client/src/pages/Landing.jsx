import Navbar from '../components/common/Navbar'
import Hero from "../components/landing/Hero"
import Features from '../components/landing/Features'
import HowItWorks from "../components/landing/HowItWorks"
import FAQs from '../components/landing/FAQs'
import Footer from '../components/common/Footer'
import TopBarInfo from '../components/common/TopBarInfo'

export default function Landing() {

    return (
        <>
            <TopBarInfo />
            <Hero />
            <Features />
            <HowItWorks />
            <FAQs />
            <Footer />
        </>
    )
}