export default function ProjectPageContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col space-y-16 pt-10 text-sm text-neutral-300 sm:text-base md:text-xl lg:text-2xl">
      {children}
    </div>
  )
}
