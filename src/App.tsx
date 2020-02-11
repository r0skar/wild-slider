import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from './globalStyle'

const SLIDER_WIDTH = '590px'
const SLIDER_HEIGHT = '680px'
const FOOTER_HEIGHT = '5rem'
const PAGINATION_BULLET_SIZE = '0.75rem'

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const GalleryContainer = styled.div`
  background-color: red;
  position: relative;
  overflow: hidden;
  padding-bottom: ${(parseFloat(SLIDER_WIDTH) / parseFloat(SLIDER_HEIGHT)) * 100}%;
  width: 100%;

  @media screen and (min-width: ${SLIDER_WIDTH}) {
    padding-bottom: 0;
    height: ${SLIDER_HEIGHT};
    width: ${SLIDER_WIDTH};
  }
`

const GalleryFooter = styled.div`
  background-color: green;
  display: grid;
  grid-template-columns: repeat(2, min-content);
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  right: 0;
  height: ${FOOTER_HEIGHT};
  width: 100%;
  z-index: 1;
  user-select: none;
`

const GalleryPagination = styled.div`
  background-color: violet;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${PAGINATION_BULLET_SIZE};
  padding-left: calc(${FOOTER_HEIGHT} / 2);
`

const PaginationBullet = styled.button<{ isActive?: boolean; isLast?: boolean }>`
  background-color: ${({ isActive }) => (isActive ? 'yellow' : 'grey')};
  border-radius: 50%;
  display: block;
  cursor: pointer;
  margin-right: ${({ isLast }) => isLast && `calc(${PAGINATION_BULLET_SIZE} * 2)`};
  height: ${PAGINATION_BULLET_SIZE};
  width: ${PAGINATION_BULLET_SIZE};
`

const GalleryNav = styled.nav`
  background-color: blue;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1px;
`

const NavButton = styled.button<{ isEnabled?: boolean }>`
  background-color: pink;
  color: ${({ isEnabled }) => (isEnabled ? 'yellow' : 'grey')};
  height: 100%;
  display: block;
  cursor: ${({ isEnabled }) => (isEnabled ? 'pointer' : 'default')};
  text-align: center;
  width: ${FOOTER_HEIGHT};
`

const ArrowIcon = styled.svg<{ isInverted?: boolean }>`
  fill: currentColor;
  transform: ${({ isInverted }) => isInverted && 'rotate(180deg)'};
  width: calc(${PAGINATION_BULLET_SIZE} * 2);
`

const GalleryWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
`

const GalleryItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

export const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppContainer>
      <GalleryContainer>
        <GalleryWrapper>
          <GalleryItem>GalleryItem</GalleryItem>
          <GalleryItem>GalleryItem</GalleryItem>
          <GalleryItem>GalleryItem</GalleryItem>
          <GalleryItem>GalleryItem</GalleryItem>
        </GalleryWrapper>
        <GalleryFooter>
          <GalleryPagination>
            <PaginationBullet isActive={true} isLast={true} />
            <PaginationBullet />
            <PaginationBullet />
            <PaginationBullet />
          </GalleryPagination>
          <GalleryNav>
            <NavButton>
              <ArrowIcon viewBox="0 0 15.8 6.8" isInverted={true}>
                <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
              </ArrowIcon>
            </NavButton>
            <NavButton isEnabled={true}>
              <ArrowIcon viewBox="0 0 15.8 6.8">
                <polygon points="11.6,0 10.9,0.8 13.6,2.9 0,2.9 0,3.9 13.6,3.9 10.9,6 11.6,6.8 15.8,3.4 " />
              </ArrowIcon>
            </NavButton>
          </GalleryNav>
        </GalleryFooter>
      </GalleryContainer>
    </AppContainer>
  </>
)
