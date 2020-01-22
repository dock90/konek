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
  state = {
    authUser: false,
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authUser: true,
        });
      } else {
        Router.push('/auth/login');
      }
    });
  }

  render() {
    const { children } = this.props;
    const { authUser } = this.state;
    if (authUser) {
      return (
        <Container>
          <Header />
          <Nav />
          {children}
        </Container>
      );
    }
    return null;
  }
}

export default Main;
