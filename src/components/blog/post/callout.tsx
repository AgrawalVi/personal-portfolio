import { cn } from '@/lib/utils'

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
        'my-6 items-start rounded-md border border-l-4 px-4 w-full dark:max-w-none',
        {
          'border-destructive bg-destructive/10 text-destructive-foreground':
            type === 'danger',
          'border-yellow-900 bg-yellow-50 dark:prose': type === 'warning',
        }
      )}
      {...props}
    >
      {children}
    </div>
  )
}
