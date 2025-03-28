import React from 'react'

import styled from 'styled-components'

import { iEventListProps } from './EventList.interface'

const EventList: React.FC<iEventListProps> = (props) => {
  const { year, text } = props

  return (
    <EventCard>
      <EventYear>{year}</EventYear>
      <EventText>{text}</EventText>
    </EventCard>
  )
}

export { EventList }

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  user-select: none;
`

const EventYear = styled.p`
  margin: 0;
  font-family: 'Bedas Neue';
  font-size: 25px;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 120%;
  color: var(--color-text-accent);
`

const EventText = styled.span`
  margin: 0;
  color: var(--color-text-primary);
`
