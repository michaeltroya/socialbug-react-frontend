import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => (auth === true ? <Redirect to="/" /> : <Component {...props} />)} />
);

const mapStateToProps = () => ({
  authenticated: state.user.authenticated
});

AuthRoute.PropTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AuthRoute);
