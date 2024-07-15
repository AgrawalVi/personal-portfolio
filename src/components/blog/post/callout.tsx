import { cn } from '@/lib/utils'
import { TriangleAlert } from 'lucide-react'

interface CalloutProps {
  children?: React.ReactNode
  type?: 'default' | 'warning' | 'danger'
}

export function Callout({
  children,
  type = 'default',
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        'my-6 flex w-full items-center rounded-md border border-l-4 px-4 dark:max-w-none',
        {
          'border-destructive bg-destructive/10 text-destructive-foreground':
            type === 'danger',
          'border-warning bg-warning/10 text-warning-foreground':
            type === 'warning',
        },
      )}
      {...props}
    >
      <div className="py-4">{children}</div>
    </div>
  )
}
