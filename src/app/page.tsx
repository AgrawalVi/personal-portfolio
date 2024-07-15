import React from 'react'
import Hero from '@/components/general/home/hero'
import ProjectSection from '@/components/general/home/projects-section'
import ExperienceSection from '@/components/general/home/experience-section'
import EducationSection from '@/components/general/home/education-section'

export default function Home() {
  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Hero />
      <div className="flex flex-col space-y-20 mt-10 divide-y-2 divide-neutral-800/50">
        <div className="flex flex-col space-y-20 xl:space-y-0 xl:flex-row divide-y-2 divide-neutral-800/50 xl:divide-y-0">
          <EducationSection />
          <ExperienceSection />
        </div>
        <ProjectSection />
      </div>
    </main>
  )
}
