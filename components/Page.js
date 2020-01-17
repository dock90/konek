import Router from 'next/router'
import NProgress from 'nprogress'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Meta from './Meta'

// visualize route changes
Router.onRouteChangeStart = () => {
  NProgress.start();
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

// theme
const theme = {
  black: '#393939',
}

// styles
const StyledPage = styled.div`
  background: #FFF;
  color: ${props => props.theme.black};
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif,
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledPage>
        <Meta />
        {children}
      </StyledPage>
    </ThemeProvider>
  )
}

export default Page
