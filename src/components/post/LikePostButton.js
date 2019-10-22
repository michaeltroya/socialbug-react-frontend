import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';
import ToolButton from '../../util/ToolButton';
import withStyles from '@material-ui/core/styles/withStyles';
//Icon imports
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux Imports
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

class LikePostButton extends Component {
  likedPost = () => {
    if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.postId)) return true;
    else return false;
  };

  likeThePost = () => {
    this.props.likePost(this.props.postId);
  };

  unlikeThePost = () => {
    this.props.unlikePost(this.props.postId);
  };

  render() {
    const {
      user: { authenticated }
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <ToolButton tip="Like">
          <FavoriteBorder color="secondary" />
        </ToolButton>
      </Link>
    ) : this.likedPost() ? (
      <ToolButton tip="Unlike" onClick={this.unlikeThePost}>
        <FavoriteIcon color="secondary" />
      </ToolButton>
    ) : (
      <ToolButton tip="Like" onClick={this.likeThePost}>
        <FavoriteBorder color="secondary" />
      </ToolButton>
    );

    return likeButton;
  }
}

LikePostButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikePostButton);
