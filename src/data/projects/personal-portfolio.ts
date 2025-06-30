import { TechnologyItem, TechStackSection } from '@/types'
import {
  Project,
  ProjectCardBulletPoint,
  ProjectPageData,
} from '@/types/project'

const PersonalPortfolioTechnologies: TechnologyItem[] = [
  {
    name: 'Next.js',
    description: 'React Framework',
    image: '/logos/nextjs-logo.jpg',
  },
  {
    name: 'Tailwind',
    description: 'CSS Framework',
    image: '/logos/tailwind-logo.jpg',
  },
  {
    name: 'React',
    description: 'JavaScript Library',
    image: '/logos/react-logo.jpg',
  },
  {
    name: 'Vercel',
    description: 'Cloud Hosting',
    image: '/logos/vercel-logo.png',
  },
  {
    name: 'TypeScript',
    description: 'Typesafe JavaScript',
    image: '/logos/typescript-logo.png',
  },
]

const PersonalPortfolioBulletPoints: ProjectCardBulletPoint[] = [
  "You've already seen this",
]

export const PersonalPortfolioTechStack: TechStackSection[] = [
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
        text: 'Next.js - A full-stack React framework for building server-side rendered applications',
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
        text: 'Velite - MDX static site generator - used for blog posts',
        technologies: [{ name: 'velite', url: 'https://velite.js.org/' }],
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
    sectionName: 'DevOps and Infrastructure',
    items: [
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

export const PersonalPortfolioPageData: ProjectPageData = {
  sections: [
    {
      type: 'normal',
      header: 'Summary',
      body: "I embarked on creating a simple personal portfolio site to showcase my work. As someone who doesn't specialize in design, I aimed for a content-driven approach, acknowledging that my UI skills are average at best. A highlight still in development is a photography section that reflects one of my favorite hobbies.",
    },
    {
      type: 'tech-stack',
      header: 'The Tech Stack',
      body: PersonalPortfolioTechStack,
    },
    {
      type: 'normal',
      header: 'Takeaways',
      body: 'Compiling this portfolio has been a rewarding experience. Reflecting on my past projects and documenting them has not only allowed me to appreciate my growth but also ignited my enthusiasm for sharing more about my journey in the future.',
    },
  ],
}

export const PersonalPortfolioData: Project = {
  projectName: 'Personal Portfolio',
  slug: 'personal-portfolio',
  timeline: 'June 2024 - Present',
  cardData: {
    technologies: PersonalPortfolioTechnologies,
    bulletPoints: PersonalPortfolioBulletPoints,
  },
  liveLink: 'https://vishrut.tech',
  githubLink: 'https://github.com/AgrawalVi/personal-portfolio',
  pageData: PersonalPortfolioPageData,
}
