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
  data?: iEventCategory[] | iEventItem[]
  type?: 'category' | 'event'
  year?: number
  text?: string
  yearStart?: number | undefined
  yearEnd?: number | undefined
  title?: string
}
