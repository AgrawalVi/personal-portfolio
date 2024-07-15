import {
  PersonalPortfolioTechnologies,
  PersonalPortfolioCardDescription,
} from '@/data'

import ExperienceCardContainer from '../experience/experience-card-container'

export default function ProjectSection() {
  return (
    <main id="education" className="relative z-10 w-full bg-background py-10">
      <div className="mb-10 text-center text-[40px] text-purple md:text-5xl lg:text-6xl">
        Education
      </div>

      <div className="flex justify-center">
        <ExperienceCardContainer
          title="University of Wisconsin - Madison"
          position="Software Engineering Intern"
          link="/projects/personal-portfolio"
          img="/photography-section/agriculture-hall.jpg"
          timeLine="January 2024 - Present | Software Engineering Intern"
          bulletPoints={PersonalPortfolioCardDescription}
          technologies={PersonalPortfolioTechnologies}
        />
      </div>
    </main>
  )
}
