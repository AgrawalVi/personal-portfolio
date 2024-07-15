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

interface ExperienceCardContainerProps {
  title: string
  position: string
  link: string
  img: string
  timeLine: string
  bulletPoints: string[]
  technologies: technologyItem[]
}

export default function ExperienceCardContainer({
  title,
  link,
  position,
  img,
  bulletPoints,
  timeLine,
  technologies,
}: ExperienceCardContainerProps) {
  return (
    <Card className="relative z-[100] w-full sm:w-[27rem] bg-black-100 border-purple/30 border-2 shadow-[0px_0px_15px_0px_#CBACF9] hover:shadow-[0px_0px_20px_3px_#CBACF9] hover:scale-[1.01] transition-all duration-500 spring-in-out">
      <CardHeader>
        <Image
          src={img}
          width={300}
          height={200}
          alt={`${title} image`}
          className="w-full h-full"
        />
        <div className="h-[1.75rem] sm:h-[2rem]">
          <TypewriterEffect
            cursorClassName="translate-y-1 bg-purple"
            words={title.split(' ').map((word) => ({
              text: word,
              className: 'text-xl sm:text-2xl font-normal pt-2',
            }))}
          />
        </div>
        <CardDescription className="text-base text-foreground">
          {position}
        </CardDescription>
        <CardDescription>{timeLine}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="pl-5">
          {bulletPoints.map((bulletPoint, index) => (
            <li className="text-neutral-100 list-disc leading-7" key={index}>
              {bulletPoint}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex">
          <AnimatedTooltip items={technologies} />
        </div>
        <div className="-mr-6 flex flex-col space-y-0 h-14 items-center justify-center">
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
