import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom/';
import PropTypes from 'prop-types';
import ToolButton from '../util/ToolButton';
//Material UI Imports
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//Material Icon imports
import Notifications from '@material-ui/icons/Notifications';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
//Redux Imports
import { connect } from 'react-redux';
import CreatePost from './CreatePost';

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <ToolBar className="nav-bar">
          {authenticated ? (
            <Fragment>
              <CreatePost />
              <Link to="/">
                <ToolButton tip="Home">
                  <HomeIcon color="secondary" />
                </ToolButton>
              </Link>
              <ToolButton tip="Notifications">
                <Notifications color="secondary" />
              </ToolButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
