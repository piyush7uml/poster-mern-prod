import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { timelinePostsAction } from '../actions/postsActions';
import { TIMELINE_POSTS_RESET } from '../constants/postsConstants';
import Posts from '../components/Posts';
import Loader from '../components/Loader';
import Message from '../components/Message';


const HomeScreen = ({ history }) => {



  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);

  const { user: userInfo } = userLogin;

  const timelinePosts = useSelector(state => state.timelinePosts)

  const { loading, posts, error } = timelinePosts

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    } else {

      if (!posts || posts.length === 0) {
        dispatch(timelinePostsAction())
      }

    }
  }, [userInfo, dispatch, history, posts]);




  useEffect(() => {
    return () => {
      dispatch({
        type: TIMELINE_POSTS_RESET
      })
    }
  }, [])

  return (
    <Header compAdd={'/home'}>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <>
          {posts && posts.map((post) => {
            return <Posts key={post._id} postDetails={post} user={userInfo} history={history} />
          })}
        </>
      )}
    </Header>
  );
};

export default HomeScreen;
