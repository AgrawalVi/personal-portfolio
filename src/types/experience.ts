import { PageSection, TechnologyItem } from '.'

export type Experience = {
  companyName: string
  position: string
  timeline: string
  cardData: ExperienceCardData
  slug: string
  pageData?: ExperiencePageData
}

export type ExperienceCardBullets = string

export type ExperienceCardData = {
  cardBullets: ExperienceCardBullets[]
  technologies?: TechnologyItem[]
  cardImageUrl: string
}

export type ExperiencePageData = { sections: PageSection[] }
