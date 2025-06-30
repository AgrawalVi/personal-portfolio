import { TechnologyItem } from '@/types'
import { ExperienceCardBullets, ExperiencePageData } from '@/types/experience'

export const sweetbeastsBulletPoints: ExperienceCardBullets[] = [
  'Co-founded a charitable venture designing and selling fruit-animal plush toys, now employing a team of seven.',
  'Led development of a custom e-commerce platform with advanced features like remote cart management and partial refunds.',
  'Built an integrated admin portal for streamlined coupon, affiliate, support, product, and order management.',
  'Oversee daily operations, including outreach, inventory, and process optimization.',
]

export const sweetBeastsTechnologies: TechnologyItem[] = [
  {
    name: 'Next.js',
    description: 'React Framework',
    image: '/logos/nextjs-logo.jpg',
  },
  {
    name: 'React',
    description: 'JavaScript Library',
    image: '/logos/react-logo.jpg',
  },
  {
    name: 'Prisma',
    description: 'Database ORM',
    image: '/logos/prisma-logo.svg',
  },
  {
    name: 'Stripe',
    description: 'Payment Processing',
    image: '/logos/stripe.png',
  },
  { name: 'And more...', description: '', image: '/logos/plus-icon.png' },
]
