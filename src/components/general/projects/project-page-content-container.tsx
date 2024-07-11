export default function ProjectPageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col py-10 space-y-16 text-xl sm:text-2xl text-neutral-300">
      {children}
    </div>
  )
}
