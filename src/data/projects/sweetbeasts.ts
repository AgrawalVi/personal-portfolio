import { projectPageSection, technologyItem } from '@/types'

export const SweetBeastsTechnologies: technologyItem[] = [
  {
    id: 1,
    name: 'Next.js',
    description: 'React Framework',
    image: '/logos/nextjs-logo.jpg',
  },
  {
    id: 2,
    name: 'Tailwind',
    description: 'CSS Framework',
    image: '/logos/tailwind-logo.jpg',
  },
  {
    id: 3,
    name: 'React',
    description: 'JavaScript Library',
    image: '/logos/react-logo.svg',
  },
  {
    id: 4,
    name: 'Prisma',
    description: 'Database ORM',
    image: '/logos/prisma-logo.svg',
  },
  {
    id: 5,
    name: 'And more...',
    description: '',
    image: '/logos/plus-icon.png',
  },
]

export const SweetBeastsCardDescription: string[] = [
  'Custom e-commerce platform for SweetBeasts ',
]

export const SweetBeastsSectionPageSection: projectPageSection[] = [
  {
    title: 'Summary',
    paragraph: [
      'I led a team of three to build a brand new c-commerce platform for SweetBeasts Inc, a company that I co-founded and act as the CTO and COO. Currently, the company is in its early stages and we are still waiting for our full shipment of goods to arrive. Because of this, we have not yet launched the website to the public, but I have made a demo site with test data available for you. Instructions for this can be found below. ',
    ],
    id: 'about-the-project',
  },
]
