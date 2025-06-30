interface ProjectPageSectionProps {
  title: string
  id: string
  children: React.ReactNode
}

export default function PageSection({
  title,
  id,
  children,
}: ProjectPageSectionProps) {
  return (
    <div id={id} className="flex flex-col">
      <h1 className="pb-2 text-center text-4xl font-semibold sm:text-5xl">
        {title}
      </h1>
      {children}
    </div>
  )
}
