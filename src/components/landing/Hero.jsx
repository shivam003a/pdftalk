import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <>
      <div className="from-primary to-secondary bg-gradient-to-bl">
        <div className="relative mx-auto flex flex-col md:flex-row min-h-screen max-w-[1200px] items-center justify-between gap-4 p-3">
          <div className="flex-9/20">
            <Image
              src='/pdftalk_landing.png'
              alt="pdftalk"
              className="w-full md:w-[90%]"
              width={800}
              height={450}
            />
          </div>
          <div className="flex flex-11/20 flex-col gap-2 mb-8">
            <h1 className="text-p-text font-poppins text-6xl leading-18 font-bold">
              Chat With Your PDFs. Instantly.
            </h1>
            <h3 className="text-s-text font-poppins mt-2 text-lg font-light">
              Ask questions, extract insights, and search any PDF with smart AI. Save chats, pick up where you left off — it's your personal research assistant.
            </h3>
            <div className="mt-12 flex flex-col justify-center gap-3">
              <Link
                href={"/signup"}
                className="border-s-text font-poppins text-s-text w-full md:w-2/3 rounded-lg border-1 px-8 py-3 text-lg"
              >
                🔐 Login to Get Started
              </Link>
              <Link
                href={"/analysis"}
                className="bg-s-text font-poppins w-full md:w-2/3 rounded-lg px-8 py-3 text-lg"
              >
                📄 Try Demo Without Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
