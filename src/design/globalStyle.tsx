/* eslint-disable import/no-webpack-loader-syntax */
import { createGlobalStyle } from 'styled-components'
import destyle from '!!raw-loader!@r0skar/destyle.css/destyle.css'

export const GlobalStyle = createGlobalStyle`
  ${destyle}

  html, body, #root {
    height: 100%;
  }

  html {
    background-color: #ffffff;
    color: #333333;
    font-size: calc(12px + 0.35vmin);
    overflow: hidden;
  }

  body {
    font-size: 1rem;
  }
`
