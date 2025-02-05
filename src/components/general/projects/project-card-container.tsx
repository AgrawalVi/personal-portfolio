import Image from 'next/image'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'

import { technologyItem } from '@/types'
import { AnimatedTooltip } from '@/components/aceternity/animated-tooltip'
import { Button } from '@/components/ui/button'
import { ChevronRight, CircleArrowOutUpRight } from 'lucide-react'
import { LinkPreview } from '@/components/aceternity/link-preview'
import { TypewriterEffect } from '@/components/aceternity/typewriter-effect'
import { IconBrandGithub } from '@tabler/icons-react'

interface ProjectCardContainerProps {
  title: string
  link: string
  img: string
  timeLine: string
  bulletPoints: string[]
  technologies: technologyItem[]
  liveLink?: string
  githubLink?: string
}

export default function ProjectCardContainer({
  title,
  link,
  img,
  bulletPoints,
  timeLine,
  technologies,
  liveLink,
  githubLink,
}: ProjectCardContainerProps) {
  return (
    <Card className="relative z-[100] flex w-full flex-col border-2 border-purple/30 bg-black-100 shadow-[0px_0px_15px_0px_#CBACF9] transition-all duration-500 ease-in-out hover:scale-[1.01] hover:shadow-[0px_0px_20px_3px_#CBACF9] sm:w-[25rem]">
      <CardHeader>
        <div className="flex justify-between">
          <div className="h-[1.75rem] sm:h-[2rem]">
            <TypewriterEffect
              cursorClassName="translate-y-1 bg-purple"
              words={title.split(' ').map((word) => ({
                text: word,
                className: 'text-xl sm:text-2xl font-normal pt-2',
              }))}
            />
          </div>
          {githubLink && (
            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <IconBrandGithub className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
        <CardDescription>{timeLine}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="pl-5">
          {bulletPoints.map((bulletPoint, index) => (
            <li className="list-disc leading-7 text-neutral-100" key={index}>
              {bulletPoint}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex">
          <AnimatedTooltip items={technologies} />
        </div>
        <div className="-mr-6 flex h-14 flex-col items-center justify-end space-y-0">
          {liveLink && (
            <LinkPreview url={liveLink} className="flex w-fit flex-row text-sm">
              Live Site <CircleArrowOutUpRight className="ml-1 h-4 w-4" />
            </LinkPreview>
          )}
          <Link href={link}>
            <Button variant="link" size={'sm'}>
              Read More <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
