import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom/';
import Icon from '../images/icon.png';
//Material UI imports
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = {
  form: {
    textAlign: 'center'
  }
};

export class login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <p>HI</p>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
