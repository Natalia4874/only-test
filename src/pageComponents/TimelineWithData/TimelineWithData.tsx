import styled from 'styled-components'

import { Timeline } from '../../components/TimeLine/TimeLine'
import { iTimelineWithDataProps } from './iTimelineWithData.interface'

const TimelineWithData: React.FC<iTimelineWithDataProps> = (props) => {
  const { data } = props

  return (
    <>
      <Header>
        <GradientLine />
        <Heading>Исторические даты</Heading>
      </Header>
      <Timeline items={data} />
    </>
  )
}

export { TimelineWithData }

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 76px;
  position: absolute;
  top: 120px;
  left: 0;
`

const GradientLine = styled.div`
  background: var(--color-gradient-primary);
  width: 5px;
  height: 120px;
`

const Heading = styled.div`
  font-size: 56px;
  color: #42567a;
  font-weight: 700;
  line-height: 120%;
  max-width: 350px;
`
