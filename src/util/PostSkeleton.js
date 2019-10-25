import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//Material UI Imports
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  ...theme.spreadIt,
  pic: {
    backgroundColor: theme.palette.secondary.main
  }
});
const PostSkeleton = props => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardContent className={classes.cardContent}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item sm={3} xs={6}>
            <div className={classes.pic} />
          </Grid>
          <Grid item sm={9} xs={6}>
            <div className={classes.handle} />
            <div className={classes.date} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSkeleton);
