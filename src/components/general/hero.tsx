import React from "react"
import { Spotlight } from "@/components/aceternity/spotlight"
import { TextGenerateEffect } from "../aceternity/text-generate-effect"
import MagicButton from "../aceternity/magic-button"
import { Folders } from "lucide-react"
import { motion } from "framer-motion"

const Hero = () => {
  return (
    <div className="pb-20 pt-36 h-screen w-screen">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vh]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vh]" fill="blue" />
      </div>
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.025] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="flex justify-center relative my-20 z-10 align-middle h-full pb-64 border-b-2 border-neutral-800/50">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Hi, I'm Vishrut, a student based in Madison, Wisconsin"
          />
          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              delay: 1.5,
            }}
            className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl"
          >
            Welcome to my portfolio. Here, you will my projects, skills, and
            experiences that showcase my journey as a developer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              delay: 1.5,
            }}
            className="md:mt-10"
          >
            <a href="/#projects">
              <MagicButton
                icon={<Folders />}
                position="right"
                title="Explore My Work"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
