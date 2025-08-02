'use client'

import React from 'react'
import { Search, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchCard } from './SearchCard'

type SearchFormProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onSuggestionClick: (text: string) => void
  isLoading?: boolean
  isNoMessages: boolean
  value: string
}

const searchCards = [
  { title: 'Swap 50 m.USDC to METIS', type: 'onchain' as const },
  { title: 'Swap 1 WETH to METIS', type: 'onchain' as const },
  { title: 'Swap 2 m.DAI to WMETIS', type: 'onchain' as const },
]

export function SearchForm({
  handleSubmit,
  isLoading = false,
  isNoMessages,
  onSuggestionClick,
  value,
  handleInputChange,
}: SearchFormProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      {isNoMessages && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {searchCards.map((card, index) => (
            <SearchCard
              key={index}
              title={card.title}
              onClick={() => onSuggestionClick(card.title)}
              type={card.type}
            />
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 z-10" />

          <Input
            type="text"
            placeholder="Swap 1 WETH to m.USDC in Metis"
            value={value}
            onChange={(e) => handleInputChange(e)}
            className="pl-10 sm:pl-12 pr-28 sm:pr-32 py-3 sm:py-4 h-12 sm:h-14 
                     text-sm sm:text-base bg-gray-800/80 border-gray-700 rounded-xl sm:rounded-2xl 
                     focus:bg-gray-800 focus:border-gray-600 transition-all duration-200 
                     placeholder:text-gray-400 text-gray-100 shadow-lg w-full"
          />

          <div className="absolute right-1 sm:right-2 flex items-center gap-0.5 sm:gap-1">
            <Button
              type="submit"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 bg-blue-600 hover:bg-blue-700 rounded-lg sm:rounded-xl 
                       text-white transition-colors ml-0.5 sm:ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !value}
            >
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
