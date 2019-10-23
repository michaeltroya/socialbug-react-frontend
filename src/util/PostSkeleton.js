import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//Material UI Imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  ...theme.spreadIt,
  card: {
    display: 'flex',
    marginBottom: '2rem'
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: '1rem'
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover'
  },
  handle: {
    width: 60,
    height: 17,
    backgroundColor: theme.palette.secondary.main,
    marginBottom: '.5rem'
  },
  date: {
    width: 85,
    height: 13,
    backgroundColor: theme.palette.primary.dark,
    marginBottom: '.5rem'
  },
  fullLine: {
    width: '90%',
    height: 15,
    backgroundColor: theme.palette.primary.light,
    marginBottom: '.5rem'
  },
  halfLine: {
    width: '40%',
    height: 15,
    backgroundColor: theme.palette.primary.light,
    marginBottom: '.5rem'
  }
});
const PostSkeleton = props => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSkeleton);
