import { CarouselImage, PageSection, TechnologyItem } from '.'

export type Project = {
  projectName: string
  slug: string
  externalLink?: string
  timeline: string
  liveLink?: string
  githubLink?: string
  cardData: ProjectCardData
  pageData?: ProjectPageData
}

export type ProjectCardBulletPoint = string

export type ProjectCardData = {
  bulletPoints: ProjectCardBulletPoint[]
  technologies: TechnologyItem[]
}

export type ProjectPageData = {
  carouselImages?: CarouselImage[]
  sections: PageSection[]
}
