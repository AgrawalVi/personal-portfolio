import type { TerminalLine as TerminalLineType } from '@/types/terminal'

interface TerminalLineProps {
  line: TerminalLineType
}

export function TerminalLine({ line }: TerminalLineProps) {
  if (line.type === 'input') {
    return (
      <div className="text-sm leading-5 break-words">
        <span className="text-primary select-none">
          <span className="hidden sm:inline">visitor@vishrut.tech:</span>~$
        </span>{' '}
        <span className="break-all sm:break-words">{line.content as string}</span>
      </div>
    )
  }

  if (line.type === 'error') {
    return (
      <div className="text-sm leading-5 text-destructive whitespace-pre-wrap break-words">
        {line.content}
      </div>
    )
  }

  if (line.type === 'system') {
    return (
      <div className="text-sm leading-5 text-muted-foreground italic whitespace-pre-wrap break-words">
        {line.content}
      </div>
    )
  }

  return (
    <div className="text-sm leading-5 whitespace-pre-wrap break-words">
      {line.content}
    </div>
  )
}
