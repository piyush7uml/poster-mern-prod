import React, { useEffect } from 'react'
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { likedPostsAction } from '../actions/postsActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Posts from '../components/Posts';
import { LIKED_POSTS_RESET } from '../constants/postsConstants';

const LikedPostsScreen = ({ history }) => {

    const dispatch = useDispatch();

    const likedPosts = useSelector(state => state.likedPosts)

    const { loading, posts, error } = likedPosts;

    const userLogin = useSelector(state => state.userLogin)

    const { user } = userLogin


    useEffect(() => {
        if (user && user.name) {

            if (!posts || posts.length === 0) {
                dispatch(likedPostsAction())
            }

        } else {
            history.push("/login")
        }
    }, [dispatch, user, posts, history])


    useEffect(() => {
        return () => {
            dispatch({
                type: LIKED_POSTS_RESET
            })
        }
    }, [])


    return (
        <Header compAdd={'/liked'}>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    {posts && posts.map((post) => {
                        return <Posts key={post._id} postDetails={post} user={user} />
                    })}
                </>
            )}

        </Header>
    )
}

export default LikedPostsScreen
