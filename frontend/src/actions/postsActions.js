import {
  MY_POSTS_REQUEST,
  MY_POSTS_SUCCESS,
  MY_POSTS_FAIL,
  MY_POSTS_RESET,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_BOOKMARK_REQUEST,
  POST_BOOKMARK_SUCCESS,
  POST_BOOKMARK_FAIL,
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

  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,

  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,

  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET

} from '../constants/postsConstants';
import axios from 'axios';
import { USER_DETAILS_RESET } from '../constants/userContstants';

export const myPostsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_POSTS_REQUEST
    });

    const {
      user: { token }
    } = getState().userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.get('/api/post/my', config);


    dispatch({
      type: MY_POSTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MY_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};


export const postLikeAction = (id) => async (dispatch, getState) => {
  try {

    dispatch({
      type: POST_LIKE_REQUEST
    })

    const { user: { token } } = getState().userLogin


    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.post(`/api/post/like/${id}`, {}, config)

    dispatch({
      type: POST_LIKE_SUCCESS,
      payload: data
    })

    dispatch({
      type: MY_POSTS_RESET
    })

    dispatch({
      type: LIKED_POSTS_RESET
    })

    dispatch({
      type: BOOKMARKED_POSTS_RESET
    })

    dispatch({
      type: MEDIA_POSTS_RESET
    })

    dispatch({
      type: TIMELINE_POSTS_RESET
    })

  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const postBookmarkAction = (id) => async (dispatch, getState) => {

  try {

    dispatch({
      type: POST_BOOKMARK_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.post(`/api/post/bookmark/${id}`, {}, config)

    dispatch({
      type: POST_BOOKMARK_SUCCESS,
      payload: data
    })

    dispatch({
      type: MY_POSTS_RESET
    })

    dispatch({
      type: LIKED_POSTS_RESET
    })

    dispatch({
      type: BOOKMARKED_POSTS_RESET
    })

    dispatch({
      type: MEDIA_POSTS_RESET
    })

    dispatch({
      type: TIMELINE_POSTS_RESET
    })

  } catch (error) {
    dispatch({
      type: POST_BOOKMARK_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const likedPostsAction = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: LIKED_POSTS_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.get("/api/post/like", config)

    dispatch({
      type: LIKED_POSTS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: LIKED_POSTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const bookmarkedPostsAction = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: BOOKMARKED_POSTS_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.get("/api/post/bookmark", config)

    dispatch({
      type: BOOKMARKED_POSTS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: BOOKMARKED_POSTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}



export const mediaPostsAction = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: MEDIA_POSTS_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.get("/api/post/media", config)

    dispatch({
      type: MEDIA_POSTS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: MEDIA_POSTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const timelinePostsAction = () => async (dispatch, getState) => {

  try {

    dispatch({
      type: TIMELINE_POSTS_REQUEST
    })

    const { user: { token } } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get("/api/post/timeline", config)

    dispatch({
      type: TIMELINE_POSTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TIMELINE_POSTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}



export const postAction = (postData) => async (dispatch, getState) => {
  try {

    dispatch({
      type: POST_REQUEST
    })


    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.post("/api/post/create", postData, config)

    dispatch({
      type: USER_DETAILS_RESET
    })

    dispatch({
      type: POST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}



export const postDetailsAction = (postId) => async (dispatch, getState) => {

  try {

    dispatch({
      type: POST_DETAILS_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/post/postDetails/${postId}`, config)

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }

}


export const createCommentAction = ({ comment, postId }) => async (dispatch, getState) => {

  try {

    dispatch({
      type: CREATE_COMMENT_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.post(`/api/post/comment/${postId}`, { comment }, config)

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }

}





export const deleteCommentAction = ({ postId, commentId }) => async (dispatch, getState) => {

  try {

    dispatch({
      type: DELETE_COMMENT_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.delete(`/api/post/comment/${postId}/${commentId}`, config)

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }

}




export const deletePostAction = (postId) => async (dispatch, getState) => {
  try {

    dispatch({
      type: DELETE_POST_REQUEST
    })

    const { user: { token } } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.delete(`/api/post/single/${postId}`, config)

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


