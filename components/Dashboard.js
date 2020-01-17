import Link from 'next/link'
import styled from 'styled-components'
import { auth } from '../firebase'
// components
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
  if (!auth.currentUser) {
    return (
      <div>
        <p>You need to login to view this page :)</p>
        <Link href="/auth/login">
          <a>
            <button>TAKE ME TO THE LOGIN</button>
          </a>
        </Link>
      </div>
    )
  }
  return (
    <Container>
      <Header />
      <Nav />
      {children}
    </Container>
  )
}

export default Main
