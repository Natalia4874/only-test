import React from 'react'

import styled from 'styled-components'

import { iEventListProps } from './EventList.interface'

const EventList: React.FC<iEventListProps> = (props) => {
  const { year, text, type, yearStart, yearEnd, title } = props

  return (
    <Container>
      {type === 'category' ? (
        <CategoryCard>
          <CategoryHeader>
            <CategoryYears>
              {yearStart} - {yearEnd}
            </CategoryYears>
            <CategoryTitle>{title}</CategoryTitle>
          </CategoryHeader>
        </CategoryCard>
      ) : (
        <EventCard>
          <EventYear>{year}</EventYear>
          <EventText>{text}</EventText>
        </EventCard>
      )}
    </Container>
  )
}

export { EventList }

const Container = styled.div``
const CategoryCard = styled.div``
const CategoryHeader = styled.div``
const CategoryYears = styled.div``
const CategoryTitle = styled.div`
  border: 1px solid pink;
`

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
