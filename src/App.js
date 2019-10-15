import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import customTheme from './util/theme';
import jwtDecode from 'jwt-decode';
//Component Imports
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//Page Imports
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
//Redux imports
import { Provider } from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme(customTheme);

let auth;

const token = localStorage.FBIdToken;
if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    auth = false;
  } else {
    auth = true;
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} auth={auth} />
                <AuthRoute exact path="/signup" component={signup} auth={auth} />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
