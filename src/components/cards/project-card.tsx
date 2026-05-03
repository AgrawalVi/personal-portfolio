'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ExternalLink, Github, Video } from 'lucide-react'

import type { ProjectFrontmatter } from '@/types/mdx'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GlassCard } from '@/components/ui/custom/glass-card'

type LinkSpec = {
  url: string
  label: string
  icon: typeof Github
}

function ActionLink({
  href,
  label,
  icon: Icon,
  delayMs,
  index,
  total,
}: {
  href: string
  label: string
  icon: typeof Github
  delayMs: number
  index: number
  total: number
}) {
  const isOrphan = total === 3 && index === 2
  const layout = isOrphan ? 'col-span-2 justify-self-center w-1/2' : 'w-full'
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      style={{ transitionDelay: `${delayMs}ms` } as CSSProperties}
      className={`${layout} translate-y-0 opacity-100 transition-all duration-300 sm:translate-y-3 sm:opacity-0 sm:group-hover/card:translate-y-0 sm:group-hover/card:opacity-100`}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
        <Icon />
        {label}
      </Link>
    </Button>
  )
}

export function ProjectCard({ project }: { project: ProjectFrontmatter }) {
  const links: LinkSpec[] = []
  if (project.githubUrl?.trim()) {
    links.push({ url: project.githubUrl, label: 'GitHub', icon: Github })
  }
  if (project.liveUrl?.trim()) {
    links.push({
      url: project.liveUrl,
      label: 'Live Site',
      icon: ExternalLink,
    })
  }

  if (project.demoVideo?.trim()) {
    links.push({
      url: project.demoVideo,
      label: 'Demo',
      icon: Video,
    })
  }

  if (project.customLink?.url?.trim()) {
    links.push({
      url: project.customLink.url,
      label: project.customLink.label,
      icon: ExternalLink,
    })
  }

  const accent = project.colors[0] ?? '#888888'
  const hoverTint = `radial-gradient(circle at top right, color-mix(in oklch, ${accent} 12%, transparent), transparent 65%)`

  return (
    <div
      className="group/glow rounded-xl transition-[outline-color,box-shadow] duration-300 outline outline-(--glow-soft) hover:outline-(--glow-mid) shadow-[0_10px_30px_-16px_var(--glow-mid)] hover:shadow-[0_18px_42px_-14px_var(--glow-strong)]"
      style={
        {
          '--glow-soft': `color-mix(in oklch, ${accent} 12%, transparent)`,
          '--glow-mid': `color-mix(in oklch, ${accent} 35%, transparent)`,
          '--glow-strong': `color-mix(in oklch, ${accent} 35%, transparent)`,
        } as CSSProperties
      }
    >
      <GlassCard colors={project.colors} seed={project.slug} solid className="group/card">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{ background: hoverTint }}
        />
        <div className="relative flex flex-col min-h-[224px]">
          <CardHeader className="py-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground tabular-nums">
                {project.dateStart}
                {project.dateEnd && project.dateEnd !== project.dateStart ? ` – ${project.dateEnd}` : ''}
              </span>
              <CardTitle>{project.title}</CardTitle>
            </div>
          </CardHeader>

          <div className="relative flex-1">
            <div className="transition-all duration-300 sm:group-hover/card:-translate-y-1 sm:group-hover/card:opacity-0">
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.summary}</p>
              </CardContent>
            </div>

            {links.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2 px-6 pb-4 sm:absolute sm:inset-0 sm:mt-0 sm:px-6 sm:pb-8 sm:items-center sm:content-center">
                {links.map((l, i) => (
                  <ActionLink
                    key={l.url}
                    href={l.url}
                    label={l.label}
                    icon={l.icon}
                    delayMs={i * 50}
                    index={i}
                    total={links.length}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

export function ProjectCardGrid({ projects }: { projects: ProjectFrontmatter[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
