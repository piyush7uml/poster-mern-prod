import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userEditReducer,
  userFollowingReducer,
  userFollowersReducer,
  userSearchReducer,
  otherUserReducer,
  followUserReducer,
  userDeactivateReducer
} from './reducers/userReducers';
import { myPostsReducer, postLikeReducer, postBookmarkReducer, likedPostsReducer, bookmarkedPostsReducer, mediaPostsReducer, timelinePostsReducer, postReducer, postDetailsReducer, createCommentReducer, deleteCommentReducer, deletePostReducer } from './reducers/postsReducer';

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userEdit: userEditReducer,
  myPosts: myPostsReducer,
  postLike: postLikeReducer,
  postBookmar: postBookmarkReducer,
  likedPosts: likedPostsReducer,
  bookmarkedPosts: bookmarkedPostsReducer,
  mediaPosts: mediaPostsReducer,
  timelinePosts: timelinePostsReducer,
  userFollowing: userFollowingReducer,
  userFollowers: userFollowersReducer,
  userSearch: userSearchReducer,
  post: postReducer,
  postDetails: postDetailsReducer,
  createComment: createCommentReducer,
  deleteComment: deleteCommentReducer,
  deletePost: deletePostReducer,
  otherUser: otherUserReducer,
  followUser: followUserReducer,
  userDeactivate: userDeactivateReducer
});

const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { user: userLoginFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
