'use client'

import React from 'react'
import { Spotlight } from '@/components/aceternity/spotlight'
import { TextGenerateEffect } from '../../aceternity/text-generate-effect'
import MagicButton from '@/components/aceternity/magic-button'
import { Folders } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="h-dvh w-full pb-20 pt-36">
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vh]"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vh]" fill="blue" />
      </div>
      <div className="absolute left-0 top-0 flex h-dvh w-full items-center justify-center bg-background bg-grid-black/[0.025] dark:bg-background dark:bg-grid-white/[0.025]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"></div>
      </div>

      <div className="relative z-10 my-20 flex h-full justify-center border-b-2 border-neutral-800/50 pb-64 align-middle">
        <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Hi, I'm Vishrut, a student based in Madison, Wisconsin"
          />
          <motion.p
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              delay: 1.5,
            }}
            className="mb-4 text-center text-sm md:text-lg md:tracking-wider lg:text-2xl"
          >
            Thank you for visiting my portfolio. Here, you will find my projects
            and experiences that showcase my journey as a Software Engineer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              delay: 1.5,
            }}
            className="md:mt-10"
          >
            <a href="/#education">
              <MagicButton
                icon={<Folders />}
                position="right"
                title="Learn More"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
