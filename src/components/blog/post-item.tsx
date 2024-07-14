import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import { formatDate } from '@/lib/utils'

interface PostItemProps {
  slug: string
  title: string
  description?: string
  date: string
}

export default function PostItem({
  slug,
  title,
  description,
  date,
}: PostItemProps) {
  return (
    <Card className="w-fit">
      <CardContent>
        <div>
          <h2>
            <Link href={slug}>{title}</Link>
          </h2>
          <p>{description}</p>
          <time>{formatDate(date)}</time>
        </div>
      </CardContent>
    </Card>
  )
}
