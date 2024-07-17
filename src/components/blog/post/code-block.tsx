export default function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="max-w-[80vw] overflow-x-auto min-[420px]:max-w-[85vw]">
      {children}
    </div>
  )
}
