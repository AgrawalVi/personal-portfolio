import ProjectCard from '../projects/project-card'
import { projects } from '@/data/projects'

export default function ProjectSection() {
  return (
    <main id="projects" className="relative z-10 w-full bg-background py-10">
      <div className="mb-10 text-center text-[40px] text-purple md:text-5xl lg:text-6xl">
        Projects
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        {projects.map((project, idx) => (
          <ProjectCard project={project} key={idx} />
        ))}
      </div>
    </main>
  )
}
