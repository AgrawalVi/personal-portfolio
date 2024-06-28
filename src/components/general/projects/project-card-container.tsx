import Image from "next/image"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

import { technologyItem } from "@/types"
import { AnimatedTooltip } from "@/components/aceternity/animated-tooltip"
import { Button } from "@/components/ui/button"
import { ChevronRight, CircleArrowOutUpRight } from "lucide-react"

interface ProjectCardContainerProps {
  title: string
  link: string
  img: string
  timeLine: string
  bulletPoints: string[]
  technologies: technologyItem[]
  liveLink?: string
}

export default function ProjectCardContainer({
  title,
  link,
  img,
  bulletPoints,
  timeLine,
  technologies,
  liveLink,
}: ProjectCardContainerProps) {
  return (
    <Card className="relative z-[100]">
      <CardHeader>
        <Image
          src={img}
          width={300}
          height={200}
          alt={`${title} image`}
          className="w-full h-full"
        />
        <CardTitle className="pt-3">{title}</CardTitle>
        <CardDescription>{timeLine}</CardDescription>
      </CardHeader>
      <CardContent>
        {bulletPoints.map((bulletPoint, index) => (
          <CardDescription key={index}>{bulletPoint}</CardDescription>
        ))}
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex">
          <AnimatedTooltip items={technologies} />
        </div>
        <div className="-mr-6 flex flex-col space-y-0 h-14 justify-center">
          <Link href={link}>
            <Button variant="link" size={"sm"}>
              Read More <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
          {liveLink && (
            <Link href={liveLink} target="_blank" rel="noopener noreferrer">
              <Button variant="link" size={"sm"}>
                Live Site <CircleArrowOutUpRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
