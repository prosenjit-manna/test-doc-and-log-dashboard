import React from 'react'

export default function ContentFrame({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`p-5 ${className}`}>{children}</div>
  )
}
