import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { auth } from '../firebase';
// components
import Header from './Header';
import Nav from './Nav';

const Container = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: 64px auto;
  grid-template-areas:
    'header header'
    'nav main';
  height: 100vh;
`;

class Main extends Component {
  componentDidMount() {
    const loggedIn = localStorage.getItem('auth');
    if (!loggedIn) {
      Router.push('/auth/login');
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Container>
        <Header />
        <Nav />
        {children}
      </Container>
    );
  }
}

export default Main;
