import React from 'react'
import Hero from '@/components/general/home/hero'
import ProjectSection from '@/components/general/home/projects-section'
import ExperienceSection from '@/components/general/home/experience-section'
import EducationSection from '@/components/general/home/education-section'

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-background px-5 sm:px-10">
      <Hero />
      <div className="mt-10 flex flex-col space-y-20 divide-y-2 divide-neutral-800/50">
        <div className="flex flex-col space-y-20 divide-y-2 divide-neutral-800/50">
          <EducationSection />
          <ExperienceSection />
        </div>
        <ProjectSection />
      </div>
    </main>
  )
}
