import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import moment from 'moment';
import { postLikeAction, postBookmarkAction } from '../actions/postsActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom'



const Posts = ({ postDetails, user, history }) => {

  const [post, setPost] = useState({})

  const socket = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("https://poster-cjlq.onrender.com")
    }
    setPost(postDetails)
  }, [])



  const postLikeHandler = () => {
    // dispatch(postLikeAction(post._id))
    socket.current.emit('like', { postId: post._id, userId: user._id })
    socket.current.on("liked", ({ post }) => {
      setPost(post);
    })

  }

  const postBookmarkHandler = () => {
    // dispatch(postBookmarkAction(post._id))

    socket.current.emit('bookmark', { postId: post._id, userId: user._id })
    socket.current.on('bookmarked', ({ post }) => {
      setPost(post);
    })
  }

  const redirectHandler = () => {
    history.push(`/postdetails/${post._id}`)
  }

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


  const userRedirect = () => {

    if (post.user._id === user._id) {
      history.push(`/myposts`)
    } else {
      history.push(`/userDetails/${post.user._id}`)
    }


  }


  return (
    <div className='nav-border pt-4 hover-effect' >
      <Row >
        <Col md={5}>
          <Row onClick={userRedirect}>
            <Col md={3}>
              {post.user && (
                <Image
                  src={post.user.photo ? post.user.photo : '/images/blank.png'}
                  roundedCircle
                  style={{
                    display: 'inline-block',
                    height: '50px',
                    width: '50px',
                    marginTop: '5px',
                    marginLeft: '1rem'
                  }}
                />
              )}
            </Col>

            <Col md={8} className='ml-1 mt-2 '>
              <h5 className='d-inline-block mb-0 grey-color' >{post.user && post.user.name} {post.user && post.user.lastName}</h5>
              <p className='grey-color mt-0'>@{post.user && post.user.userName}</p>
            </Col>
          </Row>
        </Col>

        <Col md={5}></Col>

        <Col md={2} className='text-left mt-2 grey-color'>
          {moment(post.createdAt).startOf('hour').fromNow()}
        </Col>
      </Row>

      <div className='post-margin my-2' onClick={() => openInNewTab(`/postDetails/${post._id}`)}>
        <h5 className=' text-justify'>
          {post.message}
        </h5>
      </div>

      {post.image && (
        <div className='text-center' onClick={redirectHandler}>
          <Image
            src={post.image}
            rounded
            style={{
              display: 'inline-block',
              height: '20rem',
              width: '60%',
              marginTop: '5px'
            }}
          />
        </div>
      )}

      <Row className='mt-5 mb-3 text-center'>

        {post.user && (
          <>
            <Col md={4} className="curserPointer">
              {user && post.likes.includes(user._id.toString()) ? <i className='fas fa-heart red-heart' onClick={postLikeHandler}> ({post.likes.length})</i> : <i className='far fa-heart h5 text-danger' onClick={postLikeHandler}> ({post.likes.length})</i>}
            </Col>

            <Col md={4} onClick={redirectHandler} className="curserPointer">
              <i className='far fa-comment-alt h5 grey-color'> ({post.comments.length})</i>
            </Col>

            <Col md={4} className="curserPointer">
              {user && post.bookmarks.includes(user._id.toString()) ? <i className='fas fa-bookmark gray-bookmark' onClick={postBookmarkHandler}> Bookmarked</i> : <i className='far fa-bookmark h5 grey-color' onClick={postBookmarkHandler}> Bookmark</i>}
            </Col>
          </>
        )}




      </Row>
    </div>
  );
};

export default withRouter(Posts);
