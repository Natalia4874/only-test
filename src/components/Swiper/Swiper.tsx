import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Navigation, Pagination } from 'swiper/modules'
import { SwiperClass, Swiper as SwiperJS, SwiperSlide, type SwiperRef } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import styled from 'styled-components'

import { EventList } from '../EventList/EventList'
import { iSwiperProps } from './Swiper.interface'

interface NavButtonProps {
  disabled?: boolean
}

const Swiper: React.FC<iSwiperProps> = (props) => {
  const {
    id,
    categories,
    initialIndex,
    isChangeOnClickSlide,
    isNavigation = false,
    activeSlideIndex = 0,
    allowTouchMove,
    breakpoints,
    loop,
    pagination,
    slidesPerView,
    spaceBetween
  } = props

  const initialItem = categories[initialIndex]

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false)

  const swiperRef = useRef<SwiperRef>(null)
  const [nextEl, nextRef] = useSwiperRef<HTMLDivElement>()
  const [prevEl, prevRef] = useSwiperRef<HTMLDivElement>()

  const isLoop = loop ?? true

  const updateNavigationState = useCallback(
    (swiper: SwiperClass) => {
      if (!isLoop) {
        setPrevBtnDisabled(swiper.isBeginning)
        setNextBtnDisabled(swiper.isEnd)
      }
    },
    [isLoop]
  )

  const onInitSwiper = useCallback(
    (swiper: SwiperClass) => {
      updateNavigationState(swiper)
    },
    [updateNavigationState]
  )

  const onSlideChange = useCallback(
    (swiper: SwiperClass) => {
      updateNavigationState(swiper)
      if (isChangeOnClickSlide && swiper.clickedIndex !== undefined) {
        swiper.slideTo(swiper.clickedIndex)
      }
    },
    [isChangeOnClickSlide, updateNavigationState]
  )

  const onTransitionStart = useCallback(
    (swiper: SwiperClass) => {
      updateNavigationState(swiper)
    },
    [updateNavigationState]
  )

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper
    if (swiperInstance && activeSlideIndex !== undefined) {
      swiperInstance.slideTo(activeSlideIndex)
    }
  }, [activeSlideIndex])

  return (
    <SwiperContainer id={id}>
      <NavButtonPrev
        // @ts-expect-error
        ref={prevRef}
        disabled={prevBtnDisabled}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        aria-label="Previous slide"
      >
        <svg
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2" />
        </svg>
      </NavButtonPrev>
      <NavButtonNext
        // @ts-expect-error
        ref={nextRef}
        disabled={nextBtnDisabled}
        onClick={() => swiperRef.current?.swiper.slideNext()}
        aria-label="Next slide"
      >
        <svg
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="#42567A" strokeWidth="2" />
        </svg>
      </NavButtonNext>

      <SwiperJS
        ref={swiperRef}
        allowTouchMove={allowTouchMove}
        breakpoints={breakpoints}
        loop={isLoop}
        modules={[Navigation, Pagination]}
        navigation={isNavigation ? { nextEl, prevEl } : false}
        pagination={pagination}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        onInit={onInitSwiper}
        onSlideChange={onSlideChange}
        // @ts-expect-error
        onTransitionStart={onTransitionStart}
      >
        {initialItem.events.map((event) => (
          <SwiperSlide key={`event-${event.id}`}>
            <EventList year={event.year} text={event.text} />
          </SwiperSlide>
        ))}
      </SwiperJS>
    </SwiperContainer>
  )
}

const useSwiperRef = <T extends HTMLElement>(): [T | null, React.Ref<T>] => {
  const [wrapper, setWrapper] = useState<T | null>(null)
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current)
    }
  }, [])

  return [wrapper, ref]
}

export { Swiper }

const SwiperContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`

const NavButton = styled.button<NavButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: var(--color-surface-primary);
  border-radius: 100%;
  border: none;
  box-shadow: var(--elevation-8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

  &:hover:not(:disabled) {
    opacity: 0.8;
    transform: translateY(-50%) scale(1.1);
  }

  svg path {
    stroke: ${({ disabled }) => (disabled ? '#999' : '#42567A')};
  }
`

const NavButtonPrev = styled(NavButton)`
  left: -60px;
`

const NavButtonNext = styled(NavButton)`
  right: -60px;
`
