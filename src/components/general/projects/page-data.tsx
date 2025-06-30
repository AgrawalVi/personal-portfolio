import { PageSection as PageSectionType } from '@/types'
import PageContainer from './page-container'
import PageSection from './page-section'
import { slugifyString } from '@/lib/utils'
import { LinkPreview } from '@/components/aceternity/link-preview'

export default function PageData({
  sections,
}: {
  sections: PageSectionType[]
}) {
  return (
    <PageContainer>
      {sections.map((section, idx) => {
        switch (section.type) {
          case 'tech-stack':
            return (
              <PageSection
                title={section.header}
                id={`#${slugifyString(section.header)}`}
                key={idx}
              >
                {section.body.map((item, idx) => (
                  <div key={idx}>
                    <div className="sm:text-4x py-4 text-3xl">
                      {item.sectionName}
                    </div>
                    <ul className="pl-8">
                      {item.items.map((item, idx) => (
                        <li key={idx}>
                          {item.boldText && (
                            <span className="font-bold">{item.boldText} </span>
                          )}
                          {item.technologies?.reduce<(string | JSX.Element)[]>(
                            (acc, tech, index) => {
                              const parts = acc.flatMap((part) => {
                                if (typeof part === 'string') {
                                  return part
                                    .split(new RegExp(`(${tech.name})`, 'i'))
                                    .map((subPart, i) =>
                                      subPart.toLowerCase() ===
                                      tech.name.toLowerCase() ? (
                                        <LinkPreview
                                          key={`${index}-${i}`}
                                          url={tech.url}
                                          className="underline underline-offset-4"
                                        >
                                          {subPart}
                                        </LinkPreview>
                                      ) : (
                                        subPart
                                      ),
                                    )
                                }
                                return part
                              })
                              return parts
                            },
                            [item.text],
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </PageSection>
            )
          default:
            return (
              <PageSection
                title={section.header}
                id={`#${slugifyString(section.header)}`}
                key={idx}
              >
                <>
                  <p>{section.body}</p>
                  <ul className="text-start">
                    {section.bullets?.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                  {section.subsections && (
                    <div>
                      {section.subsections.map((subsection, idx) => (
                        <div key={idx}>
                          <div className="text-3xl sm:text-4xl">
                            {subsection.header}
                          </div>
                          {subsection.body && <p>{subsection.body}</p>}
                          {subsection.bullets && (
                            <ul className="pl-8">
                              {subsection.bullets.map((bullet) => (
                                <li className="leading-normal sm:leading-loose">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </PageSection>
            )
        }
      })}
    </PageContainer>
  )
}
