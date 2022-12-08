import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Image, Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postDetailsAction, deleteCommentAction } from '../actions/postsActions';
import io from 'socket.io-client';

const CommentComp = ({ commentProp, postId, history }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin

    const dispatch = useDispatch()


    const socket = useRef()

    const [Comment, setComment] = useState({})


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    useEffect(() => {

        if (!user || !user.name) {
            history.push("/login")
        }

    }, [user])

    useEffect(() => {

        if (!socket.current) {
            socket.current = io("https://poster-ziq3.onrender.com")
        }

        setComment(commentProp)

    }, [])


    const commentLikeHandler = () => {

        socket.current.emit('likeComment', { postId, commentId: Comment._id, userId: user._id })

        socket.current.on('likedComment', ({ getComment }) => {
            setComment(getComment)
        })

    }


    const deleteCommentHandler = () => {

        dispatch(deleteCommentAction({ postId, commentId: Comment._id }))
        handleClose()
    }


    return (
        <div className='nav-border pt-4 hover-effect' >
            <Row>
                <Col md={5} className="curserPointer">
                    <Row>
                        <Col md={3}>
                            {Comment.user && (
                                <Image
                                    src={Comment.user.photo ? Comment.user.photo : '/images/blank.png'}
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
                            <h5 className='d-inline-block mb-0 grey-color' >{Comment.user && Comment.user.name} {Comment.user && Comment.user.lastName}</h5>
                            <p className='grey-color mt-0'>@{Comment.user && Comment.user.userName}</p>
                        </Col>
                    </Row>
                </Col>

                <Col md={5}></Col>

                <Col md={2} className='text-left mt-2 grey-color'>
                    {moment(Comment.createdAt).startOf('hour').fromNow()}
                </Col>
            </Row>

            <div className='post-margin my-2'>
                <h5 className=' text-justify'>
                    {Comment.comment}
                </h5>
            </div>


            <Row className='mt-5 mb-3 text-center'>

                {(user && Comment.user) && (
                    <>

                        <Col md={5}>
                            <p className="grey-color mr-1">{moment(Comment.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                        </Col>


                        <Col md={5} className="text-left curserPointer">
                            {user && Comment.likes.includes(user._id.toString()) ? <i className='fas fa-heart red-heart' onClick={commentLikeHandler}> ({Comment.likes.length})</i> : <i className='far fa-heart h5 text-danger' onClick={commentLikeHandler}> ({Comment.likes.length})</i>}
                        </Col>



                        {((user && user.isAdmin) || user._id === Comment.user._id) && (
                            <Col md={1} className="curserPointer">
                                <i className="far fa-trash-alt" style={{ color: "#758283", fontSize: '1.2rem' }} onClick={handleShow}></i>

                            </Col>
                        )}

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Comment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are You Sure ?</Modal.Body>
                            <Modal.Footer>
                                <button className="button" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button className="button" onClick={deleteCommentHandler}>
                                    Ok
                               </button>
                            </Modal.Footer>
                        </Modal>

                    </>
                )}
            </Row>

        </div>
    )
}

export default withRouter(CommentComp)
