import ProjectPageContainer from '@/components/general/projects/project-page-content-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import Link from 'next/link'
import Image from 'next/image'
import { TriangleAlert } from 'lucide-react'
import { LinkPreview } from '@/components/aceternity/link-preview'
import ProjectPageSection from '@/components/general/projects/project-page-section'
import { TracingBeam } from '@/components/aceternity/tracing-beam'
import ImageCarousel from '@/components/general/projects/image-carousel'

export default function SweetBeastsAdminPage() {
  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <TracingBeam>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center">
          <ProjectPageTitle
            name="SweetBeasts Admin"
            dateText="May 2024 - Present"
            githubLink="https://github.com/AgrawalVi/sweetbeasts-admin"
          />
          <div className="flex w-full flex-col pt-10">
            <ImageCarousel
              images={[
                '/projects/sweetbeasts-admin/products-page.png',
                '/projects/sweetbeasts-admin/edit-product.png',
                '/projects/sweetbeasts-admin/two-factor.png',
              ]}
            />
            <ProjectPageContainer>
              <ProjectPageSection title="Summary" id="summary">
                <p>
                  I lead a team of three in developing and testing a custom
                  e-commerce admin panel for SweetBeasts Inc, a company that I
                  co-founded. As CTO and COO, I oversee all technical and
                  operational aspects. You can learn more about the storefront{' '}
                  <LinkPreview
                    url="/projects/sweetbeasts"
                    className="underline underline-offset-4"
                  >
                    here.
                  </LinkPreview>{' '}
                  Due to the nature of the project, there is no public access to
                  the admin panel (but the code is available on{' '}
                  <LinkPreview
                    className="underline underline-offset-4"
                    url="https://github.com/AgrawalVi/sweetbeasts-admin"
                  >
                    GitHub
                  </LinkPreview>
                  ).
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="Key Features" id="key-features">
                <p>
                  While there's still work to be done for the admin panel, I'm
                  proud of what we've built so far. The platform is built on a
                  solid foundation which will be easy to maintain and scale in
                  the near future.
                </p>
                <ul>
                  <li>
                    Role based authentication and authorization for all users
                    via two factor authentication and email verification, which
                    was custom built using Auth.js.
                  </li>
                  <li>
                    A robust CMS for product creation and editing using Next.js
                    server actions and instant client-side updates after actions
                    are completed.
                  </li>
                  <li>
                    A dashboard for viewing performance and metrics, as well as
                    a customer service portal for customer support.
                  </li>
                </ul>
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
                    - Celebrated for its reliability, scalability, and
                    flexibility
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
              </ProjectPageSection>

              <ProjectPageSection title="Takeaways" id="takeaways">
                <p>
                  My primary learnings from developing the admin panel centered
                  on security and authorization. Using Auth.js, I successfully
                  implemented a robust authentication system that is both
                  user-friendly and secure. A notable challenge was enforcing
                  two-factor authentication as well as role based authorization
                  for all users - a hurdle that proved invaluable for my
                  understanding of advanced security measures. For future
                  projects, I might opt for a hosted authentication solution
                  like {''}
                  <LinkPreview
                    url="https://clerk.com"
                    className="underline underline-offset-4"
                  >
                    Clerk
                  </LinkPreview>{' '}
                  to streamline processes, but this experience was instrumental
                  in grounding me in the fundamentals of authentication.
                  Additionally, the CMS's database schema was crafted to be both
                  intuitive and scalable, preparing it for anticipated future
                  expansions. I implemented key features such as real time
                  product creation and editing, order management, and a customer
                  service portal.
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="The Current State" id="current-state">
                <p>
                  Compared to the state of the storefront, the admin panel is
                  definitely where my attention needs to go. I am confident that
                  I will be able to get these tasks done in a timely manner, as
                  I am much more efficient when working in the backend. Right
                  now, this is what's on my punch list:
                </p>
                <ul>
                  <li>
                    Tying in a shipping API - planning on using{' '}
                    <LinkPreview
                      url="https://www.shippo.com/"
                      className="underline underline-offset-4"
                    >
                      Shippo
                    </LinkPreview>
                  </li>
                  <li>Making order management more robust</li>
                  <li>
                    Adding charts to the dashboard to view performance and
                    metrics
                  </li>
                  <li>
                    File upload system - planning on using{' '}
                    <LinkPreview
                      url="https://uploadthing.com/"
                      className="underline underline-offset-4"
                    >
                      Upload Thing
                    </LinkPreview>
                  </li>
                  <li>
                    Transitioning all hard-coded text in the storefront to the
                    admin panel (e.g. Mission Statement, About Us, etc.)
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
