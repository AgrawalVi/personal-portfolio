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
              dateText="January 2023 - Present"
              position="Software Engineering Intern"
            />
            <ProjectPageContainer>
              <ProjectPageSection title="Summary" id="summary">
                <p>
                  As my first internship, Xorbix has provided me with
                  unparalleled opportunities for learning and growth. Throughout
                  my 8 months at Xorbix, I have worked on a diverse range of
                  projects that have significantly enhanced my skills and
                  knowledge. I could not be more thankful for this internship,
                  as it has allowed me to learn and grows in ways that I never
                  thought possible.
                </p>
              </ProjectPageSection>

              <ProjectPageSection title="Projects" id="projects">
                <div className="text-3xl sm:text-4xl">
                  First Notice of Loss Form
                </div>
                <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                  <li className="leading-normal sm:leading-loose">
                    Proof of concept for Insurance companies, where a client and
                    the insurance agent, and during their interaction, the form
                    would be filled out automatically
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Form would be filled out live during the call, not just at
                    the end of it
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Set up a pipeline for auto-filling parts of the form if a
                    client's ID or case number is provided
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Used Azure Speech To Text and OpenAI's APIs to extract
                    information from the call
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">
                  Manufacturing Quality Control Form
                </div>
                <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                  <li className="leading-normal sm:leading-loose">
                    Built off of the First Notice of Loss Form, but this would
                    auto-fill a Quality Control Agent was doing their inspection
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Would just require the agent to say aloud what their
                    findings were, and the form would be filled out
                    automatically
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Used Azure Speech To Text and OpenAI's APIs to extract
                    information from the call
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">Sensia Tech</div>
                <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                  <li className="leading-normal sm:leading-loose">
                    An EMR platform that we have built for a client over the
                    last few years. This year, they focused heavily on
                    implementing AI capabilities into the application
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    The product we have built is a transcriber during a patient
                    encounter. The transcriber would run and record the audio,
                    and after the encounter is completed, the encounter form
                    (Chief Complaint, Symptoms, Treatment, Assessment, etc.)
                    would be completed with all the necessary information.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Made improvements to the prompt, making it more accurate and
                    reliable. It also takes in previous data such as allergies
                    and historical medical conditions into account when
                    generating its response.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Contributed numerous UI improvements throughout the
                    application, making it more user-friendly and intuitive.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Application is built in Visual Basic with an ASP frontend.
                  </li>
                </ul>

                <div className="text-3xl sm:text-4xl">Time Tracking Portal</div>
                <ul className="list-disc space-y-2 pl-8 font-nunito text-lg leading-normal sm:leading-normal">
                  <li className="leading-normal sm:leading-loose">
                    First Project I started on - Old, in house time tracking
                    portal that the company uses
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Started out by making improvements to the old codebase,
                    adding little features here and there
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Later spearheaded the shift to a more modern and scalable
                    codebase, which now uses React
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Increased responsiveness of the application by up to 70%.
                  </li>
                  <li className="leading-normal sm:leading-loose">
                    Application is now built in React with a .NET backend, was
                    previously built using .NET Framework 4.7
                  </li>
                </ul>
              </ProjectPageSection>

              <ProjectPageSection title="Takeaways" id="takeaways">
                <p>
                  After starting this internship, and now that I am almost done,
                  I have learned a lot about Computer Science in the real world.
                  The first thing I learned when I started was how little I
                  actually did know. I came in with pretty much no experience
                  outside of my classes and a few things I've played with in my
                  free time. What I've learned is that the biggest tool a
                  Software Engineer can have is their ability to learn quickly,
                  always with a positive and supportive attitude. I really
                  enjoyed this internship, and I am excited for my next one!
                </p>
              </ProjectPageSection>
            </ProjectPageContainer>
          </div>
        </div>
      </TracingBeam>
    </main>
  )
}
