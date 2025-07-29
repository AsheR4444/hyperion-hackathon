'use client'

import React from 'react'

interface SearchCardProps {
  title: string
  onClick: () => void
  type: 'onchain' | 'aggregator'
}

export function SearchCard({ title, onClick, type }: SearchCardProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className="group p-4 bg-gray-800 border border-gray-600 rounded-xl hover:border-amber-400 transition-colors duration-200 text-left cursor-pointer hover:bg-sky-700"
    >
      <p className="text-xs text-blue-200 capitalize mb-2">{type}</p>
      <p className="text-sm text-gray-200 group-hover:text-white transition-colors">{title}</p>
    </div>
  )
}
