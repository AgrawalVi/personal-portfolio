import ProjectCardContainer from './general/projects/project-card-container'
import {
  PersonalPortfolioTechnologies,
  SweetBeastsAdminTechnologies,
  SweetBeastsAdminCardDescription,
  PersonalPortfolioCardDescription,
} from '@/data'

import {
  SweetBeastsCardDescription,
  SweetBeastsTechnologies,
} from '@/data/projects/sweetbeasts'

export default function ProjectSection() {
  return (
    <main id="projects" className="z-10 relative pt-10 bg-background w-full">
      <div className="text-center text-[40px] md:text-5xl lg:text-6xl mb-10 text-purple">
        Projects
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 mx-auto w-fit">
        <ProjectCardContainer
          title="SweetBeasts"
          link="/projects/sweetbeasts"
          img="/photography-section/agriculture-hall.jpg"
          timeLine="May 2023 - Present"
          bulletPoints={SweetBeastsCardDescription}
          technologies={SweetBeastsTechnologies}
          liveLink="https://sweetbeasts.shop"
        />
        <ProjectCardContainer
          title="SweetBeasts Admin"
          link="/projects/sweetbeasts-admin"
          img="/photography-section/agriculture-hall.jpg"
          timeLine="May 2023 - Present"
          bulletPoints={SweetBeastsAdminCardDescription}
          technologies={SweetBeastsAdminTechnologies}
        />
        <ProjectCardContainer
          title="Personal Portfolio"
          link="/projects/personal-portfolio"
          img="/photography-section/agriculture-hall.jpg"
          timeLine="June 2023 - Present"
          bulletPoints={PersonalPortfolioCardDescription}
          technologies={PersonalPortfolioTechnologies}
        />
      </div>
    </main>
  )
}
