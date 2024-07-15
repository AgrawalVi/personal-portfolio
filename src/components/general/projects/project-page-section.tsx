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
      <h1 className="p-3 text-center text-4xl font-semibold sm:text-5xl">
        {title}
      </h1>
      {children}
    </div>
  )
}
