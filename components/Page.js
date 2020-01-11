import styled, { ThemeProvider } from 'styled-components'
import Meta from './Meta'

// theme
const theme = {
  black: '#393939',
}

// styles
const StyledPage = styled.div`
  background: #FFF;
  color: ${props => props.theme.black};
`;


const Page = ({ children }) => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Meta />
      {children}
    </StyledPage>
  </ThemeProvider>
)

export default Page
