import React, { useEffect, useState } from 'react';
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
import User from './User';
import axios from 'axios'
import { USER_DETAILS_RESET } from '../constants/userContstants';

const Header = ({ children, compAdd, history }) => {

  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false)



  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);

  const { loading, user, whoToFollow, error } = userDetails;

  const userLogin = useSelector(state => state.userLogin);

  const { user: userInfo } = userLogin;

  const post = useSelector(state => state.post)

  const { loading: loadingPost, success: successPost, error: errorPost } = post

  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setImage('')
  };



  useEffect(() => {
    if (userInfo && userInfo.name) {

      if (successPost) {
        dispatch({
          type: POST_RESET
        })

        dispatch({
          type: MY_POSTS_RESET
        })

        handleClose()

        history.push("/myPosts")
      }

      if (!user || !user.name) {
        dispatch(userDetailsAction());
      }
    } else {
      history.push("/login")
    }
  }, [user, whoToFollow, dispatch, history, userInfo, successPost]);




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


  const postHandler = (e) => {
    e.preventDefault()
    if (image === '') {
      dispatch(postAction({ message }))
    } else {
      dispatch(postAction({ message, image }))
    }
  }


  const clearHandler = () => {
    setImage('')
  }



  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];

    console.log("FILE", file)

    const formData = new FormData();

    formData.append('image', file)

    setUploading(true)

    try {

      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)

      console.log("DATA", data)

      setImage(data)
      setUploading(false)


    } catch (error) {

      console.error(error);
      setUploading(false)
    }

  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
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
                    <div className='text-center'>
                      <Image
                        src={user.photo ? user.photo : '/images/blank.png'}
                        roundedCircle
                        className='image-profile'
                      />
                      <h3 className='my-0'>
                        {user.name} {user.lastName}
                      </h3>
                      <p className='lead grey-color mt-0'>@{user.userName}</p>
                      <p className='lead grey-color'>
                        <i className='far fa-calendar-alt'></i> Joined{' '}
                        {moment(user.createdAt).format('MMMM YYYY')}
                      </p>
                      <p className='lead'>
                        <span>{user.following.length}</span>{' '}
                        <span className='grey-color pr-3'><Link className='grey-color' to="/following">Following</Link></span>{' '}
                        <span>{user.followers.length}</span>{' '}
                        <span className='grey-color'><Link className='grey-color' to="/followers">Followers</Link></span>
                      </p>
                      <p className='lead'>
                        {user.postCount}{' '}
                        <span className='grey-color'>Total Posts</span>
                      </p>

                      <button className='post-btn' onClick={handleShow}>POST</button>


                      <Modal show={show} onHide={handleClose}

                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {loadingPost && <Loader />}
                          {errorPost && <Message variant="danger">{errorPost}</Message>}
                          <Form>
                            <Form.Group controlId="message">
                              <Form.Label>Message</Form.Label>
                              <Form.Control as="textarea" rows={3} placeholder="Whats Happening?"
                                value={message} onChange={e => setMessage(e.target.value)}
                              />
                            </Form.Group>

                            <Form.Group>
                              <Form.Control
                                placeholder={image}
                                value={image}
                              />
                              <Button variant="primary" className="btn btn-sm mt-1 mb-2" onClick={clearHandler}>clear</Button>
                              <Form.File id="exampleFormControlFile1" label="Choose file"
                                custom
                                onClick={e => (e.target.value = null)}
                                onChange={uploadImageHandler}
                              />
                            </Form.Group>
                            {uploading && <Loader />}
                          </Form>

                        </Modal.Body>
                        <Modal.Footer>
                          <button className="button" onClick={handleClose}>
                            Close
                         </button>
                          <button className="button" onClick={postHandler}>
                            Submit
                         </button>
                        </Modal.Footer>
                      </Modal>
                    </div>
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
                        defaultActiveKey={compAdd}
                        className='justify-content-center nav-border  pb-4'
                      >
                        {(compAdd !== "/followers" && compAdd !== "/following" && compAdd !== '/search' && compAdd !== "/postDetails") && (
                          <>
                            <Nav.Item>
                              <LinkContainer to='/home'>
                                <Nav.Link>
                                  <h5>Timeline</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                              <LinkContainer to='/myPosts'>
                                <Nav.Link>
                                  <h5>My Posts</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                              <LinkContainer to='/liked'>
                                <Nav.Link>
                                  <h5>Liked</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                              <LinkContainer to='/media'>
                                <Nav.Link>
                                  <h5>Media</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                              <LinkContainer to='/bookmarks'>
                                <Nav.Link>
                                  <h5>Bookmarks</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>
                          </>
                        )}
                        {(compAdd === "/followers") && (

                          <>

                            <Nav.Item>
                              <LinkContainer to='/followers'>
                                <Nav.Link>
                                  <h5>Followers</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>


                            <Nav.Item>
                              <LinkContainer to='/home'>
                                <Nav.Link>
                                  <h5>Back</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>


                          </>
                        )}

                        {(compAdd === "/following") && (
                          <>

                            <Nav.Item>
                              <LinkContainer to='/following'>
                                <Nav.Link>
                                  <h5>Following</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>

                            <Nav.Item>
                              <LinkContainer to='/home'>
                                <Nav.Link>
                                  <h5>Back</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>


                          </>
                        )}

                        {(compAdd === "/search") && (
                          <>
                            <Nav.Item>
                              <LinkContainer to='/search'>
                                <Nav.Link>
                                  <h5>Search Result</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>


                            <Nav.Item>
                              <LinkContainer to='/home'>
                                <Nav.Link>
                                  <h5>Back</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>


                          </>
                        )}

                        {(compAdd === "/postDetails") && (

                          <>

                            <Nav.Item>
                              <LinkContainer to='/postDetails'>
                                <Nav.Link>
                                  <h5>Post Details</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>


                            <Nav.Item>
                              <LinkContainer to='/myPosts'>
                                <Nav.Link>
                                  <h5>Back</h5>
                                </Nav.Link>
                              </LinkContainer>
                            </Nav.Item>


                          </>
                        )}
                      </Nav>
                    </div>
                  </div>

                  <div className='bottom-wrapper'>{children}</div>


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
            </div>
          )}
    </>
  );
};

export default withRouter(Header);
