import { TechnologyItem, TechStackSection } from '@/types'
import { Project, ProjectPageData } from '@/types/project'

const ShelfwiseTechnologies: TechnologyItem[] = [
  {
    name: 'Next.js',
    description: 'React Framework',
    image: '/logos/nextjs-logo.jpg',
  },
  {
    name: 'FastAPI',
    description: 'Python API Framework',
    image: '/logos/fastapi.png',
  },
  {
    name: 'Prisma',
    description: 'Database ORM',
    image: '/logos/prisma-logo.svg',
  },
  {
    name: 'Open AI',
    description: 'LLMs',
    image: '/logos/openai-logo.jpg',
  },
]

const ShelfwiseBulletPoints: string[] = [
  'Hackathon project developed to help manage groceries',
]

export const ShelfwiseData: Project = {
  projectName: 'Shelfwise',
  slug: 'shelfwise',
  timeline: 'Madhacks Fall 2024',
  cardData: {
    technologies: ShelfwiseTechnologies,
    bulletPoints: ShelfwiseBulletPoints,
  },
  liveLink: 'https://shelfwise-puce.vercel.app/',
  githubLink: 'https://github.com/AgrawalVi/shelfwise',
  externalLink: {
    link: 'https://www.youtube.com/watch?v=ljWgrLuKK-s',
    text: 'Watch Demo',
  },
}
