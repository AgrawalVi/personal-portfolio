import React from 'react'

export default function projectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full w-full px-8 pb-40 min-[370px]:px-16">{children}</div>
  )
}
