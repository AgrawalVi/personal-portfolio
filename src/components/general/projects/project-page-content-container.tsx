export default function ProjectPageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col pt-10 space-y-16 text-sm sm:text-base md:text-xl lg:text-2xl text-neutral-300">
      {children}
    </div>
  )
}
