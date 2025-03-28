import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import data from './assets/data/data.json';
import './index.css'
import { Timeline } from './components/TimeLine/TimeLine';
import { iEventCategory } from './components/EventList/EventList.interface';
import { Swiper } from './components/Swiper/Swiper';

const App: React.FC = () => {
  const [categories, setCategories] = useState<iEventCategory[]>([]);

  const swiperBreakpoints = {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: true
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 80,
    },
  };

  useEffect(() => {
    setCategories(data);
  }, []);

  if (!categories.length) return <div>Данные не найдены</div>;

console.log('===== App =====')

  return (
    <Container>
      <Menu />
      <Main>
        <Timeline items={categories} />
        <Header>
          <GradientLine />
          <Heading>Исторические даты</Heading>
        </Header>
        <SwiperContainer>
          <Swiper
            categories={categories} slidesPerView={3}
            spaceBetween="80"
            pagination={false}
            loop={false}
            breakpoints={swiperBreakpoints}
          />
        </SwiperContainer>
      </Main>
    </Container>
  );
};

export default App;

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
  border-right: 1px solid var(--color-border-primary);
  border-left: 1px solid var(--color-border-primary);
`

const SwiperContainer = styled.div`
  margin: 0 auto;
  padding: 56px 160px 100px 80px;
`

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
  color: #42567A;
  font-weight: 700;
  line-height: 120%;
  max-width: 350px;
`
