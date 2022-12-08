import React, { useEffect, useState, useRef } from 'react';
import {
    Row,
    Col,
    Image,
    Button,
    Nav,
    Navbar,
    Container,
    NavDropdown,
    Form,
    Card,
    Modal
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { userDetailsAction, userLogoutAction } from '../actions/userActions';
import { postAction } from '../actions/postsActions';
import { POST_RESET, MY_POSTS_RESET } from '../constants/postsConstants';
import moment from 'moment';
import User from '../components/User';
import { otherUserAction, followUserAction, userDeactivateAdminAction } from '../actions/userActions';
import { USER_DETAILS_RESET, USER_OTHER_RESET, USER_DETAILS_SUCCESS, USER_OTHER_SUCCESS, USER_FOLLOW_RESET, USER_DEACTIVATE_RESET } from '../constants/userContstants';
import Posts from '../components/Posts';


const UserDetailsScreens = ({ history, match }) => {

    const userId = match.params.id

    const [keyword, setKeyword] = useState('');



    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);

    const { loading, user, whoToFollow, error } = userDetails;

    const userLogin = useSelector(state => state.userLogin);

    const { user: userInfo } = userLogin;

    const otherUser = useSelector(state => state.otherUser)

    const { loading: loadingOther, userInform, postsInform, error: errorOther } = otherUser

    const followUser = useSelector(state => state.followUser)

    const { loading: loadingFollow, success: successFollow, error: errorFollow } = followUser

    const userDeactivate = useSelector(state => state.userDeactivate)

    const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDeactivate


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        if (userInfo && userInfo.name) {

            if (!user || !user.name) {
                dispatch(userDetailsAction());
            }

            if (!userInform || !userInform.name) {
                dispatch(otherUserAction(userId))

            }

            if (successDelete) {
                dispatch({
                    type: USER_DEACTIVATE_RESET
                })
                history.push("/myPosts")
            }


        } else {
            history.push("/login")
        }
    }, [user, whoToFollow, dispatch, history, userInfo, userInform, successDelete]);



    useEffect(() => {

        dispatch(otherUserAction(userId))

    }, [userId])


    useEffect(() => {

        return () => {
            dispatch({
                type: USER_DETAILS_RESET
            })

            dispatch({
                type: USER_OTHER_RESET
            })
        }

    }, [])

    const searchUserHandler = (e) => {
        e.preventDefault()
        if (keyword === '') {
            setKeyword("a")
        }
        history.push(`/search/${keyword}`)
    };


    const signOutHandler = () => {
        dispatch(userLogoutAction());

    };


    const followUserHandler = () => {

        dispatch(followUserAction(userId))
    }


    const deactivateUserHandler = () => {
        dispatch(userDeactivateAdminAction(userId))
    }

    return (
        <>
            {loading || loadingOther || loadingFollow || loadingDelete ? (
                <Loader />
            ) : error || errorOther || errorFollow || errorDelete ? (
                <Message variant='danger'>{error ? error : errorOther ? errorOther : errorFollow ? errorFollow : errorDelete}</Message>
            ) : (
                        <div>
                            <Row
                                style={{ height: '5rem', backgroundColor: 'black' }}
                                className='sticky-top'
                            >
                                <Col>
                                    <div className='wrapper'>
                                        <Navbar bg='primary' expand='lg' variant='dark'>
                                            <Container>
                                                <LinkContainer to='/home'>
                                                    <Navbar.Brand>
                                                        <h2>
                                                            Poster <i class='fas fa-paper-plane'></i>
                                                        </h2>
                                                    </Navbar.Brand>
                                                </LinkContainer>

                                                <Nav className='ml-auto'>
                                                    <Image
                                                        src={user.photo ? user.photo : '/images/blank.png'}
                                                        roundedCircle
                                                        style={{
                                                            display: 'inline-block',
                                                            height: '25px',
                                                            width: '25px',
                                                            marginTop: '5px'
                                                        }}
                                                    />
                                                    <NavDropdown
                                                        as='h5'
                                                        title={user.name}
                                                        id='basic-nav-dropdown'
                                                    >
                                                        <LinkContainer to='/edit'>
                                                            <NavDropdown.Item>Edit</NavDropdown.Item>
                                                        </LinkContainer>
                                                    </NavDropdown>

                                                    <Nav.Link as='h5' onClick={signOutHandler}>
                                                        Sign Out
                      </Nav.Link>
                                                </Nav>
                                            </Container>
                                        </Navbar>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={3}>
                                    <div className='sidebar-sticky'>
                                        {(userInform && userInform.following) && (
                                            <div className='text-center'>
                                                <Image
                                                    src={userInform.photo ? userInform.photo : '/images/blank.png'}
                                                    roundedCircle
                                                    className='image-profile'
                                                />
                                                <h3 className='my-0'>
                                                    {userInform.name} {userInform.lastName}
                                                </h3>
                                                <p className='lead grey-color mt-0'>@{userInform.userName}</p>
                                                <p className='lead grey-color'>
                                                    <i className='far fa-calendar-alt'></i> Joined{' '}
                                                    {moment(userInform.createdAt).format('MMMM YYYY')}
                                                </p>
                                                <p className='lead'>
                                                    <span>{userInform.following.length}</span>{' '}
                                                    <span className='grey-color pr-3'><Link className='grey-color' >Following</Link></span>{' '}
                                                    <span>{userInform.followers.length}</span>{' '}
                                                    <span className='grey-color'><Link className='grey-color'>Followers</Link></span>
                                                </p>
                                                <p className='lead'>
                                                    {userInform.postCount}{' '}
                                                    <span className='grey-color'>Total Posts</span>
                                                </p>

                                                <button className='post-btn' onClick={followUserHandler}>
                                                    {user.following.includes(userId) ? "Following" : "Follow"}
                                                </button>

                                                {userInfo.isAdmin && (
                                                    <button className='post-btn' onClick={handleShow}>
                                                        Deactivate
                                                </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Col>




                                <Col md={6} className='posts-border p-0 mb-4'>
                                    <div style={{ position: "sticky", top: "5rem", zIndex: "20", backgroundColor: "black" }}>
                                        <div
                                            style={{
                                                marginTop: '2rem',
                                                marginBottom: '1rem',
                                                marginLeft: '0.5rem',
                                                marginRight: '0.5rem'
                                            }}
                                        >
                                            <Nav
                                                fill
                                                variant='pills'
                                                className='justify-content-center nav-border  pb-4'
                                            >

                                                <Nav.Item
                                                >

                                                    <Nav.Link active>
                                                        <h5>Posts</h5>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                    </div>

                                    <div className='bottom-wrapper'>
                                        {(user.name && postsInform) && postsInform.map((postIn) => {
                                            return <Posts key={postIn._id} postDetails={postIn} user={user} />
                                        })}
                                    </div>


                                </Col>



                                <Col md={3}>
                                    <div className='sidebar-sticky '>
                                        <div className='mx-3 mt-5 text-center'>
                                            <Form onSubmit={searchUserHandler}>
                                                <Form.Control type='text' placeholder='...Search Users'
                                                    value={keyword}
                                                    onChange={(e) => setKeyword(e.target.value)}
                                                />
                                                <Button
                                                    type='submit'
                                                    className='btn btn-primary-block mt-4'

                                                >
                                                    Search
                    </Button>
                                            </Form>
                                        </div>

                                        <div style={{ marginTop: '3rem' }}>
                                            <h2 className='text-primary text-center mb-3'>
                                                Who To Follow
                  </h2>

                                            {(whoToFollow && user) && (
                                                <Card className='bg-dark text-white mx-2 my-0'>
                                                    {whoToFollow.map(profile => {
                                                        return (
                                                            <User key={profile._id} profileDetails={profile} myProfileDetails={user} />
                                                        );
                                                    })}
                                                </Card>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* -------------Modal---------- */}

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Dactivate Account
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are You Sure ?</Modal.Body>
                                <Modal.Footer>
                                    <button className="button" onClick={handleClose}>
                                        Cancel
                                </button>
                                    <button className="button" onClick={deactivateUserHandler}>
                                        Ok
                               </button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    )}
        </>
    );
};

export default UserDetailsScreens;
