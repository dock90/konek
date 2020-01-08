import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Page from '../components/Page'

const theme = {
  primary: 'green',
}

class CRM extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    )
  }
}

export default CRM

