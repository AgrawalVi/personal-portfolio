import ProjectPageContainer from '@/components/general/projects/project-page-content-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import { LinkPreview } from '@/components/aceternity/link-preview'
import ProjectPageSection from '@/components/general/projects/project-page-section'
import { TracingBeam } from '@/components/aceternity/tracing-beam'

export default function PersonalPortfolioPage() {
  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <TracingBeam>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center">
          <ProjectPageTitle
            name="Personal Portfolio"
            dateText="June 2024 - Present"
            githubLink="https://github.com/AgrawalVi/personal-portfolio"
            viewProjectLink="https://vishrut.tech"
          />
          <div className="flex w-full flex-col pt-10">
            <ProjectPageContainer>
              <ProjectPageSection title="Summary" id="summary">
                <p>
                  I embarked on creating a simple personal portfolio site to
                  showcase my work. As someone who doesn't specialize in design,
                  I aimed for a content-driven approach, acknowledging that my
                  UI skills are average at best. A highlight still in
                  development is a photography section that reflects one of my
                  favorite hobbies.
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="The Tech Stack" id="tech-stack">
                <div className="text-3xl sm:text-4xl">Programming Language</div>
                <ul className="list-disc pl-8 font-nunito">
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
                <ul className="list-disc pl-8 font-nunito">
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
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://velite.js.org/"
                    >
                      Velite
                    </LinkPreview>{' '}
                    - MDX static site generator - used for blog
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
                  Compiling this portfolio has been a rewarding experience.
                  Reflecting on my past projects and documenting them has not
                  only allowed me to appreciate my growth but also ignited my
                  enthusiasm for sharing more about my journey in the future.
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="The Current State" id="current-state">
                <p>
                  What you see now represents the current version of my
                  portfolio, but exciting developments are underway:
                </p>
                <ul>
                  <li>
                    <strong>Photography Section:</strong> I am developing a
                    unique and interactive section to display my photography.
                    This project is particularly close to my heart, and I am
                    eager to unveil the creative concepts I've been exploring.
                  </li>
                  <li>
                    <strong>Email List:</strong> Adding an email subscription
                    feature is on my agenda. Although it's a straightforward
                    addition, it's not my top priority at the moment.
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
