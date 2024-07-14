import ProjectPageContainer from '@/components/general/projects/project-page-content-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import Image from 'next/image'
import { LinkPreview } from '@/components/aceternity/link-preview'
import ProjectPageSection from '@/components/general/projects/project-page-section'
import { TracingBeam } from '@/components/aceternity/tracing-beam'

export default function SweetBeastsPage() {
  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <TracingBeam>
        <div className="max-w-5xl w-full flex flex-col items-center justify-center">
          <ProjectPageTitle
            name="Personal Portfolio"
            dateText="June 2023 - Present"
            githubLink="https://github.com/AgrawalVi/personal-portfolio"
          />
          <div className="flex flex-col pt-10 w-full">
            <Image
              src="/photography-section/agriculture-hall.jpg"
              width={2000}
              height={500}
              alt="agriculture hall"
            />
            <ProjectPageContainer>
              <ProjectPageSection title="Summary" id="summary">
                <p>
                  I wanted to build a simple personal portfolio site to showcase
                  my work. I'm not a designer, and I consider all my UI work to
                  be mediocre at best so I wanted this to be more content
                  driven. I am working on a blog and photography section, which
                  will be available soon.{' '}
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="The Tech Stack" id="tech-stack">
                <div className="text-3xl sm:text-4xl">Programming Language</div>
                <ul className="list-disc  font-nunito pl-8">
                  <li>
                    <LinkPreview
                      url="https://typescriptlang.org/"
                      className="underline underline-offset-4"
                    >
                      TypeScript
                    </LinkPreview>{' '}
                    - Ensures type safety, which enhances the developer
                    experience and application reliability
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">
                  Major Frameworks and Libraries
                </div>
                <ul className="list-disc  font-nunito pl-8">
                  <li>
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://nextjs.org/"
                    >
                      Next.js
                    </LinkPreview>{' '}
                    - A full-stack React framework for building server-side
                    rendered applications
                  </li>
                  <li>
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://react.dev/"
                    >
                      React
                    </LinkPreview>{' '}
                    - A library for building dynamic user interfaces
                  </li>
                  <li>
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://tailwindcss.com/"
                    >
                      Tailwind CSS
                    </LinkPreview>{' '}
                    - Known for its ease of customization and utility-first
                    approach
                  </li>
                  <li>
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://framer.com/motion/"
                    >
                      Framer Motion
                    </LinkPreview>{' '}
                    - Enables powerful animations in React applications
                  </li>
                  <li>
                    <strong>UI Libraries:</strong> {''}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://ui.shadcn.com/"
                    >
                      shadcn/ui
                    </LinkPreview>
                    ,{' '}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://ui.aceternity.com/"
                    >
                      AceternityUI
                    </LinkPreview>
                    , and{' '}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://magicui.design/"
                    >
                      MagicUI
                    </LinkPreview>{' '}
                    enhance the experience
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">
                  DevOps and Infrastructure
                </div>
                <ul>
                  <li>
                    <strong>Deployment:</strong> {''}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://vercel.com/"
                    >
                      Vercel
                    </LinkPreview>{' '}
                    - Known for its seamless integration with GitHub, hosts and
                    deploys our application
                  </li>
                  <li>
                    <strong>Version Control:</strong> {''}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://github.com/"
                    >
                      GitHub
                    </LinkPreview>{' '}
                    - Facilitates version control and integration with our
                    development process
                  </li>
                </ul>
              </ProjectPageSection>

              <ProjectPageSection title="Takeaways" id="takeaways">
                <p>
                  I need to spend some more time on this project and use MDX so
                  I don't have to write paragraphs of text in HTML.
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="The Current State" id="current-state">
                <p>
                  You are seeing the current state right now, but this is what I
                  am working on right now.
                </p>
                <ul>
                  <li>
                    Blog - I am very excited about this as I have a lot of posts
                    I want to write. If you're seeing this right now, my first
                    post will be up within the next few days.
                  </li>
                  <li>
                    Add a photography section - one of my favorite hobbies is
                    photography and I have some ideas floating around for a
                    unique and interactive section to showcase my photos on the
                    website. I've been playing with a few concepts and I cannot
                    wait to share the final product
                  </li>
                </ul>
              </ProjectPageSection>
            </ProjectPageContainer>
          </div>
        </div>
      </TracingBeam>
    </main>
  )
}