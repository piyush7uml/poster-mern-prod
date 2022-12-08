import {
  MY_POSTS_REQUEST,
  MY_POSTS_SUCCESS,
  MY_POSTS_FAIL,
  MY_POSTS_RESET,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_RESET,
  POST_BOOKMARK_REQUEST,
  POST_BOOKMARK_SUCCESS,
  POST_BOOKMARK_FAIL,
  POST_BOOKMARK_RESET,
  LIKED_POSTS_REQUEST,
  LIKED_POSTS_SUCCESS,
  LIKED_POSTS_FAIL,
  LIKED_POSTS_RESET,
  BOOKMARKED_POSTS_REQUEST,
  BOOKMARKED_POSTS_SUCCESS,
  BOOKMARKED_POSTS_FAIL,
  BOOKMARKED_POSTS_RESET,
  MEDIA_POSTS_REQUEST,
  MEDIA_POSTS_SUCCESS,
  MEDIA_POSTS_FAIL,
  MEDIA_POSTS_RESET,
  TIMELINE_POSTS_REQUEST,
  TIMELINE_POSTS_SUCCESS,
  TIMELINE_POSTS_FAIL,
  TIMELINE_POSTS_RESET,

  POST_REQUEST,
  POST_SUCCESS,
  POST_FAIL,
  POST_RESET,

  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_RESET,

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_RESET,

  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_RESET,

  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET
} from '../constants/postsConstants';

export const myPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case MY_POSTS_REQUEST:
      return { ...state, loading: true };

    case MY_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };

    case MY_POSTS_FAIL:
      return { loading: false, error: action.payload };

    case MY_POSTS_RESET:
      return { posts: [] };
    default:
      return state;
  }
};



export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true }

    case POST_LIKE_SUCCESS:
      return { loading: false, success: true }

    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload }

    case POST_LIKE_RESET:
      return {}
    default:
      return state;
  }
}


export const postBookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BOOKMARK_REQUEST:
      return { loading: true }

    case POST_BOOKMARK_SUCCESS:
      return { loading: false, success: true }

    case POST_BOOKMARK_FAIL:
      return { loading: false, error: action.payload }

    case POST_BOOKMARK_RESET:
      return {}
    default:
      return state
  }
}


export const likedPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case LIKED_POSTS_REQUEST:
      return { ...state, loading: true }

    case LIKED_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }

    case LIKED_POSTS_FAIL:
      return { loading: false, error: action.payload }

    case LIKED_POSTS_RESET:
      return { posts: [] }

    default:
      return state
  }
}


export const bookmarkedPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case BOOKMARKED_POSTS_REQUEST:
      return { ...state, loading: true }

    case BOOKMARKED_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }

    case BOOKMARKED_POSTS_FAIL:
      return { loading: false, error: action.payload }

    case BOOKMARKED_POSTS_RESET:
      return { posts: [] }

    default:
      return state
  }
}


export const mediaPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case MEDIA_POSTS_REQUEST:
      return { ...state, loading: true }

    case MEDIA_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }

    case MEDIA_POSTS_FAIL:
      return { loading: false, error: action.payload }

    case MEDIA_POSTS_RESET:
      return { posts: [] }

    default:
      return state
  }
}

export const timelinePostsReducer = (state = { posts: [] }, action) => {

  switch (action.type) {
    case TIMELINE_POSTS_REQUEST:
      return { ...state, loading: true }

    case TIMELINE_POSTS_SUCCESS:
      return { loading: false, posts: action.payload }

    case TIMELINE_POSTS_FAIL:
      return { loading: false, error: action.payload }

    case TIMELINE_POSTS_RESET:
      return { posts: [] }

    default:
      return state
  }
}

export const postReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return { loading: true }

    case POST_SUCCESS:
      return { loading: false, success: true }

    case POST_FAIL:
      return { loading: false, error: action.payload }

    case POST_RESET:
      return {}

    default:
      return state
  }
}


export const postDetailsReducer = (state = { post: {} }, action) => {

  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true }

    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload }

    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    case POST_DETAILS_RESET:
      return { post: {} }
    default:
      return state
  }
}



export const createCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { loading: true }

    case CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true }

    case CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload }

    case CREATE_COMMENT_RESET:
      return {}

    default:
      return state
  }
}



export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true }

    case DELETE_COMMENT_SUCCESS:
      return { loading: false, success: true }

    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload }

    case DELETE_COMMENT_RESET:
      return {}

    default:
      return state
  }
}



export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true }

    case DELETE_POST_SUCCESS:
      return { loading: false, success: true }

    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload }

    case DELETE_POST_RESET:
      return {}

    default:
      return state
  }
}