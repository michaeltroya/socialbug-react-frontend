import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'react-router-dom/Link';
//Material UI Imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'flex',
    marginBottom: '2rem'
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: '1rem',
    objectFit: 'cover'
  }
};

export class Post extends Component {
  render() {
    const {
      classes,
      post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount }
    } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia image={userImage} title="Profile Picutre" className={classes.image} />
          <CardContent className={classes.content}>
            <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {createdAt}
            </Typography>
            <Typography variant="body1">{body}</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Post);
