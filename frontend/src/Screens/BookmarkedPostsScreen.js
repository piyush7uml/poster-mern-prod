import React, { useEffect } from 'react'
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarkedPostsAction } from '../actions/postsActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Posts from '../components/Posts';
import { BOOKMARKED_POSTS_RESET } from '../constants/postsConstants';

const BookmarkedPostsScreen = ({ history }) => {

    const dispatch = useDispatch();

    const bookmarkedPosts = useSelector(state => state.bookmarkedPosts)

    const { loading, posts, error } = bookmarkedPosts;

    const userLogin = useSelector(state => state.userLogin)

    const { user } = userLogin


    useEffect(() => {
        if (user && user.name) {

            if (!posts || posts.length === 0) {
                dispatch(bookmarkedPostsAction())
            }

        } else {
            history.push("/login")
        }
    }, [dispatch, user, posts, history])


    useEffect(() => {
        return () => {
            dispatch({
                type: BOOKMARKED_POSTS_RESET
            })
        }
    }, [])


    return (
        <Header compAdd={'/bookmarks'}>
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



export default BookmarkedPostsScreen

