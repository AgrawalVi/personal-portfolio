export type TechnologyItem = {
  name: string
  description: string
  image: string
}

export type CarouselImage = { imageUrl: string; text: string }

export type PageSubsection = {
  header: string
  body?: string
  bullets?: string[]
}

export type PageSectionNormal = {
  header: string
  body?: string
  bullets?: string[]
  subsections?: PageSubsection[]
  type: 'normal'
}

export type TechStackItemTechnology = { name: string; url: string }

export type TechStackItem = {
  boldText?: string
  text: string
  technologies: TechStackItemTechnology[]
}

export type TechStackSection = { sectionName: string; items: TechStackItem[] }

export type PageSectionTechStack = {
  header: string
  body: TechStackSection[]
  type: 'tech-stack'
}

export type PageSection = PageSectionNormal | PageSectionTechStack
