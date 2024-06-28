import { technologyItem } from "@/types"
import ProjectCardContainer from "./general/projects/project-card-container"

const sweetBeastsTechnologies: technologyItem[] = [
  {
    id: 1,
    name: "Next.js",
    description: "React Framework",
    image: "/logos/nextjs-logo.jpg",
  },
  {
    id: 2,
    name: "Tailwind",
    description: "CSS Framework",
    image: "/logos/tailwind-logo.jpg",
  },
  {
    id: 3,
    name: "React",
    description: "JavaScript Library",
    image: "/logos/react-logo.svg",
  },
  {
    id: 4,
    name: "Framer Motion",
    description: "Animation Library",
    image: "/logos/framer-logo.png",
  },
  {
    id: 5,
    name: "Prisma",
    description: "Database ORM",
    image: "/logos/prisma-logo.svg",
  },
  {
    id: 6,
    name: "PostgreSQL",
    description: "Database",
    image: "/logos/postgres-logo.png",
  },
  {
    id: 7,
    name: "Vercel",
    description: "Cloud Hosting",
    image: "/logos/vercel-logo.png",
  },
  {
    id: 8,
    name: "TypeScript",
    description: "Typesafe JavaScript",
    image: "/logos/typescript-logo.png",
  },
]

export default function ProjectSection() {
  return (
    <div>
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
        technologies={sweetBeastsTechnologies}
      />
    </div>
  )
}
