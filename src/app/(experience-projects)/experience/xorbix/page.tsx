import ProjectPageContainer from '@/components/general/projects/project-page-content-container'
import ProjectPageTitle from '@/components/general/projects/project-page-title'
import Image from 'next/image'
import { LinkPreview } from '@/components/aceternity/link-preview'
import ProjectPageSection from '@/components/general/projects/project-page-section'
import { TracingBeam } from '@/components/aceternity/tracing-beam'
import ExperiencePageTitle from '@/components/general/experience/experience-page-title'

export default function ExperiencePage() {
  return (
    <main className="flex w-full justify-center pt-5 sm:pt-10">
      <TracingBeam>
        <div className="flex w-full max-w-5xl flex-col items-center justify-center">
          <div className="flex w-full flex-col pt-10">
            <ExperiencePageTitle
              name="Xorbix Technologies"
              dateText="January 2024 - Present"
              position="Software Engineering Intern"
            />
            <ProjectPageContainer>
              <ProjectPageSection title="Summary" id="summary">
                <p>
                  My eight-month internship at Xorbix has been a foundational
                  experience in my career, providing me with a broad spectrum of
                  opportunities to enhance my skills through diverse projects. I
                  am immensely grateful for the hands-on learning and growth
                  facilitated by this role.
                </p>
              </ProjectPageSection>
              <ProjectPageSection title="Projects" id="projects">
                <div className="text-3xl sm:text-4xl">
                  First Notice of Loss Form
                </div>
                <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                  <li className="leading-normal sm:leading-loose">
                    Developed a proof of concept for insurance companies to
                    facilitate seamless interaction between clients and agents.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Implemented logic to fill the form out live during the call,
                    not just at the end, as new information is provided.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Set up a pipeline for auto-filling parts of the form if a
                    client's ID or case number is provided
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Utilized Azure Speech To Text and OpenAI's APIs to extract
                    and process information from the conversation.
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">
                  Manufacturing Quality Control Form
                </div>
                <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                  <li className="leading-normal sm:leading-loose">
                    Adapts the underlying technology for manufacturing quality
                    control to auto-fill a quality control form as an agent is
                    proceeding with the inspection.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Requires the agent to say aloud what their findings are, and
                    the form will fill out automatically.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Employs Azure Speech To Text and OpenAI's APIs, similar to
                    the First Notice of Loss Form.
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">Sensia Tech</div>
                <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                  <li className="leading-normal sm:leading-loose">
                    An EMR platform that we have built for a client over the
                    last few years. This year, the focus has been on
                    implementing AI capabilities into the application
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Includes a transcriber that records and processes audio
                    during patient encounters, completing forms with necessary
                    details post-encounter.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Improvements to the prompt for better reliability and
                    integration of historical data such as allergies and medical
                    conditions.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Contributions to UI improvements, making the application
                    more user-friendly and intuitive.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Application is built in Visual Basic with an ASP frontend.
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">Time Tracking Portal</div>
                <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                  <li className="leading-normal sm:leading-loose">
                    Started as my first project—an old, in-house time tracking
                    portal used by the company.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Began by enhancing the old codebase, adding small features
                    incrementally.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Spearheaded the transition to a modern and scalable
                    codebase, now utilizing React.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Increased the responsiveness of the application by up to
                    70%.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    The application is now built with React and a .NET backend,
                    previously utilizing .NET Framework 4.7 and webforms.
                  </li>
                </ul>
              </ProjectPageSection>

              <ProjectPageSection title="Takeaways" id="takeaways">
                <p>
                  After starting this internship, and now as I approach its
                  conclusion, I have gained profound insights into the
                  application of Computer Science in real-world scenarios.
                  Initially, I was struck by how little I knew, coming into this
                  role with limited practical experience beyond academic
                  coursework and personal projects. Throughout this journey, I
                  have learned that the most vital tool for a Software Engineer
                  is not just technical skill, but the ability to learn quickly
                  and maintain a positive, supportive attitude. This internship
                  has been immensely enjoyable and incredibly enriching. As it
                  draws to a close, I find myself excited and eager for the next
                  opportunity to continue my professional growth.
                </p>
              </ProjectPageSection>
            </ProjectPageContainer>
          </div>
        </div>
      </TracingBeam>
    </main>
  )
}
