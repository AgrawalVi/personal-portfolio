import { TracingBeam } from '@/components/aceternity/tracing-beam'
import ExperiencePageTitle from '@/components/general/experience/experience-page-title'
import PageContainer from '@/components/general/projects/page-container'
import PageSection from '@/components/general/projects/page-section'
import { experiences } from '@/data/experience'
import { slugifyString } from '@/lib/utils'
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
      <TracingBeam>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center">
          <div className="flex w-full flex-col pt-10">
            <ExperiencePageTitle
              name={data.companyName}
              dateText={data.timeline}
              position={data.position}
            />
            <PageContainer>
              {data.pageData.sections.map((section) => (
                <PageSection
                  title={section.header}
                  id={slugifyString(section.header)}
                >
                  {(() => {
                    switch (section.type) {
                      case 'normal':
                        return <p>{section.body}</p>
                      case 'tech-stack':
                        return (
                          <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                            {section.body?.map((bullet) => (
                              <li className="sm:leading-loosse leading-normal">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )
                      default:
                        return (
                          <>
                            {section.subsections.map((subsection) => (
                              <>
                                <div className="text-3xl sm:text-4xl">
                                  {subsection.subheader}
                                </div>
                                {subsection.body && <p>{subsection.body}</p>}
                                {subsection.bullets && (
                                  <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                                    {subsection.bullets.map((bullet) => (
                                      <li className="leading-normal sm:leading-loose">
                                        {bullet}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            ))}
                          </>
                        )
                    }
                  })()}
                </PageSection>
              ))}
            </PageContainer>
          </div>
        </div>
      </TracingBeam>
    </main>
  )
}
