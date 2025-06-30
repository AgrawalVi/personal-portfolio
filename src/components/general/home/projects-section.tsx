import ProjectCardContainer from '../projects/project-card-container'
import { projects } from '@/data/projects'

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

      <div className="flex flex-wrap justify-center gap-12">
        {projects.map((project, idx) => (
          <ProjectCardContainer project={project} key={idx} />
        ))}
        {/* <ProjectCardContainer
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
        /> */}
      </div>
    </main>
  )
}
