import ProjectPageContainer from '@/components/general/projects/project-page-content-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import Image from 'next/image'
import { LinkPreview } from '@/components/aceternity/link-preview'
import ProjectPageSection from '@/components/general/projects/project-page-section'
import { TracingBeam } from '@/components/aceternity/tracing-beam'
import ImageCarousel from '@/components/general/projects/image-carousel'
import { Callout } from '@/components/blog/post/callout'

export default function SweetBeastsPage() {
  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <TracingBeam>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center">
          <ProjectPageTitle
            name="SweetBeasts"
            dateText="May 2024 - Present"
            githubLink="https://github.com/AgrawalVi/SweetBeasts/tree/testing"
            viewProjectLink="https://sweetbeasts-demo.vishrut.tech"
          />
          <div className="flex w-full flex-col pt-10">
            <ImageCarousel
              images={[
                '/projects/sweetbeasts/account-page.png',
                '/projects/sweetbeasts/product-page.png',
                '/projects/sweetbeasts/cart.png',
                '/projects/sweetbeasts/guest-order.png',
              ]}
            />
            <ProjectPageContainer>
              <ProjectPageSection title="Summary" id="summary">
                <p>
                  As the CTO and COO of SweetBeasts Inc., a company I
                  co-founded, I lead a team of three in developing and testing a
                  bespoke e-commerce platform. My responsibilities span all
                  technical and operational aspects of the project, which
                  features an advanced admin panel detailed{' '}
                  <LinkPreview
                    url="/projects/sweetbeasts-admin"
                    className="underline underline-offset-4"
                  >
                    here.
                  </LinkPreview>
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="Demo Site" id="demo-site">
                <div>
                  <p>
                    Our official launch is on the horizon, but in the meantime,
                    a{' '}
                    <LinkPreview
                      url="https://sweetbeasts.shop"
                      className="underline underline-offset-4"
                    >
                      placeholder site
                    </LinkPreview>{' '}
                    is live. But, you can explore our fully functional demo{' '}
                    <LinkPreview
                      url="https://sweetbeasts-demo.vishrut.tech"
                      className="underline underline-offset-4"
                    >
                      here
                    </LinkPreview>
                    , which operates in Stripe's test mode.
                  </p>
                </div>
                <p className="text-center">
                  Test card number: 4242 4242 4242 4242
                </p>
                <p className="text-center">
                  Any expiration date and CVV combo will work.
                </p>
                <Callout type="warning">
                  Currently there is a bug after checking out. When redirected
                  back to the site from stripe, refresh the page and you will
                  see the order confirmation page. This is being investigated
                  and a solution will be released soon.
                </Callout>
              </ProjectPageSection>

              <ProjectPageSection title="Why build custom?" id="why">
                <p>
                  We chose to create our custom e-commerce platform for several
                  reasons:
                </p>
                <ul>
                  <li>
                    To gain a deep understanding of full-stack web development
                    fundamentals.
                  </li>
                  <li>
                    To craft a highly customizable and distinctive online
                    presence.
                  </li>
                  <li>
                    To design a clean, simple, and feature-rich user experience,
                    steering clear of the typical clutter found on many
                    e-commerce sites.
                  </li>
                </ul>
              </ProjectPageSection>

              <ProjectPageSection title="Key Features" id="key-features">
                <p>
                  I am immensely proud of what we've built—a solid foundation
                  using the latest technologies and best practices:
                </p>
                <ul>
                  <li>
                    All data fetching, except for cart management which uses
                    React Query, is performed using Next.js server components,
                    enhancing security and user experience.
                  </li>
                  <li>
                    Efficient handling of both remote and local cart tracking
                    for guests and registered users, including cart merging and
                    deletion upon login, logout, and checkout.
                  </li>
                  <li>
                    Complete Stripe integration for secure payment, order, and
                    customer management via Stripe Payments and webhooks.
                  </li>
                  <li>
                    A modern, playful, and responsive UI that's visually
                    appealing and easy to navigate.
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
                    enhance our user experience
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
                  Creating this platform revealed the complexity of e-commerce
                  systems, from database management to payment integration. The
                  journey significantly boosted my technical skills and
                  confidence. As we near the launch, my appreciation deepens for
                  the comprehensive experience gained.
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="The Current State" id="current-state">
                <p>
                  The website is primed for launch, pending the arrival of our
                  first plushie shipment. We expect to go live within the next
                  few weeks. Despite nearing completion, continual improvement
                  remains a focus:
                </p>
                <ul>
                  <li>Implement Customer Reviews (in progress)</li>
                  <li>Switch analytics to Posthog</li>
                  <li>Polish UI - mainly in the content pages</li>
                  <li>Add more products as they are developed</li>
                </ul>
              </ProjectPageSection>
            </ProjectPageContainer>
          </div>
        </div>
      </TracingBeam>
    </main>
  )
}
