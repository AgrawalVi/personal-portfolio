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
        'my-6 rounded-md border border-l-4 px-4 w-full dark:max-w-none flex items-center',
        {
          'border-destructive bg-destructive/10 text-destructive-foreground':
            type === 'danger',
          'border-warning bg-warning/10 text-warning-foreground':
            type === 'warning',
        }
      )}
      {...props}
    >
      <div className="py-4">{children}</div>
    </div>
  )
}
