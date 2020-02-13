import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { API_BACKEND_URL } from './config'
import { Slide } from './types'

interface Props {
  slides: Slide[]
}

const SLIDER_WIDTH = '590px'
const SLIDER_HEIGHT = '680px'
const BULLET_SIZE = '0.5rem'
const BUTTON_SIZE = '5rem'

const Container = styled.div`
  background: #000000;
  position: relative;
  overflow: hidden;
  padding-bottom: ${(parseFloat(SLIDER_HEIGHT) / parseFloat(SLIDER_WIDTH)) * 100}%;
  width: 100%;

  @media screen and (min-width: ${SLIDER_WIDTH}) {
    padding-bottom: 0;
    height: ${SLIDER_HEIGHT};
    width: ${SLIDER_WIDTH};
  }
`

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  will-change: transform;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, min-content);
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  user-select: none;

  /* Pagination */
  & > nav:first-child {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: ${BULLET_SIZE};
    padding-left: ${BUTTON_SIZE};
  }

  /* Controls */
  & > nav:last-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

const SlideContainer = styled.div`
  height: 100%;
  width: 100%;

  & > img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`

const Button = styled.button<{ isEnabled?: boolean }>`
  background-color: #ffffff;
  display: block;
  cursor: ${({ isEnabled }) => (isEnabled ? 'pointer' : 'default')};
  pointer-events: ${({ isEnabled }) => (isEnabled ? 'auto' : 'none')};
  text-align: center;
  height: ${BUTTON_SIZE};
  width: ${BUTTON_SIZE};

  & > svg {
    opacity: ${({ isEnabled }) => (isEnabled ? 1 : 0.25)};
    fill: currentColor;
    width: 25%;
    will-change: opacity;
    transition: opacity 50ms ease-in;
  }

  &:active {
    & > svg {
      opacity: 0.5 !important;
    }
  }

  &:first-child {
    border-right: 1px solid rgba(0, 0, 0, 0.1);

    & > svg {
      transform: rotate(180deg);
    }
  }
`

const Bullet = styled.button<{ isActive?: boolean }>`
  background-color: #ffffff;
  display: block;
  cursor: pointer;
  border-radius: 50%;
  height: ${BULLET_SIZE};
  width: ${BULLET_SIZE};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.25)};
  transform: ${({ isActive }) => isActive && `translateX(calc((${BUTTON_SIZE} / 2) * -1))`};
  transition: opacity, transform 250ms cubic-bezier(0.39, 0.575, 0.565, 1);
  will-change: opacity, transform;
`

export const Slider: React.FC<Props> = ({ slides }) => {
  const $wrapper = useRef<HTMLDivElement>(null)
  const [slideWidth, setSlideWidth] = useState(0)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [draggableInstance, setDraggableInstance] = useState<Draggable>()
  const goToSlide = (slideIndex: number) => setActiveSlideIndex(slideIndex)
  const goToPrevSlide = () => goToSlide(Math.max(activeSlideIndex - 1, 0))
  const goToNextSlide = () => goToSlide(Math.min(activeSlideIndex + 1, slides.length))

  useEffect(() => {
    const getSlideWidth = () => $wrapper.current!.clientWidth
    const updateSlideWidth = () => setSlideWidth(getSlideWidth())
    const [draggable] = Draggable.create($wrapper.current!, {
      type: 'x',
      lockAxis: true,
      inertia: true,
      dragResistance: 0.2,
      edgeResistance: 0.6,
      maxDuration: 0.4,
      zIndexBoost: false
    })

    setDraggableInstance(draggable)
    setSlideWidth(getSlideWidth())
    window.addEventListener('resize', updateSlideWidth)

    return () => {
      window.removeEventListener('resize', updateSlideWidth)
      draggable.kill()
    }
  }, [])

  useEffect(() => {
    if (!draggableInstance || slideWidth === 0) return

    draggableInstance.vars.bounds = {
      minY: 0,
      maxY: 0,
      maxX: 0,
      minX: slideWidth * ((slides.length - 1) * -1)
    }

    draggableInstance.vars.snap = {
      x: (value: number) => Math.round(value / slideWidth) * slideWidth
    }

    draggableInstance.vars.onDragEnd = function() {
      setActiveSlideIndex(Math.round(Math.abs(this.endX) / slideWidth))
    }

    draggableInstance.update(true, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideWidth])

  useEffect(() => {
    if (!draggableInstance || draggableInstance.isThrowing) return

    TweenMax.to($wrapper.current, 0.25, {
      ease: Sine.easeOut,
      x: slideWidth * activeSlideIndex * -1,
      onComplete: () => draggableInstance!.update(true, false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlideIndex])

  return (
    <Container>
      <Wrapper ref={$wrapper}>
        {slides.map((slide, index) => (
          <SlideContainer key={index}>
            <img src={API_BACKEND_URL + slide.image.path} alt={slide.caption} />
          </SlideContainer>
        ))}
      </Wrapper>
      <Footer>
        <nav>
          {slides.map((_, index) => (
            <Bullet key={index} isActive={index <= activeSlideIndex} onClick={() => goToSlide(index)} />
          ))}
        </nav>
        <nav>
          <Button isEnabled={activeSlideIndex > 0} onClick={goToPrevSlide}>
            <svg viewBox="0 0 15.8 6.8">
              <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
            </svg>
          </Button>
          <Button isEnabled={activeSlideIndex + 1 < slides.length} onClick={goToNextSlide}>
            <svg viewBox="0 0 15.8 6.8">
              <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
            </svg>
          </Button>
        </nav>
      </Footer>
    </Container>
  )
}
