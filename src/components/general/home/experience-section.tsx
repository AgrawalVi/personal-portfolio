import ExperienceCardContainer from '../experience/experience-card-container'
import { experiences } from '@/data/experience'

export default function ProjectSection() {
  return (
    <main id="experience" className="relative z-10 w-full bg-background py-10">
      <div className="mb-10 text-center text-[40px] text-purple md:text-5xl lg:text-6xl">
        Experience
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {experiences.map((experience, idx) => (
          <ExperienceCardContainer data={experience} key={idx} />
        ))}
      </div>
    </main>
  )
}
