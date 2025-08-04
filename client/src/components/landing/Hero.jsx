import { NavLink } from "react-router-dom";
import { motion } from 'motion/react'
import { useSelector } from "react-redux";
import Navbar from "../common/Navbar";
import Modal from "../common/Modal";
import { useState } from "react";
import Lottie from 'lottie-react'
import AiNetworkAnimation from '../../lottie/ai_network.json'
import RobotBye from '../../lottie/robot_goodbye.json'

const animArray = [RobotBye, AiNetworkAnimation]

function Hero() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false)
  const [animationIndex, setAnimationIndex] = useState(0)

  const handleAnimationComplete = (e) => {
    setAnimationIndex((prev) => (prev + 1) % animArray.length)
  }

  return (
    <>
      <div className="from-primary to-secondary bg-gradient-to-bl">
        {/* navbar */}
        <Navbar />

        {/* home */}
        <div className="relative mx-auto flex flex-col md:flex-row min-h-screen max-w-[1200px] items-center justify-between gap-6 p-3">
          <motion.div
            key={animationIndex}
            className="flex-8/20 flex justify-center items-center aspect-square"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Lottie
              animationData={animArray[animationIndex]}
              loop={false}
              className="w-8/10"
              onComplete={handleAnimationComplete}
            />
          </motion.div>
          <motion.div
            className="flex flex-12/20 flex-col gap-2 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-p-text font-poppins text-6xl leading-18 font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Chat With Your PDFs. Instantly.
            </motion.h1>
            <motion.h3
              className="text-s-text font-poppins mt-2 text-lg font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}>
              Ask questions, extract insights, and search any PDF with smart AI. Save chats, pick up where you left off — it's your personal research assistant.
            </motion.h3>
            <motion.div
              className="mt-12 flex flex-col justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <NavLink
                to={"/login"}
                className="border-s-text font-poppins text-s-text w-full md:w-2/3 rounded-lg border-1 px-8 py-3 text-lg hover:bg-s-text hover:text-primary transition-all duration-600 ease-in-out"
              >
                {isAuthenticated ? '🚀 Get Started' : '🔐 Login to Get Started'}
              </NavLink>
              <button
                className="text-start bg-s-text font-poppins w-full md:w-2/3 rounded-lg px-8 py-3 text-lg hover:bg-p-text transition-all duration-600 ease-in-out cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
              >
                📄 Watch How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* modal */}
        <Modal
          open={open}
          setOpen={setOpen}
          headerTitle={'Website Demo'}
        >
          <video
            className="w-full h-full"
            controls
            controlsList="nodownload noremoteplayback nopictureinpicture"
            muted
            playsInline
            autoPlay
            disablePictureInPicture
          >
            <source src="/media/pdftalk_sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal>
      </div>
    </>
  );
}

export default Hero;
