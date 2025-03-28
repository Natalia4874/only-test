import React, { useRef, useState } from 'react'

import styled from 'styled-components'

import { Swiper } from '../Swiper/Swiper'
import { iTimelineProps } from './TimeLine.interface'

interface iNavButtonProps {
  disabled?: boolean
}

const Timeline: React.FC<iTimelineProps> = ({ items }) => {
  const startAngle = items.length * 2
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotation, setRotation] = useState(-360 / startAngle)
  const containerRef = useRef<HTMLDivElement>(null)

  const radius = 268
  const itemSize = 56

  const prevBtnDisabled = activeIndex === 0
  const nextBtnDisabled = activeIndex === items.length - 1

  const calculatePosition = (index: number, total: number) => {
    const angle = index * (360 / total) + rotation - 90 + 360 / total
    const radian = (angle * Math.PI) / 180
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian)
    }
  }

  const rotateToItem = (index: number) => {
    const totalItems = items.length
    const targetRotation = -index * (360 / totalItems) - 90 + 360 / totalItems
    setRotation(targetRotation)
    setActiveIndex(index)
  }

  const handlePrev = () => {
    if (prevBtnDisabled) {
      return
    }
    const newIndex = (activeIndex - 1 + items.length) % items.length
    rotateToItem(newIndex)
  }

  const handleNext = () => {
    if (nextBtnDisabled) {
      return
    }
    const newIndex = (activeIndex + 1) % items.length
    rotateToItem(newIndex)
  }

  const swiperBreakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: true
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 80
    }
  }

  return (
    <Container>
      {items.length >= 2 && items.length <= 6 && (
        <TimelineContainer ref={containerRef}>
          <TimelineCenter />
          <TimelineCircle rotation={rotation}>
            {items.map((item, index) => {
              const position = calculatePosition(index, items.length)
              const isActive = index === activeIndex
              return (
                <React.Fragment key={item.id}>
                  {isActive && (
                    <TimelineHeader>
                      <YearStart>{item.yearStart}</YearStart>
                      <YearEnd>{item.yearEnd}</YearEnd>
                    </TimelineHeader>
                  )}
                  <TimelineItemWrapper
                    x={position.x}
                    y={position.y}
                    size={itemSize}
                    isActive={isActive}
                    onClick={() => rotateToItem(index)}
                  >
                    <ItemContent>
                      <ItemNumber>{item.id}</ItemNumber>
                      {isActive && <ItemTitle>{item.title}</ItemTitle>}
                    </ItemContent>
                  </TimelineItemWrapper>
                </React.Fragment>
              )
            })}
          </TimelineCircle>
        </TimelineContainer>
      )}
      <Navigation>
        <NavigationWrapper>
          <NavigationBlock>
            <NavigationText>
              {`${activeIndex + 1}`.padStart(2, '0')}/{`${items.length}`.padStart(2, '0')}
            </NavigationText>
            <NavigationButtons>
              <NavButton disabled={prevBtnDisabled} onClick={handlePrev}>
                <svg
                  width="10"
                  height="14"
                  viewBox="0 0 10 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                    stroke="#42567A"
                    strokeWidth="2"
                  />
                </svg>
              </NavButton>
              <NavButton disabled={nextBtnDisabled} onClick={handleNext}>
                <svg
                  width="10"
                  height="14"
                  viewBox="0 0 10 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
                    stroke="#42567A"
                    strokeWidth="2"
                  />
                </svg>
              </NavButton>
            </NavigationButtons>
          </NavigationBlock>
          <NavigationSlider>
            <Swiper
              categories={items}
              initialIndex={activeIndex}
              slidesPerView={3}
              spaceBetween="80"
              pagination={false}
              loop={false}
              breakpoints={swiperBreakpoints}
            />
          </NavigationSlider>
        </NavigationWrapper>
      </Navigation>
    </Container>
  )
}

export { Timeline }

const Container = styled.div`
  position: relative;
  min-height: 600px;
`
const TimelineContainer = styled.div`
  position: relative;
  width: 100%;
  height: 1080px;
  margin: 0 auto;

  &:before {
    content: '';
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: var(--color-border-primary);
    z-index: -2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 1px;
    background: var(--color-border-primary);
    z-index: -2;
  }
`
const TimelineCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 536px;
  height: 536px;
  border: 1px solid var(--color-border-primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: -2;
`
const TimelineCircle = styled.div<{ rotation: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s ease-in-out;
`
const TimelineItemWrapper = styled.div<{ x: number; y: number; size: number; isActive: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin-left: ${(props) => props.x - props.size / 2}px;
  margin-top: ${(props) => props.y - props.size / 2}px;
  background: ${(props) =>
    props.isActive ? 'var(--color-surface-primary)' : 'var(--color-surface-tertiary)'};
  border: ${(props) => (props.isActive ? '1px solid var(--color-border-tertiary)' : '#ddd')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: ${(props) => (props.isActive ? 3 : 1)};
  transform: ${(props) => (props.isActive ? 'scale(1)' : 'scale(0.2)')};

  &:hover {
    box-shadow: ${(props) => (props.isActive ? 'var(--elevation-8)' : null)};
    transform: scale(1);
    border: 1px solid var(--color-border-tertiary);
    background: var(--color-surface-primary);
  }
`
const ItemContent = styled.div`
  position: relative;
  text-align: center;
  color: var(--color-text-primary);
`
const ItemTitle = styled.div`
  position: absolute;
  top: 0;
  left: 48px;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  z-index: 2;
  background: var(--color-surface-primary);
  padding: 0 4px;
`
const ItemNumber = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`
const NavigationSlider = styled.div`
  margin: 0 auto;
  padding: 56px 0 20px;
`
const TimelineHeader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  display: flex;
  gap: 80px;
`
const YearStart = styled.div`
  font-size: 200px;
  font-weight: 700;
  line-height: 160px;
  color: var(--color-text-accent);
`
const YearEnd = styled.div`
  font-size: 200px;
  font-weight: 700;
  line-height: 160px;
  color: var(--color-text-tertiary);
`
const Navigation = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`
const NavigationWrapper = styled.div`
  padding: 0 80px;
`
const NavigationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`
const NavigationText = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  color: var(--color-text-primary);
`
const NavigationButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`
const NavButton = styled.button<iNavButtonProps>`
  width: 50px;
  height: 50px;
  background: var(--color-surface-primary);
  border-radius: 100%;
  border: none;
  border: 1px solid var(--color-border-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`
