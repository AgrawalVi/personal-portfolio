"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const transitionIn = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

const transitionOut = {
  type: "spring",
  mass: 0.7,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

export const MenuItem = ({
  setActive,
  active,
  lastActive,
  setLastActive,
  item,
  children,
}: {
  setActive: (item: string) => void
  active: string | null
  lastActive: string | null
  setLastActive: (item: string) => void
  item: string
  children?: React.ReactNode
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transitionIn}
        >
          {active === item && (
            <div className="absolute left-1/2 top-[calc(100%_+_1.2rem)] -translate-x-1/2 transform pt-4 z-[1000] backdrop-blur-lg backdrop-saturate-150">
              <motion.div
                transition={transitionIn}
                layoutId="active" // layoutId ensures smooth animation
                className="overflow-hidden shadow-xl backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(17, 25, 40, 0.75)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.125)",
                }}
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full w-max p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
      {active !== item && lastActive === item ? (
        <motion.div
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={transitionOut}
          className="pointer-events-none"
        >
          <div className="absolute left-1/2 top-[calc(100%_+_1.2rem)] -translate-x-1/2 transform pt-4 z-[1000] backdrop-blur-lg backdrop-saturate-150">
            <motion.div
              transition={transitionOut}
              layoutId="active" // layoutId ensures smooth animation
              className="overflow-hidden shadow-xl backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(17, 25, 40, 0.75)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }}
            >
              <motion.div
                layout // layout ensures smooth animation
                className="h-full w-max p-4"
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </div>
  )
}

export const Menu = ({
  active,
  setActive,
  setLastActive,
  children,
}: {
  active: string | null
  setActive: (item: string | null) => void
  setLastActive: (item: string | null) => void
  children: React.ReactNode
}) => {
  return (
    <nav
      onMouseLeave={() => {
        setLastActive(active)
        setActive(null)
      }}
      className="relative flex items-center justify-center space-x-4 px-8 py-6 rounded-lg z-[1000] backdrop-blur-lg backdrop-saturate-150"
      style={{
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)",
      }}
    >
      {children}
    </nav>
  )
}

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string
  description: string
  href: string
  src: string
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">{title}</h4>
        <p className="text-sm max-w-[10rem] text-neutral-300">{description}</p>
      </div>
    </Link>
  )
}

export const HoveredLink = ({ item, setActive, children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-200 hover:text-neutral-600 transition-all"
      onMouseEnter={() => setActive(item)}
    >
      {children}
    </Link>
  )
}
