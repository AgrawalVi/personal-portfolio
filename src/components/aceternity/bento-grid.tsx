"use client"

import { cn } from "@/lib/utils"
import { BackgroundGradientAnimation } from "./background-gradient-animation"
import { GridGlobe } from "../general/grid-globe"
import Lottie from "react-lottie"
import animationData from "@/data/confetti.json"
import { useState } from "react"
import MagicButton from "./magic-button"
import { Copy } from "lucide-react"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto lg:max-w-[80vw]",
        className
      )}
    >
      {children}
    </div>
  )
}

const email = process.env.NEXT_PUBLIC_EMAIL!

export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  id: number
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  img?: string
  imgClassName?: string
  titleClassName?: string
  spareImg?: string
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
  }

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white justify-between flex flex-col space-y-4 border border-white/[0.1]",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={cn(id === 6 && "flex justify-center", "h-full")}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn("object-cover object-center", imgClassName)}
            />
          )}
        </div>
        <div
          className={cn(
            "absolute right-0 -bottom-5",
            id === 5 && "w-full opacity-80"
          )}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 flex items-center justify-center text-white font-bold" />
          </BackgroundGradientAnimation>
        )}
        <div
          className={cn(
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10",
            titleClassName
          )}
        >
          <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-lg text-neutral-600 dark:text-neutral-200 lg:text-3xl max-w-96 z-10">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-3">
                {["React.js", "Next.js", "Typescript"].map((item) => (
                  <span
                    key="item"
                    className="py-2 lg:py-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
              </div>
              <div className="flex flex-col gap-3 lg:gap-3">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]" />
                {["React.js", "Next.js", "Typescript"].map((item) => (
                  <span
                    key="item"
                    className="py-2 lg:py-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className={cn("absolute -bottom-5 right-0")}>
                <Lottie
                  options={{
                    loop: copied,
                    autoplay: copied,
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                />
              </div>
              <MagicButton
                title={copied ? "Email Copied" : "Copy My Email"}
                icon={<Copy />}
                position="left"
                className="!bg-[#161a31] w-60"
                handleClick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
