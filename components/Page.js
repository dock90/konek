import styled from 'styled-components'
import Meta from './Meta'

// styles
const AppWrapper = styled.div`
  font-family: Roboto, Oxygen, Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
`;


const Page = ({ children }) => (
  <AppWrapper>
    <Meta />
    {children}
  </AppWrapper>
)

export default Page
