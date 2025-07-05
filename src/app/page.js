'use client';

import { lazy, Suspense } from "react";
import Loading from "./loading";

// Lazy imports
const Navbar = lazy(() => import("@/components/common/Navbar"));
const Hero = lazy(() => import("@/components/landing/Hero"));
const Features = lazy(() => import("@/components/landing/Features"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const FAQs = lazy(() => import("@/components/landing/FAQs"));
const Footer = lazy(() => import("@/components/common/Footer"));

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FAQs />
      <Footer />
    </Suspense>
  );
}
