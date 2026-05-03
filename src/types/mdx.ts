export interface ExperienceFrontmatter {
  slug: string
  company: string
  role: string
  dateStart: string
  dateEnd: string
  location: string
  website?: string
  colors: string[]
  published: boolean
  summary: string
  order: number
}

export interface CustomLink {
  label: string
  url: string
}

export interface ProjectFrontmatter {
  slug: string
  title: string
  tagline: string
  dateStart: string
  dateEnd: string
  status: 'active' | 'archived' | 'hackathon'
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  demoVideo?: string
  customLink?: CustomLink
  colors: string[]
  summary: string
  order: number
}

export interface BlogFrontmatter {
  slug: string
  title: string
  description?: string
  date: string
  published: boolean
  readingTime?: string
  tags?: string[]
}
