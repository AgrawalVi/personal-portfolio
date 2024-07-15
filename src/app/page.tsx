import React from 'react'
import Hero from '@/components/general/home/hero'
import ProjectSection from '@/components/general/home/projects-section'

export default function Home() {
  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Hero />
      <ProjectSection />
    </main>
  )
}
