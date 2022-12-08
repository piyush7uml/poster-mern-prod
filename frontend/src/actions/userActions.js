import axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
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
  USER_FOLLOWING_REQUEST,
  USER_FOLLOWING_SUCCESS,
  USER_FOLLOWING_FAIL,
  USER_FOLLOWERS_REQUEST,
  USER_FOLLOWERS_SUCCESS,
  USER_FOLLOWERS_FAIL,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,

  USER_OTHER_REQUEST,
  USER_OTHER_SUCCESS,
  USER_OTHER_FAIL,
  USER_OTHER_RESET,

  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_FAIL,

  USER_DEACTIVATE_REQUEST,
  USER_DEACTIVATE_SUCCESS,
  USER_DEACTIVATE_FAIL,
} from '../constants/userContstants';

export const userRegisterAction = user => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('/api/user/register', user, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const userLoginAction = user => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('/api/user/login', user, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const userDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    const {
      user: { token }
    } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const { data } = await axios.get('/api/user', config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const userEditAction = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_UPDATE_REQUEST
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

    const { data } = await axios.put('/api/user', user, config);

    dispatch({
      type: USER_DETAILS_UPDATE_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_DETAILS_RESET
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const userLogoutAction = () => dispatch => {
  dispatch({
    type: USER_LOGIN_RESET
  });

  dispatch({
    type: USER_DETAILS_RESET
  });

  localStorage.removeItem('userInfo');
};


export const userFollowingAction = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: USER_FOLLOWING_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios('/api/user/following', config)

    dispatch({
      type: USER_FOLLOWING_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_FOLLOWING_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}



export const userFollowersAction = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: USER_FOLLOWERS_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios('/api/user/followers', config)

    dispatch({
      type: USER_FOLLOWERS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_FOLLOWERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const userSearchAction = (keyword = " ") => async (dispatch, getState) => {
  try {

    dispatch({
      type: USER_SEARCH_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios(`/api/user/search?keyword=${keyword}`, config)

    dispatch({
      type: USER_SEARCH_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_SEARCH_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const otherUserAction = (userId) => async (dispatch, getState) => {

  try {

    dispatch({
      type: USER_OTHER_REQUEST
    })

    const { user: { token } } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.get(`/api/user/other/${userId}`, config)

    dispatch({
      type: USER_OTHER_SUCCESS,
      payload: data
    })

  } catch (error) {

    dispatch({
      type: USER_OTHER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })

  }
}




export const followUserAction = (userId) => async (dispatch, getState) => {

  try {

    dispatch({
      type: USER_FOLLOW_REQUEST
    })

    const { user: { token } } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }


    const { data } = await axios.put(`/api/user/follow/${userId}`, {}, config)

    dispatch({
      type: USER_FOLLOW_SUCCESS,
      payload: data
    })


    dispatch({
      type: USER_DETAILS_RESET
    })

    dispatch({
      type: USER_OTHER_RESET
    })

  } catch (error) {

    dispatch({
      type: USER_FOLLOW_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })

  }
}


export const userDeactivateAction = (userId) => async (dispatch, getState) => {


  try {

    dispatch({
      type: USER_DEACTIVATE_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(`/api/user/${userId}`, config)


    dispatch({
      type: USER_LOGIN_RESET
    });

    dispatch({
      type: USER_DETAILS_RESET
    });

    localStorage.removeItem('userInfo');

    dispatch({
      type: USER_DEACTIVATE_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_DEACTIVATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}



export const userDeactivateAdminAction = (userId) => async (dispatch, getState) => {


  try {

    dispatch({
      type: USER_DEACTIVATE_REQUEST
    })

    const { user: { token } } = getState().userLogin

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.delete(`/api/user/${userId}`, config)

    dispatch({
      type: USER_DEACTIVATE_SUCCESS,
      payload: data
    })


  } catch (error) {
    dispatch({
      type: USER_DEACTIVATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}




