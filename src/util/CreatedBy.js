import React, { Component } from 'react';
//Material UI Imports
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  ...theme.spreadIt,
  createdBy: {
    position: 'absolute',
    bottom: '0',
    margin: '0 auto'
  },
  myLink: {
    color: 'white'
  }
});

class CreatedBy extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.createdBy}>
        <h5 className={classes.greyText}>
          Created By{' '}
          <a href="https://www.michaeltroya.ca/" className={classes.myLink} target="_blank" rel="noopener noreferrer">
            Michael Troya
          </a>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(CreatedBy);
