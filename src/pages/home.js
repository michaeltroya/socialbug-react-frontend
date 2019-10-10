import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

export class home extends Component {
  render() {
    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          <h1>Posts</h1>
        </Grid>
        <Grid item sm={4} xs={12}>
          <h1>Profile</h1>
        </Grid>
      </Grid>
    );
  }
}

export default home;
