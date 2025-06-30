import PageContainer from '@/components/general/projects/page-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import { LinkPreview } from '@/components/aceternity/link-preview'
import PageSection from '@/components/general/projects/page-section'
import ImageCarousel from '@/components/general/projects/image-carousel'

export default function SweetBeastsAdminPage() {
  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center">
        <ProjectPageTitle
          name="SweetBeasts Admin"
          dateText="May 2024 - Present"
        />
        <div className="flex w-full flex-col pt-10">
          <ImageCarousel
            images={[
              '/projects/sweetbeasts-admin/products-page.png',
              '/projects/sweetbeasts-admin/edit-product.png',
              '/projects/sweetbeasts-admin/two-factor.png',
            ]}
          />
          <PageContainer>
            <PageSection title="Summary" id="summary">
              <p>
                As the CTO and COO of SweetBeasts Inc., a company I co-founded,
                I lead a team of three in the development and testing of our
                custom e-commerce admin panel. I oversee all technical and
                operational aspects of the platform, ensuring it aligns with our
                strategic vision. You can learn about the storefront{' '}
                <LinkPreview
                  url="/projects/sweetbeasts"
                  className="underline underline-offset-4"
                >
                  here.
                </LinkPreview>{' '}
                While the admin panel is not publicly accessible, the source
                code is available on{' '}
                <LinkPreview
                  className="underline underline-offset-4"
                  url="https://github.com/AgrawalVi/sweetbeasts-admin"
                >
                  GitHub
                </LinkPreview>{' '}
                for those interested in our backend architecture.
              </p>
            </PageSection>

            <PageSection title="Key Features" id="key-features">
              <p>
                I take pride in the progress we have made on the admin panel,
                which has been built on a solid foundation for the plethora of
                features that still need to be added.
              </p>
              <ul>
                <li>
                  <strong>Role-Based Authentication and Authorization:</strong>{' '}
                  Implemented using Auth.js, featuring two-factor authentication
                  and email verification to secure user access.
                </li>
                <li>
                  <strong>Robust CMS:</strong> Utilizes Next.js server actions
                  for real-time product creation and editing, ensuring instant
                  updates on the client-side.
                </li>
                <li>
                  <strong>
                    Performance Dashboard and Customer Service Portal:
                  </strong>{' '}
                  Tools for monitoring business metrics and providing efficient
                  customer support.
                </li>
              </ul>
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
                  - A collection of accessible and fully customizable React
                  components designed with TailwindCSS.
                </li>
              </ul>

              <div className="text-3xl sm:text-4xl">Databases</div>
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
                    url="https://prisma.io/"
                  >
                    Prisma
                  </LinkPreview>{' '}
                  - Simplifies database operations, making them more reliable
                  and maintainable with an ORM
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
                    url="https://authjs.dev/"
                  >
                    Auth.js
                  </LinkPreview>{' '}
                  - provides an open-source, customizable and self-hosted
                  authentication solution
                </li>
                <li>
                  <strong>Payment Gateway:</strong> {''}
                  <LinkPreview
                    className="underline underline-offset-4"
                    url="https://stripe.com/"
                  >
                    Stripe
                  </LinkPreview>{' '}
                  - Securely processes online payments
                </li>
                <li>
                  <strong>Email Client:</strong> {''}
                  <LinkPreview
                    className="underline underline-offset-4"
                    url="https://resend.com/"
                  >
                    Resend
                  </LinkPreview>{' '}
                  - When paired with{' '}
                  <LinkPreview
                    className="underline underline-offset-4"
                    url="https://react.email/"
                  >
                    React Email
                  </LinkPreview>
                  , simplifies designing and sending emails
                </li>
                <li>
                  <strong>Server:</strong> {''}
                  <LinkPreview
                    className="underline underline-offset-4"
                    url="https://neon.tech/"
                  >
                    Neon
                  </LinkPreview>{' '}
                  - Offers a serverless platform for PostgreSQL, ensuring
                  scalability and easy management
                </li>
                <li>
                  <strong>Deployment and Analytics:</strong> {''}
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
                Developing the admin panel has been a profound learning
                experience, particularly in the areas of security and
                authorization:
              </p>
              <ul>
                <li>
                  <strong>Security Implementation:</strong> Through Auth.js, I
                  spearheaded the setup of a robust, user-friendly
                  authentication system. Enforcing two-factor authentication and
                  role-based authorization was challenging but highly
                  educational.
                </li>
                <li>
                  <strong>Scalable CMS Design:</strong> The database schema for
                  the CMS was intentionally designed to be intuitive and
                  scalable, anticipating future expansions and increased demand.
                </li>
              </ul>
            </PageSection>

            <PageSection title="The Current State" id="current-state">
              <p>
                The admin panel is a focal point for further development,
                especially compared to the more mature state of the storefront.
                My backend expertise boosts my confidence in accomplishing these
                upcoming tasks efficiently:
              </p>
              <ul>
                <li>
                  <strong>Shipping API Integration:</strong> Plans to integrate{' '}
                  <LinkPreview
                    url="https://www.shippo.com/"
                    className="underline underline-offset-4"
                  >
                    Shippo
                  </LinkPreview>{' '}
                  for streamlined shipping operations.
                </li>
                <li>
                  <strong>Enhanced Order Management:</strong> Improvements to
                  handle orders more robustly.
                </li>
                <li>
                  <strong>Performance Analytics:</strong> Adding charts to the
                  dashboard for better visibility into performance metrics.
                </li>
                <li>
                  File Upload System: Implementing{' '}
                  <LinkPreview
                    url="https://vercel.com/docs/storage/vercel-blob"
                    className="underline underline-offset-4"
                  >
                    Vercel Blob
                  </LinkPreview>{' '}
                  for managing file uploads.
                </li>
                <li>
                  <strong>Content Centralization:</strong> Moving all hard-coded
                  text, like the Mission Statement and About Us, from the
                  storefront to the admin panel for better manageability.
                </li>
              </ul>
            </PageSection>
          </PageContainer>
        </div>
      </div>
    </main>
  )
}
