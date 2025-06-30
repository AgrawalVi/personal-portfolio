import { TechnologyItem, TechStackSection } from '@/types'
import { Project, ProjectPageData } from '@/types/project'

const PonovoTechnologies: TechnologyItem[] = [
  {
    name: 'Next.js',
    description: 'React Framework',
    image: '/logos/nextjs-logo.jpg',
  },
  {
    name: 'Drizzle',
    description: 'Database ORM',
    image: '/logos/drizzle-logo.png',
  },
  {
    name: 'React Query',
    description: 'Data Fetching Library',
    image: '/logos/react-query-logo.webp',
  },
  {
    name: 'Clerk',
    description: 'Authentication',
    image: '/logos/clerk-logo.png',
  },
  { name: 'And more...', description: '', image: '/logos/plus-icon.png' },
]

const PonovoBulletPoints: string[] = [
  'Hassle free job application tracking system',
]

const PonovoTechStack: TechStackSection[] = [
  {
    sectionName: 'Programming Languages',
    items: [
      {
        text: 'TypeScript - Ensures type safety, which enhances the developer experience and application reliability',
        technologies: [
          { name: 'typescript', url: 'https://typescriptlang.org/' },
        ],
      },
    ],
  },
  {
    sectionName: 'Major Frameworks and Libraries',
    items: [
      {
        text: 'Next.js - A full-stack React framework for building server-side rendered (SSR) web applications',
        technologies: [{ name: 'next.js', url: 'https://nextjs.org/' }],
      },
      {
        text: 'React - A library for building dynamic user interfaces',
        technologies: [{ name: 'react', url: 'https://react.dev/' }],
      },
      {
        text: 'Tailwind CSS - Known for its ease of customization and utility-first approach',
        technologies: [
          { name: 'tailwind css', url: 'https://tailwindcss.com/' },
        ],
      },
      {
        text: 'shadcn/ui - Provided ui components and wrappers for ReCharts, Tanstack Table, and more',
        technologies: [
          { name: 'shadcn/ui', url: 'https://ui.shadcn.com/' },
          { name: 'recharts', url: 'https://recharts.org/en-US/' },
          { name: 'tanstack table', url: 'https://tanstack.com/table/v8' },
        ],
      },
      {
        boldText: 'UI Libraries:',
        text: 'Framer Motion, AceternityUI, and MagicUI enhance the user experience',
        technologies: [
          { name: 'framer motion', url: 'https://www.framer.com/motion/' },
          { name: 'aceternityui', url: 'https://ui.aceternity.com/' },
          { name: 'magicui', url: 'https://magicui.design/' },
        ],
      },
    ],
  },
  {
    sectionName: 'Database',
    items: [
      {
        text: 'PostgreSQL - Celebrated for its reliability, scalability, and flexibility',
        technologies: [
          { name: 'postgresql', url: 'https://www.postgresql.org/' },
        ],
      },
      {
        text: 'Drizzle - Extremely lightweight database ORM for Typescript',
        technologies: [{ name: 'drizzle', url: 'https://orm.drizzle.team/' }],
      },
    ],
  },
  {
    sectionName: 'DevOps and Infrastructure',
    items: [
      {
        boldText: 'Authentication:',
        text: 'Clerk - Provides a robust and easy to use user authentication solution',
        technologies: [{ name: 'clerk', url: 'https://clerk.com' }],
      },
      {
        boldText: 'Storage:',
        text: 'Neon - Offers a serverless platform for PostgreSQL, ensuring scalability and easy management',
        technologies: [{ name: 'neon', url: 'https://neon.tech' }],
      },
      {
        boldText: 'Deployment:',
        text: 'Vercel - Known for its seamless integration with GitHub, hosts and deploys our application',
        technologies: [{ name: 'vercel', url: 'https://vercel.com/' }],
      },
      {
        boldText: 'Version Control:',
        text: 'GitHub - Facilitates version control and integration with my development process',
        technologies: [{ name: 'github', url: 'https://github.com/' }],
      },
    ],
  },
]

const PonovoPageData: ProjectPageData = {
  sections: [
    {
      type: 'normal',
      header: 'Summary',
      body: "I developed a job application tracking system designed to replace conventional spreadsheets with a seamless and hassle-free solution. Though other solutions exist, I prefer mine for its ease-of-use and practicality. I'm very pleased with the initial results and am excited about the future developments planned for the application.",
    },
    { type: 'tech-stack', header: 'The Tech Stack', body: PonovoTechStack },
    {
      type: 'normal',
      header: 'Takeaways',
      body: "This project has been immensely fulfilling to work on, although there are challenges ahead. I look forward to implementing upcoming features such as file uploads, user preferences, and more. I'm thrilled with what I've built and eager to start using it and sharing it with others.",
    },
  ],
}

export const PonovoData: Project = {
  projectName: 'Ponovo',
  slug: 'ponovo',
  timeline: 'July 2024 - Present',
  cardData: {
    bulletPoints: PonovoBulletPoints,
    technologies: PonovoTechnologies,
  },
  liveLink: 'https://ponovo.app',
  githubLink: 'https://github.com/AgrawalVi/ponovo',
  pageData: PonovoPageData,
}
