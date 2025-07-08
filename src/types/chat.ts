export interface Message {
  id: string
  type: 'user' | 'agent'
  content: string
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
}
