import ProjectPageContainer from '@/components/general/projects/project-page-content-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import Link from 'next/link'
import Image from 'next/image'
import { TriangleAlert } from 'lucide-react'
import { LinkPreview } from '@/components/aceternity/link-preview'
import ProjectPageSection from '@/components/general/projects/project-page-section'

export default function SweetBeastsPage() {
  return (
    <main className="flex w-full justify-center my-10">
      <div className="max-w-5xl w-full flex flex-col items-center justify-center">
        <ProjectPageTitle
          name="SweetBeasts"
          dateText="May 2023 - Present"
          githubLink="https://github.com/AgrawalVi/SweetBeasts"
          viewProjectLink="https://sweetbeasts-demo.vishrut.tech"
        />
        <div className="flex flex-col py-10 w-full">
          <Image
            src="/photography-section/agriculture-hall.jpg"
            width={2000}
            height={500}
            alt="agriculture hall"
          />
          <ProjectPageContainer>
            <ProjectPageSection title="Summary" id="summary">
              <p>
                I lead a team of three in developing and testing a custom
                e-commerce platform for SweetBeasts Inc, a company that I
                co-founded. As CTO and COO, I oversee all technical and
                operational aspects. Currently. The project also includes an
                advanced admin panel, detailed{' '}
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
                  We are preparing for the official launch; currently, a{' '}
                  <LinkPreview
                    url="https://sweetbeasts.shop"
                    className="underline underline-offset-4"
                  >
                    placeholder site
                  </LinkPreview>{' '}
                  is live. Explore our fully functional demo{' '}
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
                Test card Number: 4242 4242 4242 4242
              </p>
              <p className="text-center">
                Any expiration date and CVV combo will work.
              </p>
            </ProjectPageSection>

            <ProjectPageSection title="Why build custom?" id="why">
              <p>
                Opting to create a custom e-commerce platform instead of using
                solutions like Shopify was driven by a desire to:
              </p>
              <ul>
                <li>
                  Deeply understand and master the fundamentals of full-stack
                  web development
                </li>
                <li>
                  Develop a highly customizable and distinctive online presence.
                </li>
                <li>
                  Design a clean, simple, and feature-rich user experience,
                  avoiding the clutter typical of many e-commerce sites.
                </li>
              </ul>
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
                  - Ensures type safety, which enhances the developer experience
                  and application reliability
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
                Embarking on this project, I underestimated the complexity
                involved in creating an e-commerce platform. From database
                management and user authentication to integrating a robust
                payment system, the growth in my technical skills and confidence
                has been substantial. Now, as we approach launch, I appreciate
                the depth of knowledge and practical experience I've gained.
              </p>
            </ProjectPageSection>

            <ProjectPageSection title="The Current State" id="current-state">
              <p>
                Right now, the website is ready for launch, but we are waiting
                for first shipment of plushies to arrive. As soon as these
                arrive (hopefully in the next few weeks), we will be launching
                the site to the public. My Todo list:
              </p>
              <ul>
                <li>Implement Customer Reviews (in progress)</li>
                <li>Polish UI - mainly in the content pages</li>
                <li>Add more products as they are developed</li>
              </ul>
            </ProjectPageSection>
          </ProjectPageContainer>
        </div>
      </div>
    </main>
  )
}
