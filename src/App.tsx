import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from './design/globalStyle'
import { API_BACKEND_URL, API_TOKEN } from './config'
import { Slider } from './components/Slider'
import { Slide } from './types'

enum Status {
  FETCHING = 'fetching',
  FETCHED = 'fetched',
  FAILED = 'failed'
}

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const App: React.FC = () => {
  const [data, setData] = useState<Slide[]>([])
  const [status, setStatus] = useState<Status>()

  useEffect(() => {
    const fetchData = async () => {
      setStatus(Status.FETCHING)

      try {
        const response = await fetch(`${API_BACKEND_URL}/cockpit/api/collections/get/items?token=${API_TOKEN}`)
        const { entries } = await response.json()
        setData(entries)
        setStatus(Status.FETCHED)
      } catch (e) {
        console.error(e)
        setStatus(Status.FAILED)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {status === Status.FETCHING && <p>Loading...</p>}
        {status === Status.FAILED && <p>Failed to load data.</p>}
        {status === Status.FETCHED && <Slider slides={data} />}
      </AppContainer>
    </>
  )
}
