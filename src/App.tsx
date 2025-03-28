import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import data from './assets/data/data.json'

import './index.css'

import { iEventCategory } from './components/EventList/EventList.interface'
import { TimelineWithData } from './pageComponents/TimelineWithData/TimelineWithData'

const App: React.FC = () => {
  const [categories, setCategories] = useState<iEventCategory[]>([])

  useEffect(() => {
    setCategories(data)
  }, [])

  if (!categories.length) return <div>Загружаем данные</div>

  return (
    <Container>
      <Menu />
      <Main>
        <TimelineWithData data={categories} />
      </Main>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  width: 100%;
`

const Menu = styled.div`
  min-width: 320px;
`

const Main = styled.div`
  min-width: 1440px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border-primary);
  border-left: 1px solid var(--color-border-primary);
`
