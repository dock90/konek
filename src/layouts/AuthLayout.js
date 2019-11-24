import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
// material
import Grid from '@material-ui/core/Grid';

// components
import Login from '../views/Auth/Login';
import ResetPass from '../views/Auth/ResetPass';
import Signup from '../views/Auth/Signup';
import SignupConfirm from '../views/Auth/SignupConfirm';

import { H1, H2 } from '../components/Typography';

// styles
const Layout = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100vh;
  background: #bbbbbb;
  background: url('https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/bg.png');
`;

const Branding = styled.div`
  color: #ffffff;
  margin-left: 3rem;
  margin-bottom: 5rem;
  max-width: 300px;
`;

// TODO: add responsive styles

const AuthLayout = () => (
  <Grid container>
    <Grid item xs={6}>
      <Layout>
        <Branding>
          <H1>CRM Beta</H1>
          <H2>Customer Relationship Management</H2>
        </Branding>
      </Layout>
    </Grid>
    <Grid item xs={6}>
      <Switch>
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/reset" component={ResetPass} />
        <Route path="/auth/confirm" component={SignupConfirm} />
        <Route render={() => <Redirect to="/auth/login" />} />
      </Switch>
    </Grid>
  </Grid>
);

export default AuthLayout;
