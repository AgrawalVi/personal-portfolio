import { madisonBulletPoints } from '@/data/education/madison'
import EducationCardContainer from '../education/education-card-container'

export default function ProjectSection() {
  return (
    <main id="education" className="relative z-10 w-full bg-background py-10">
      <div className="mb-10 text-center text-[40px] text-purple md:text-5xl lg:text-6xl">
        Education
      </div>

      <div className="flex justify-center">
        <EducationCardContainer
          school="University of Wisconsin - Madison"
          timeLine="Expected Graduation: May 2026"
          img="/card-images/uw-madison.jpg"
          bulletPoints={madisonBulletPoints}
        />
      </div>
    </main>
  )
}
