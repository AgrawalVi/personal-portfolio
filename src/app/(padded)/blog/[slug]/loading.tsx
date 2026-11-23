import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

const LINE_WIDTHS = [92, 97, 88, 95, 90, 99, 86, 94]

export default function BlogPostLoading() {
  return (
    <main className="w-full max-w-2xl">
      {/* Back link placeholder */}
      <Skeleton className="h-3 w-16 mb-8" />

      <header className="mb-6">
        {/* Date + reading time */}
        <Skeleton className="h-3 w-32 mb-3" />
        {/* Title */}
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        {/* Description */}
        <Skeleton className="h-4 w-full mb-1.5" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        {/* Tags */}
        <div className="flex gap-1.5">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
      </header>

      <Separator className="mb-8 opacity-30" />

      <div className="space-y-3">
        {LINE_WIDTHS.map((width, i) => (
          <Skeleton key={i} className="h-4" style={{ width: `${width}%` }} />
        ))}
        <Skeleton className="h-4 w-2/3" />
      </div>
    </main>
  )
}
