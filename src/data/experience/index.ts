import { Experience } from '@/types/experience'
import {
  xorbixBulletPoints,
  xorbixExperiencePageData,
  xorbixTechnologies,
} from './xorbix'
import { amazonBulletPoints } from './amazon'

export const experiences: Experience[] = [
  {
    slug: 'amazon',
    companyName: 'Amazon',
    position: 'Systems Development Engineering Intern',
    timeline: 'May 2025 - Present',
    cardData: { cardBullets: amazonBulletPoints, cardImageUrl: '' },
  },
  {
    slug: 'sweetbeasts',
    companyName: 'SweetBeasts',
    position: 'Co-Founder, CTO, and COO',
    timeline: 'April 2024 - Present',
    cardData: { cardBullets: [], cardImageUrl: '' },
  },
  {
    slug: 'global-schoolwear',
    companyName: 'Global Schoolwear',
    position: 'Software Engineer',
    timeline: 'November 2024 - April 2025',
    cardData: { cardBullets: [], cardImageUrl: '' },
  },
  {
    slug: 'xorbix',
    companyName: 'Xorbix Technologies',
    position: 'Software Engineering Intern',
    timeline: 'January 2024 - August 2024',
    cardData: {
      cardBullets: xorbixBulletPoints,
      technologies: xorbixTechnologies,
      cardImageUrl: '',
    },
    pageData: xorbixExperiencePageData,
  },
]
