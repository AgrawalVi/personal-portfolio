"use client"
import React from "react"
import { SparklesCore } from "@/components/aceternity/sparkles"
import { ParallaxSection } from "@/components/photo-section"
import { useScroll } from "framer-motion"
import SiteLoad from "@/components/general/site-load"
import { Navbar } from "@/components/general/navbar"

export default function Home() {
  return (
    <>
      {/*<Navbar></Navbar>*/}
      {/*<SiteLoad></SiteLoad>*/}
      <div className="h-[30rem] lg:h-[40rem] w-full bg-darkgray flex flex-col items-center justify-center overflow-hidden rounded-md flex-col">
        <h1 className="text-3xl md:text-7xl lg:text-9xl font-bold text-center text-white relative z-20">
          Vishrut Agrawal
        </h1>
        <div className="w-[20rem] h-20 lg:w-[40rem] lg:h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full flex-grow"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div
            id="gradientToPreventEdges"
            className="absolute inset-0 w-full h-full bg-darkgray [mask-image:radial-gradient(175px_100px_at_top,transparent_20%,white)] lg:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"
          ></div>
        </div>
      </div>

      <ParallaxSection></ParallaxSection>
    </>
  )
}
