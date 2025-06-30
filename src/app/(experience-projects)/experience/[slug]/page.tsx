import ExperiencePageTitle from '@/components/general/experience/experience-page-title'
import PageData from '@/components/general/projects/page-data'
import { ScrollProgress } from '@/components/magicui/scroll-progress'
import { experiences } from '@/data/experience'
import { redirect } from 'next/navigation'

export const generateStaticParams = () => {
  return experiences
    .map((e) => {
      if (e.cardData) {
        return { slug: e.slug }
      }
    })
    .filter((e) => e instanceof Object)
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const data = experiences.find((e) => e.slug === params.slug)

  if (!data || !data.pageData) redirect('/#experience')

  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <ScrollProgress />
      <div className="flex w-full max-w-5xl flex-col items-center justify-center">
        <div className="flex w-full flex-col pt-10">
          <ExperiencePageTitle
            name={data.companyName}
            dateText={data.timeline}
            position={data.position}
          />
          <PageData sections={data.pageData.sections} />
        </div>
      </div>
    </main>
  )
}
