import { TechnologyItem } from '@/types'
import { ExperienceCardBullets, ExperiencePageData } from '@/types/experience'

export const xorbixBulletPoints: ExperienceCardBullets[] = [
  'Xorbix is an IT Consulting Company that specializes in application development and maintenance',
  'Worked on several projects including AI POCs, a Time Tracking Portal, and many more',
]

export const xorbixTechnologies: TechnologyItem[] = [
  {
    name: '.NET',
    description: 'Developer Platform',
    image: '/logos/dotnet-logo.svg',
  },
  {
    name: 'React.js',
    description: 'JavaScript Library',
    image: '/logos/react-logo.jpg',
  },
  {
    name: 'Azure',
    description: 'Cloud Platform',
    image: '/logos/azure-logo.png',
  },
  { name: 'OpenAI', description: 'AI APIs', image: '/logos/openai-logo.jpg' },
]

export const xorbixExperiencePageData: ExperiencePageData = {
  sections: [
    {
      header: 'Summary',
      body: 'My eight-month internship at Xorbix has been a foundational experience in my career, providing me with a broad spectrum of opportunities to enhance my skills through diverse projects. I am immensely grateful for the hands-on learning and growth facilitated by this role.',
      type: 'normal',
    },
    {
      header: 'Projects',
      subsections: [
        {
          header: 'First Notice of Loss Form',
          bullets: [
            'Developed a proof of concept for insurance companies to facilitate seamless interaction between clients and agents.',
            'Implemented logic to fill the form out live during the call, not just at the end, as new information is provided.',
            "Set up a pipeline for auto-filling parts of the form if a client's ID or case number is provided",
            "Utilized Azure Speech To Text and OpenAI's APIs to extract and process information from the conversation.",
          ],
        },
        {
          header: 'Manufacturing Quality Control Form',
          bullets: [
            'Adapts the underlying technology for manufacturing quality control to auto-fill a quality control form as an agent is proceeding with the inspection.',
            'Requires the agent to say aloud what their findings are, and the form will fill out automatically.',
            "Employs Azure Speech To Text and OpenAI's APIs, similar to the First Notice of Loss Form.",
          ],
        },
        {
          header: 'Sensia Tech',
          bullets: [
            'An EMR platform that we have built for a client over the last few years. This year, the focus has been on implementing AI capabilities into the application',
            'Includes a transcriber that records and processes audio during patient encounters, completing forms with necessary details post-encounter.',
            'Improvements to the prompt for better reliability and integration of historical data such as allergies and medical conditions.',
            'Contributions to UI improvements, making the application more user-friendly and intuitive.',
            'Application is built in Visual Basic with an ASP frontend.',
          ],
        },
        {
          header: 'Time Tracking Portal',
          bullets: [
            'Started as my first project—an old, in-house time tracking portal used by the company.',
            'Began by enhancing the old codebase, adding small features incrementally.',
            'Spearheaded the transition to a modern and scalable codebase, now utilizing React.',
            'Increased the responsiveness of the application by up to 70%.',
            'The application is now built with React and a .NET backend, previously utilizing .NET Framework 4.7 and webforms.',
          ],
        },
      ],
      type: 'normal',
    },
    {
      header: 'Takeaways',
      body: 'After starting this internship, and now as I approach its conclusion, I have gained profound insights into the application of Computer Science in real-world scenarios. Initially, I was struck by how little I knew, coming into this role with limited practical experience beyond academic coursework and personal projects. Throughout this journey, I have learned that the most vital tool for a Software Engineer is not just technical skill, but the ability to learn quickly and maintain a positive, supportive attitude. This internship has been immensely enjoyable and incredibly enriching. As it draws to a close, I find myself excited and eager for the next opportunity to continue my professional growth.',
      type: 'normal',
    },
  ],
}
