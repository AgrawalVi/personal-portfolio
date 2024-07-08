"use client"
import React from "react"
import { useScroll } from "framer-motion"
import SiteLoad from "@/components/general/site-load"
import Hero from "@/components/general/hero"
import ProjectSection from "@/components/projects-section"
import Footer from "@/components/general/footer"

export default function Home() {
  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Hero />
      <ProjectSection />
      <Footer />
    </main>
  )
}
