import React, { useEffect } from 'react'
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { mediaPostsAction } from '../actions/postsActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Posts from '../components/Posts';
import { MEDIA_POSTS_RESET } from '../constants/postsConstants';

const MediaPostsScreen = ({ history }) => {

    const dispatch = useDispatch();

    const mediaPosts = useSelector(state => state.mediaPosts)

    const { loading, posts, error } = mediaPosts;

    const userLogin = useSelector(state => state.userLogin)

    const { user } = userLogin


    useEffect(() => {
        if (user && user.name) {

            if (!posts || posts.length === 0) {
                dispatch(mediaPostsAction())
            }

        } else {
            history.push("/login")
        }
    }, [dispatch, user, posts, history])


    useEffect(() => {
        return () => {
            dispatch({
                type: MEDIA_POSTS_RESET
            })
        }
    }, [])


    return (
        <Header compAdd={'/media'}>
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



export default MediaPostsScreen