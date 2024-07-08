import React from 'react'

export default function projectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-full w-full px-5 pt-36 sm:px-10">{children}</div>
}
