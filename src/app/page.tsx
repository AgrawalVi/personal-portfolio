"use client"
import React from "react"
import { SparklesCore } from "@/components/aceternity/sparkles"
import { ParallaxSection } from "@/components/photo-section"
import { useScroll } from "framer-motion"
import SiteLoad from "@/components/general/site-load"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Hero from "@/components/general/hero"
import { FloatingNav } from "@/components/general/floating-navbar"
import { HomeIcon } from "lucide-react"
import Grid from "@/components/general/grid"

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <FloatingNav />
      <Hero />
      {/* <Grid /> */}
    </main>
  )
}
