import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// auth view components
import Login from '../views/Auth/Login';
import ResetPass from '../views/Auth/ResetPass';
import Signup from '../views/Auth/Signup';
import SignupConfirm from '../views/Auth/SignupConfirm';

const AuthLayout = () => (
  <Router>
    <div>
      <h1>Image Placeholder</h1>
      <Route exact path="/" render={() => <Redirect to="/auth/login" />} />
      <Route exact path="/auth/signup" component={Signup} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/reset" component={ResetPass} />
      <Route exact path="/auth/confirm" component={SignupConfirm} />
    </div>
  </Router>
);

export default AuthLayout;
