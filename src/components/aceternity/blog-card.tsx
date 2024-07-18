import { cn, formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  title: string
  description: string | undefined
  published: string
  link: string
  imageHref: string
  timeText: string
}

export function BlogCard({
  title,
  description,
  published,
  link,
  imageHref,
  timeText,
}: BlogCardProps) {
  return (
    <Link href={link}>
      <div className="group/card w-full max-w-xs">
        <div
          className={cn(
            'card backgroundImage relative mx-auto flex h-96 max-w-sm cursor-pointer flex-col justify-between overflow-hidden rounded-md bg-gradient-to-br from-secondary/50 to-accent/50 p-4 shadow-xl',
          )}
        >
          <div className="absolute left-0 top-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-secondary"></div>
          <div className="z-10 flex flex-row items-center space-x-4">
            <Image
              height="100"
              width="100"
              alt="Avatar"
              src="/vishrut.jpeg"
              className="h-10 w-10 rounded-full border-2 object-cover"
            />
            <div className="flex flex-col">
              <p className="relative z-10 text-base font-normal text-gray-50">
                Vishrut Agrawal
              </p>
              <p className="text-sm text-gray-400">{timeText}</p>
            </div>
          </div>
          <div className="text content">
            <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">
              {title}
            </h1>
            <p className="relative z-10 my-4 text-sm font-normal text-gray-50">
              {description}
            </p>
            <p className="relative z-10 my-4 text-xs font-normal text-gray-50/80">
              Published {formatDate(published)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
