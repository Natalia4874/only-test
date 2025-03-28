import { SwiperOptions } from 'swiper/types'

import { iEventCategory } from '../EventList/EventList.interface'

export interface iSwiperProps {
  id?: string
  categories: iEventCategory[]
  initialIndex?: number
  isChangeOnClickSlide?: boolean
  isNavigation?: boolean
  activeSlideIndex?: number
  allowTouchMove?: boolean
  breakpoints?: {
    [ratio: string]: SwiperOptions
    [width: number]: SwiperOptions
  }
  loop?: boolean
  pagination?: boolean
  setNextBtnDisabled?: (isDisabled: boolean) => void
  setPrevBtnDisabled?: (isDisabled: boolean) => void
  slidesPerView?: number | 'auto'
  spaceBetween?: number | string
}
