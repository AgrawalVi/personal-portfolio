import PageData from '@/components/general/projects/page-data'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import { ScrollProgress } from '@/components/magicui/scroll-progress'
import { projects } from '@/data/projects'
import { redirect } from 'next/navigation'

export function generateStaticParams() {
  return projects
    .map((project) => {
      if (project.slug) {
        return { slug: project.slug }
      }
    })
    .filter((project) => project instanceof Object)
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const data = projects.find(
    (project) => project.pageData && project.slug === params.slug,
  )

  if (!data || !data.pageData) redirect('/#projects')

  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <ScrollProgress />
      <div className="flex w-full max-w-5xl flex-col items-center justify-center">
        <ProjectPageTitle
          name={data.projectName}
          dateText={data.timeline}
          githubLink={data.githubLink}
          liveLink={data.liveLink}
        />
        <div className="flex w-full flex-col pt-10">
          <PageData sections={data.pageData.sections} />
        </div>
      </div>
    </main>
  )
}
