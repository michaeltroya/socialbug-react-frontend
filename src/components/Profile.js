import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Material UI Imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
//Redux Imports
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading
      }
    } = this.props;
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
