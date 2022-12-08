import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '../components/Posts';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { myPostsAction, } from '../actions/postsActions';
import { MY_POSTS_RESET, } from '../constants/postsConstants';


const MyPostsScreens = ({ history }) => {
  const dispatch = useDispatch();

  const myPosts = useSelector(state => state.myPosts);

  const { loading, posts, error } = myPosts;

  const userLogin = useSelector(state => state.userLogin)

  const { user } = userLogin


  useEffect(() => {
    if (!user || !user.name) {
      history.push("/login")
    } else {

      if (!posts || posts.length === 0) {
        dispatch(myPostsAction())
      }
    }
  }, [user, history, dispatch, posts])



  useEffect(() => {

    return () => {
      dispatch({
        type: MY_POSTS_RESET
      })
    }
  }, [])






  return (
    <Header compAdd={'/myPosts'}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <div>
              {posts.length === 0 && <p className="text-center my-3">No Posts</p>}

              {posts.map((post) => {
                return <Posts key={post._id} postDetails={post} user={user} />
              })}
            </div>
          )}
    </Header>
  );
};

export default MyPostsScreens;
