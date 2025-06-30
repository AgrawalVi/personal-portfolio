import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface EducationCardContainerProps {
  school: string
  timeLine: string
  img: string
  bulletPoints: string[]
}

export default function EducationCardContainer({
  school,
  bulletPoints,
  timeLine,
  img,
}: EducationCardContainerProps) {
  return (
    <Card className="spring-in-out relative z-[100] w-full border-2 border-purple/30 bg-black-100 shadow-[0px_0px_15px_0px_#CBACF9] transition-all duration-500 hover:scale-[1.01] hover:shadow-[0px_0px_20px_3px_#CBACF9] sm:w-[27rem]">
      <CardHeader>
        <Image
          src={img}
          width={300}
          height={200}
          alt={`${school} image`}
          className="mb-2 h-full w-full rounded-sm"
        />
        <CardTitle className="text-xl sm:text-2xl">{school}</CardTitle>
        <CardDescription className="text-base text-foreground">
          {timeLine}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="pl-5">
          {bulletPoints.map((bulletPoint, index) => (
            <li className="list-disc leading-7 text-neutral-100" key={index}>
              {bulletPoint}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
