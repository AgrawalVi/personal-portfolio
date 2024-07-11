import React from 'react'

export default function projectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full w-full px-8 min-[370px]:px-16 pt-5 sm:pt-10 pb-16">{children}</div>
  )
}
