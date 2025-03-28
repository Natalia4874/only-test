export interface iEventItem {
  id: number
  year: number
  text: string
}

export interface iEventCategory {
  id: number
  yearStart: number
  yearEnd: number
  title: string
  events: iEventItem[]
}

export interface iEventListProps {
  year?: number
  text?: string
}
