import ProjectPageContainer from '@/components/general/projects/project-page-content-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import { LinkPreview } from '@/components/aceternity/link-preview'
import ProjectPageSection from '@/components/general/projects/project-page-section'
import { TracingBeam } from '@/components/aceternity/tracing-beam'

export default function PonovoPage() {
  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <TracingBeam>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center">
          <ProjectPageTitle
            name="Ponovo"
            dateText="July 2024 - Present"
            githubLink="https://github.com/AgrawalVi/ponovo"
            viewProjectLink="https://ponovo.app"
          />
          <div className="flex w-full flex-col pt-10">
            <ProjectPageContainer>
              <ProjectPageSection title="Summary" id="summary">
                <p>
                  I wanted a solution to track job applications, and I wanted to
                  make sure that the solution is incredibly seamless and hassle
                  free. While solutions do exist, I really like what I built due
                  to the simple yet practical nature of the application. I was
                  sick of spreadsheets and I am happy with the results. I have a
                  lot on the way and I am excited to keep developing the
                  application.
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
                      url="https://ui.shadcn.com/"
                    >
                      shadcn/ui
                    </LinkPreview>{' '}
                    - Provided ui components and wrappers for{' '}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://recharts.org/en-US/"
                    >
                      ReCharts
                    </LinkPreview>
                    ,{' '}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://react-hook-form.com/"
                    >
                      React Hook Form
                    </LinkPreview>
                    , and{' '}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://tanstack.com/table/v8"
                    >
                      Tanstack Table
                    </LinkPreview>
                  </li>
                  <li>
                    <strong>UI Libraries:</strong> {''}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://framer.com/motion/"
                    >
                      Framer Motion
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

                <div className="text-3xl sm:text-4xl">Database</div>
                <ul>
                  <li>
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://www.postgresql.org/"
                    >
                      PostgreSQL
                    </LinkPreview>{' '}
                    - Celebrated for its reliability, scalability, and
                    flexibility
                  </li>
                  <li>
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://orm.drizzle.team/"
                    >
                      Drizzle
                    </LinkPreview>{' '}
                    - Extremely lightweight database ORM for Typescript
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">
                  DevOps and Infrastructure
                </div>
                <ul>
                  <li>
                    <strong>Authentication:</strong> {''}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://clerk.com"
                    >
                      Clerk
                    </LinkPreview>{' '}
                    - Provides a robust and easy to use user authentication
                    solution
                  </li>
                  <li>
                    <strong>Server:</strong> {''}
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://neon.tech"
                    >
                      Neon
                    </LinkPreview>{' '}
                    - Offers a serverless platform for PostgreSQL, ensuring
                    scalability and easy management
                  </li>
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
                  This project was a very fun project, but the hard part has not
                  been done yet. I am looking forward to the next steps, which
                  are file uploads and storage, user preferences, and more. I am
                  very excited for what I built and I really cannot wait to
                  start using it and sharing it with others.
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="The Current State" id="current-state">
                <p>
                  This project is in beta right now. It is stable and everything
                  works, but there are more features that need to be added
                  before it's fully baked.
                </p>
                <ul className="text-start">
                  <li>File Uploads - Planning on using Vercel Blob Storage</li>
                  <li>User Preferences - In development</li>
                  <li>
                    <LinkPreview
                      className="underline underline-offset-4"
                      url="https://zealous-tie-73d.notion.site/27faa9398cf64060a1b11f8fee865a07"
                    >
                      View more here
                    </LinkPreview>
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
