"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Paperclip, Mic, Send } from "lucide-react";

interface SearchFormProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function SearchForm({
  onSendMessage,
  isLoading = false,
}: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSendMessage(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Иконка поиска слева */}
          <Search className="absolute left-3 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 z-10" />

          {/* Поле ввода */}
          <Input
            type="text"
            placeholder="Ask anything or @ mention a Space"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 sm:pl-12 pr-28 sm:pr-32 py-3 sm:py-4 h-12 sm:h-14 
                     text-sm sm:text-base bg-gray-800/80 border-gray-700 rounded-xl sm:rounded-2xl 
                     focus:bg-gray-800 focus:border-gray-600 transition-all duration-200 
                     placeholder:text-gray-400 text-gray-100 shadow-lg w-full"
          />

          {/* Группа иконок справа */}
          <div className="absolute right-1 sm:right-2 flex items-center gap-0.5 sm:gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-gray-700/50 rounded-lg sm:rounded-xl 
                       text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Paperclip className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-gray-700/50 rounded-lg sm:rounded-xl 
                       text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>

            <Button
              type="submit"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 bg-blue-600 hover:bg-blue-700 rounded-lg sm:rounded-xl 
                       text-white transition-colors ml-0.5 sm:ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!query.trim() || isLoading}
            >
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
