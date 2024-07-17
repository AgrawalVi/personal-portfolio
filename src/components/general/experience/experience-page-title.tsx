export default function ExperiencePageTitle({
  name,
  dateText,
  position,
}: {
  name: string
  dateText: string
  position: string
}) {
  return (
    <div>
      <h1 className="w-full text-center text-5xl md:text-7xl">{name}</h1>
      <div className="flex w-full flex-col justify-between align-middle md:flex-row">
        <p className="flex w-full flex-col justify-center text-center font-nunito text-base text-muted-foreground md:text-start md:text-2xl">
          {dateText}
        </p>
        <p className="flex w-full flex-col justify-center text-center font-nunito text-base text-muted-foreground md:text-end md:text-2xl">
          {position}
        </p>
      </div>
    </div>
  )
}
