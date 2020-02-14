import React, { Component } from "react";
import Router from "next/router";
import { Query } from "react-apollo";
import styled from "styled-components";
import { auth } from "../firebase";
import { ME_QUERY } from "../queries/MeQueries";
// components
import Header from "./Header";
import Nav from "./Nav";

const Container = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
  grid-template-rows: 64px auto;
  grid-template-areas:
    "header header"
    "nav main";
  height: 100vh;
`;

class Main extends Component {
  state = {
    authUser: false,
    me: {
      me: {},
      updateMe: this.updateMe
    }
  };

  updateMe(me) {
    // TODO: Implement me!
  }

  componentDidMount() {
    this.authSubscription = auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authUser: true
        });
      } else {
        Router.push("/auth/login");
      }
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    const { children } = this.props;
    const { authUser } = this.state;
    if (authUser) {
      return (
        <Query query={ME_QUERY}>
          {({ loading, error }) => {
            // We run this query at the top level so that the cache is populated. Future queries will never
            // be in the loading state and can use the data directly.
            if (loading) return <p>loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <Container>
                <Header />
                <Nav />
                {children}
              </Container>
            );
          }}
        </Query>
      );
    }
    return null;
  }
}

export default Main;
