import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Posts from '../components/Posts';
import { postDetailsAction } from '../actions/postsActions';
import { useDispatch, useSelector } from 'react-redux'
import { POST_DETAILS_RESET, CREATE_COMMENT_RESET, DELETE_COMMENT_RESET, DELETE_POST_RESET } from '../constants/postsConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import moment from 'moment'
import { Row, Col, Container, Form, Button, Modal } from 'react-bootstrap';
import CommentComp from '../components/CommentComp';
import { createCommentAction, deletePostAction } from '../actions/postsActions';

const PostDetailsScreen = ({ match, history }) => {

    const [comment, setComment] = useState('')


    const postId = match.params.id

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin

    const postDetails = useSelector(state => state.postDetails)

    const { loading, post, error } = postDetails


    const createComment = useSelector(state => state.createComment)

    const { loading: loadingComment, error: errorComment, success: successComment } = createComment

    const deleteComment = useSelector(state => state.deleteComment)

    const { loading: loadingDeleteComment, error: errorDeleteComment, success: successDeleteComment } = deleteComment

    const deletePost = useSelector(state => state.deletePost)

    const { loading: loadingDeletePost, error: errorDeletePost, success: successDeletePost } = deletePost



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {

        if (user && user.name) {

            if (!post || !post._id) {
                dispatch(postDetailsAction(postId))
            }

            if (successComment) {
                dispatch({
                    type: CREATE_COMMENT_RESET
                })
                setComment('')
                dispatch(postDetailsAction(postId))
            }

            if (successDeleteComment) {
                dispatch({
                    type: DELETE_COMMENT_RESET

                })

                dispatch(postDetailsAction(postId))

            }

            if (successDeletePost) {
                dispatch({
                    type: DELETE_POST_RESET

                })

                history.push("/myPosts")
            }

        } else {
            history.push("/login")
        }

    }, [user, history, postId, successComment, successDeleteComment, successDeletePost])


    useEffect(() => {
        return () => {
            dispatch({
                type: POST_DETAILS_RESET
            })
        }
    }, [])

    const commentHandler = (e) => {
        e.preventDefault()

        dispatch(createCommentAction({ comment, postId }))

    }


    const deletePostHandler = () => {
        dispatch(deletePostAction(postId))
        handleClose()
    }

    return (
        <Header compAdd={"/postDetails"}>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>

                    {loadingDeletePost && <Loader />}
                    {errorDeletePost && <Message variant="danger">{errorDeletePost}</Message>}
                    <Posts postDetails={post} user={user} history={history} />
                    <Row className="nav-border">
                        <Col md={6}>
                            <h5 className="grey-color m-3 ">
                                Post Created At :- {moment(post.createdAt).format('MMMM Do YYYY, h:mm a')}
                            </h5>
                        </Col>
                        <Col md={4}>
                        </Col>

                        {post && post.user && (
                            <Col md={2}>
                                {user && (user.isAdmin || user._id === post.user._id) && (
                                    <i className="far fa-trash-alt" style={{ color: "#758283", fontSize: '1.5rem', marginTop: '1rem' }} onClick={handleShow}></i>
                                )}


                            </Col>
                        )}

                        {/* --------------MODAL --------------*/}

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Post</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are You Sure ?</Modal.Body>
                            <Modal.Footer>
                                <button className="button" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button className="button" onClick={deletePostHandler}>
                                    Ok
                               </button>
                            </Modal.Footer>
                        </Modal>

                    </Row>
                    <Container className="mt-5">
                        <h4 className="m-2 my-3">Write A Comment:-</h4>

                        {loadingComment && <Loader />}
                        {errorComment && <Message variant="danger">{errorComment}</Message>}

                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <Form>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">

                                        <Form.Control placeholder="Post a Comment" as="textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)} />
                                    </Form.Group>
                                    <Button type="button" variant="primary" onClick={commentHandler}>Submit</Button>
                                </Form>

                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Container>

                    <Container>
                        <h4 className="m-2 mt-5 mb-3">Comments:-  {post.comments && (post.comments.length === 0) && "0 Comments"}</h4>
                        <Row>

                            <Col md={12}>

                                {post.comments && post.comments.map((coment) => {
                                    return <CommentComp key={coment._id} commentProp={coment} postId={post._id} />
                                })}

                            </Col>

                        </Row>
                    </Container>
                </>
            )}

        </Header >
    )
}

export default PostDetailsScreen
