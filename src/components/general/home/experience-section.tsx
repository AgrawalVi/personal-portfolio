import {
  PersonalPortfolioTechnologies,
  PersonalPortfolioCardDescription,
} from '@/data'

import ExperienceCardContainer from '../experience/experience-card-container'

export default function ProjectSection() {
  return (
    <main id="experience" className="z-10 relative py-10 bg-background w-full">
      <div className="text-center text-[40px] md:text-5xl mb-10 lg:text-6xl text-purple">
        Experience
      </div>

      <div className="flex justify-center">
        <ExperienceCardContainer
          title="Xorbix Technologies"
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
