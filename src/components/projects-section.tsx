import { technologyItem } from "@/types"
import ProjectCardContainer from "./general/projects/project-card-container"
import {
  PersonalPortfolioTechnologies,
  SweetBeastsAdminTechnologies,
  SweetBeastsTechnologies,
} from "@/data"

export default function ProjectSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mx-auto">
      <ProjectCardContainer
        title="SweetBeasts"
        link="/projects/sweetbeasts"
        img="/photography-section/agriculture-hall.jpg"
        timeLine="May 2023 - Present"
        bulletPoints={[
          "E-Commerce site for SweetBeasts Inc built from scratch",
          "Admin panel for SweetBeasts Inc built from scratch",
          "View all of my projects",
        ]}
        technologies={SweetBeastsTechnologies}
        liveLink="https://sweetbeasts.shop"
      />
      <ProjectCardContainer
        title="SweetBeasts Admin"
        link="/projects/sweetbeasts-admin"
        img="/photography-section/agriculture-hall.jpg"
        timeLine="May 2023 - Present"
        bulletPoints={[
          "E-Commerce site for SweetBeasts Inc built from scratch",
          "Admin panel for SweetBeasts Inc built from scratch",
          "View all of my projects",
        ]}
        technologies={SweetBeastsAdminTechnologies}
      />
      <ProjectCardContainer
        title="Personal Portfolio"
        link="/projects/personal-portfolio"
        img="/photography-section/agriculture-hall.jpg"
        timeLine="June 2023 - Present"
        bulletPoints={[
          "E-Commerce site for SweetBeasts Inc built from scratch",
          "Admin panel for SweetBeasts Inc built from scratch",
          "View all of my projects",
        ]}
        technologies={PersonalPortfolioTechnologies}
      />
    </div>
  )
}
