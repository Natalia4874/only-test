interface iTimelineItem {
  id: number
  year: number
  text: string
}

interface iTimeline {
  id: number
  yearStart: number
  yearEnd: number
  title: string
  events: iTimelineItem[]
}

interface iTimelineProps {
  items: iTimeline[]
}

export type { iTimelineProps }
