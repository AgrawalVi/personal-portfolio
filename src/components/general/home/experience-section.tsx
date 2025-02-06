import {
  xorbixBulletPoints,
  xorbixTechnologies,
} from '@/data/experience/xorbix'

import ExperienceCardContainer from '../experience/experience-card-container'

export default function ProjectSection() {
  return (
    <main id="experience" className="relative z-10 w-full bg-background py-10">
      <div className="mb-10 text-center text-[40px] text-purple md:text-5xl lg:text-6xl">
        Experience
      </div>

      <div className="flex justify-center">
        {/* <ExperienceCardContainer
          title="Amazon"
          position="Systems Development Engineering Intern"
          link="/experience/amazon"
          img="/card-images/amazon-logo.png"
          timeLine="June 2024 - August 2024"
        /> */}
        <ExperienceCardContainer
          title="Xorbix Technologies"
          position="Software Engineering Intern"
          link="/experience/xorbix"
          img="/card-images/xorbix-logo.png"
          timeLine="January 2024 - Augusts 2024"
          bulletPoints={xorbixBulletPoints}
          technologies={xorbixTechnologies}
        />
      </div>
    </main>
  )
}
