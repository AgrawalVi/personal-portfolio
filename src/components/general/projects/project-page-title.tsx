import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CircleArrowOutUpRight } from 'lucide-react'

interface ProjectPageTitleProps {
  name: string
  dateText: string
  githubLink: string
  viewProjectLink: string
}

export default function ProjectPageTitle({
  name,
  dateText,
  githubLink,
  viewProjectLink,
}: ProjectPageTitleProps) {
  return (
    <div>
      <h1 className="w-full text-center text-6xl sm:text-7xl">{name}</h1>
      <div className="flex flex-row justify-between w-full align-middle">
        <p className="text-start text-xl sm:text-2xl text-muted-foreground font-nunito flex flex-col justify-center">
          {dateText}
        </p>
        <div className="flex flex-row space-x-2">
          <Link
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm w-fit flex flex-row"
          >
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </Button>
          </Link>
          <Link
            href={viewProjectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm w-fit flex flex-row"
          >
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground"
            >
              <CircleArrowOutUpRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
