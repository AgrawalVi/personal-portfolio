import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CircleArrowOutUpRight } from 'lucide-react'
import { IconBrandGithub } from '@tabler/icons-react'

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
      <h1 className="w-full text-center text-5xl sm:text-7xl">{name}</h1>
      <div className="flex flex-row justify-between w-full align-middle">
        <p className="text-start text-base sm:text-2xl text-muted-foreground font-nunito flex flex-col justify-center">
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
        </div>
      </div>
    </div>
  )
}
