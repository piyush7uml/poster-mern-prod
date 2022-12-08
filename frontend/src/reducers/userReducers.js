import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAIL,
  USER_DETAILS_UPDATE_RESET,
  USER_FOLLOWING_REQUEST,
  USER_FOLLOWING_SUCCESS,
  USER_FOLLOWING_FAIL,
  USER_FOLLOWING_RESET,
  USER_FOLLOWERS_REQUEST,
  USER_FOLLOWERS_SUCCESS,
  USER_FOLLOWERS_FAIL,
  USER_FOLLOWERS_RESET,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_SEARCH_RESET,

  USER_OTHER_REQUEST,
  USER_OTHER_SUCCESS,
  USER_OTHER_FAIL,
  USER_OTHER_RESET,

  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_RESET,

  USER_DEACTIVATE_REQUEST,
  USER_DEACTIVATE_SUCCESS,
  USER_DEACTIVATE_FAIL,
  USER_DEACTIVATE_RESET
} from '../constants/userContstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGIN_RESET:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = {
    user: {
      followers: [],
      following: [],
      bookmarks: [],
      likes: [],
      media: []
    }
  },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        whoToFollow: action.payload.whoToFollow
      };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return {
        user: {
          followers: [],
          following: [],
          bookmarks: [],
          likes: [],
          media: []
        }
      };

    default:
      return state;
  }
};

export const userEditReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_UPDATE_REQUEST:
      return { loading: true };

    case USER_DETAILS_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };

    case USER_DETAILS_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};


export const userFollowingReducer = (state = { users: [] }, action) => {
  switch (action.type) {

    case USER_FOLLOWING_REQUEST:
      return { ...state, loading: true }

    case USER_FOLLOWING_SUCCESS:
      return { loading: false, users: action.payload }

    case USER_FOLLOWING_FAIL:
      return { loading: false, error: action.payload }

    case USER_FOLLOWING_RESET:
      return { users: [] }

    default:
      return state
  }
}


export const userSearchReducer = (state = { users: [] }, action) => {
  switch (action.type) {

    case USER_SEARCH_REQUEST:
      return { ...state, loading: true }

    case USER_SEARCH_SUCCESS:
      return { loading: false, users: action.payload }

    case USER_SEARCH_FAIL:
      return { loading: false, error: action.payload }

    case USER_SEARCH_RESET:
      return { users: [] }

    default:
      return state
  }
}



export const userFollowersReducer = (state = { users: [] }, action) => {
  switch (action.type) {

    case USER_FOLLOWERS_REQUEST:
      return { ...state, loading: true }

    case USER_FOLLOWERS_SUCCESS:
      return { loading: false, users: action.payload }

    case USER_FOLLOWERS_FAIL:
      return { loading: false, error: action.payload }

    case USER_FOLLOWERS_RESET:
      return { users: [] }

    default:
      return state
  }
}


export const otherUserReducer = (state = { userInform: {}, postsInform: [] }, action) => {
  switch (action.type) {
    case USER_OTHER_REQUEST:
      return { loading: true }

    case USER_OTHER_SUCCESS:
      return { loading: false, userInform: action.payload.user, postsInform: action.payload.posts }

    case USER_OTHER_FAIL:
      return { loading: false, error: action.payload }

    case USER_OTHER_RESET:
      return { userInform: {}, postsInform: [] }

    default:
      return state
  }
}



export const followUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FOLLOW_REQUEST:
      return { loading: true }

    case USER_FOLLOW_SUCCESS:
      return { loading: false, success: true }

    case USER_FOLLOW_FAIL:
      return { loading: false, error: action.payload }

    case USER_FOLLOW_RESET:
      return {}

    default:
      return state
  }
}



export const userDeactivateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DEACTIVATE_REQUEST:
      return { loading: true }

    case USER_DEACTIVATE_SUCCESS:
      return { loading: false, success: true }

    case USER_DEACTIVATE_FAIL:
      return { loading: false, error: action.payload }

    case USER_DEACTIVATE_RESET:
      return {}

    default:
      return state
  }
}