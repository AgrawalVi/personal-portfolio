"use client"
import React from "react"
import { useScroll } from "framer-motion"
import SiteLoad from "@/components/general/site-load"
import Hero from "@/components/general/hero"
import ProjectSection from "@/components/projects-section"

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Hero />
      <ProjectSection />
    </main>
  )
}
