import PageContainer from '@/components/general/page/page-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import { LinkPreview } from '@/components/aceternity/link-preview'
import PageSection from '@/components/general/page/page-section'

export default function PonovoPage() {
  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center">
        <ProjectPageTitle
          name="Ponovo"
          dateText="July 2024 - Present"
          githubLink="https://github.com/AgrawalVi/ponovo"
          liveLink="https://ponovo.app"
        />
        <div className="flex w-full flex-col pt-10">
          <PageContainer>
            <PageSection title="Summary" id="summary">
              <p>
                I developed a job application tracking system designed to
                replace conventional spreadsheets with a seamless and
                hassle-free solution. Though other solutions exist, I prefer
                mine for its ease-of-use and practicality. I'm very pleased with
                the initial results and am excited about the future developments
                planned for the application.
              </p>
            </PageSection>

            <PageSection title="The Tech Stack" id="tech-stack">
              <div className="text-3xl sm:text-4xl">Programming Language</div>
              <ul className="list-disc pl-8 font-nunito">
                <li>
                  <LinkPreview
                    url="https://typescriptlang.org/"
                    className="underline underline-offset-4"
                  >
                    TypeScript
                  </LinkPreview>{' '}
                  - Ensures type safety, which enhances the developer experience
                  and application reliability
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
                  - Celebrated for its reliability, scalability, and flexibility
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
            </PageSection>

            <PageSection title="Takeaways" id="takeaways">
              <p>
                This project has been immensely fulfilling to work on, although
                there are challenges ahead. I look forward to implementing
                upcoming features such as file uploads, user preferences, and
                more. I'm thrilled with what I've built and eager to start using
                it and sharing it with others.
              </p>
            </PageSection>

            <PageSection title="The Current State" id="current-state">
              <p>
                This project is in beta right now. It is stable and everything
                works, but there are more features that need to be added before
                it's fully baked.
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
            </PageSection>
          </PageContainer>
        </div>
      </div>
    </main>
  )
}
