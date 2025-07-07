import React from "react";
import { Message } from "@/types/chat";
import { Bot } from "lucide-react";

interface AgentMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function AgentMessage({
  message,
  isLoading = false,
}: AgentMessageProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%] sm:max-w-[70%]">
        <div className="flex items-start gap-3">
          {/* Аватар агента */}
          <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mt-1">
            <Bot className="w-4 h-4 text-gray-300" />
          </div>

          {/* Контент сообщения */}
          <div className="flex-1">
            <div className="bg-gray-800 text-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg border border-gray-700">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400">Думаю...</span>
                </div>
              ) : (
                <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
