import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CircleArrowOutUpRight } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'

interface ProjectPageTitleProps {
  name: string
  dateText: string
  githubLink: string
  viewProjectLink?: string
}

export default function ProjectPageTitle({
  name,
  dateText,
  githubLink,
  viewProjectLink,
}: ProjectPageTitleProps) {
  return (
    <div>
      <h1 className="w-full text-center text-5xl sm:text-7xl">{name}</h1>
      <div className="flex w-full flex-row justify-between align-middle">
        <p className="flex flex-col justify-center text-start font-nunito text-base text-muted-foreground sm:text-2xl">
          {dateText}
        </p>
        <div className="flex flex-row space-x-2">
          <Link href={githubLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground"
            >
              <IconBrandGithub className="h-5 w-5" />
            </Button>
          </Link>
          {viewProjectLink && (
            <Link
              href={viewProjectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="icon"
                className="text-muted-foreground"
              >
                <CircleArrowOutUpRight className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
