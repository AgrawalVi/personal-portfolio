import ProjectCardContainer from '../projects/project-card-container'
import {
  PersonalPortfolioTechnologies,
  SweetBeastsAdminTechnologies,
  SweetBeastsAdminCardDescription,
  PersonalPortfolioCardDescription,
} from '@/data'
import { ponovoBulletPoints, ponovoTechnologies } from '@/data/projects/ponovo'

import {
  SweetBeastsCardDescription,
  SweetBeastsTechnologies,
} from '@/data/projects/sweetbeasts'

export default function ProjectSection() {
  return (
    <main id="projects" className="relative z-10 w-full bg-background py-10">
      <div className="mb-10 text-center text-[40px] text-purple md:text-5xl lg:text-6xl">
        Projects
      </div>

      <div className="mx-auto grid w-fit grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
        <ProjectCardContainer
          title="Ponovo"
          link="/projects/ponovo"
          img="/card-images/ponovo.png"
          timeLine="July 2024 - Present"
          bulletPoints={ponovoBulletPoints}
          technologies={ponovoTechnologies}
          liveLink="https://ponovo.app"
          githubLink="https://github.com/AgrawalVi/ponovo"
        />
        <ProjectCardContainer
          title="SweetBeasts"
          link="/projects/sweetbeasts"
          img="/card-images/sweetbeasts.png"
          timeLine="May 2024 - Present"
          bulletPoints={SweetBeastsCardDescription}
          technologies={SweetBeastsTechnologies}
          liveLink="https://sweetbeasts.shop"
        />
        <ProjectCardContainer
          title="SweetBeasts Admin"
          link="/projects/sweetbeasts-admin"
          img="/card-images/sweetbeasts-admin.png"
          timeLine="May 2024 - Present"
          bulletPoints={SweetBeastsAdminCardDescription}
          technologies={SweetBeastsAdminTechnologies}
        />
        <ProjectCardContainer
          title="Personal Portfolio"
          link="/projects/personal-portfolio"
          img="/card-images/personal-portfolio.png"
          timeLine="June 2024 - Present"
          bulletPoints={PersonalPortfolioCardDescription}
          technologies={PersonalPortfolioTechnologies}
          liveLink="https://vishrut.tech"
          githubLink="https://github.com/AgrawalVi/personal-portfolio"
        />
      </div>
    </main>
  )
}
