"use client"
import React, { useEffect, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { HomeIcon } from "lucide-react"
import { Navbar } from "./navbar"

export const FloatingNav = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll()

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // wait 2 seconds before showing the floating navbar
    setTimeout(() => {
      setVisible(true)
    }, 2000)
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!

      if (direction < 0) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
          className
        )}
      >
        <Navbar />
      </motion.div>
    </AnimatePresence>
  )
}
