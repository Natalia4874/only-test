import React, { useRef, useState } from 'react'

import styled from 'styled-components'
import { iTimelineProps } from './TimeLine.interface'

const Timeline: React.FC<iTimelineProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const radius = 268
  const itemSize = 56

  const calculatePosition = (index: number, total: number) => {
    const angle = index * (360 / total) + rotation
    const radian = (angle * Math.PI) / 180
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
    }
  }

  const rotateToItem = (index: number) => {
    const totalItems = items.length
    const targetRotation = -index * (360 / totalItems)
    setRotation(targetRotation)
    setActiveIndex(index)
  }

  console.log('===== TimeLine =====')

  return (
    <TimelineContainer ref={containerRef}>
      <CircleCenter />
      <TimelineCircle rotation={rotation}>
        {items.map((item, index) => {
          const position = calculatePosition(index++, items.length)
          const isActive = index === activeIndex
          return (
            <TimelineItemWrapper
              key={item.id}
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
          )
        })}
      </TimelineCircle>
    </TimelineContainer>
  )
}

export { Timeline }

const TimelineContainer = styled.div`
  position: relative;
  width: 800px;
  height: 800px;
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

const CircleCenter = styled.div`
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
  background: ${(props) => (props.isActive ? 'var(--color-surface-primary)' : 'var(--color-surface-tertiary)')};
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
