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

interface ProjectCardContainerProps {
  title: string
  link: string
  img: string
  timeLine: string
  bulletPoints: string[]
  technologies: technologyItem[]
}

export default function ProjectCardContainer({
  title,
  link,
  img,
  bulletPoints,
  timeLine,
  technologies,
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
        <div>
          <Link href={link}>
            <Button variant="link">Read More</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
