import Router from 'next/router'
import styled from 'styled-components'
import { auth } from '../firebase';
import Login from '../pages/auth/login'
import Header from './Header'
import Nav from './Nav'

const Container = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: 64px auto;
  grid-template-areas:
    "header header"
    "nav main";
  height: 100vh;
`

const Main = ({ children }) => {
  // main query here
  return (
    <Container>
      <Header />
      <Nav />
      {children}
    </Container>
  )
}

export default Main
