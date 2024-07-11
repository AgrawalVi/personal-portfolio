interface ProjectPageSectionProps {
  title: string
  id: string
  children: React.ReactNode
}

export default function ProjectPageSection({
  title,
  id,
  children,
}: ProjectPageSectionProps) {
  return (
    <div id={id} className="flex flex-col space-y-8">
      <h1 className="text-center text-4xl sm:text-5xl p-3 font-semibold">
        {title}
      </h1>
      {children}
    </div>
  )
}
