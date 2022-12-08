import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsAction, userEditAction, userDeactivateAction } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  USER_DETAILS_UPDATE_RESET,
  USER_DETAILS_RESET,
  USER_DEACTIVATE_RESET
} from '../constants/userContstants';
import axios from 'axios';

const EditUserProfileScreen = ({ history }) => {


  const userDetails = useSelector(state => state.userDetails);
  const { loading, user, error } = userDetails;

  const userDeactivate = useSelector(state => state.userDeactivate)

  const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDeactivate


  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(user.photo ? user.photo : '');
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch();


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const userEdit = useSelector(state => state.userEdit);
  const { loading: loadingUpdate, success, error: errorUpdate } = userEdit;

  const userLogin = useSelector(state => state.userLogin);
  const { user: userInfo } = userLogin;

  useEffect(() => {
    return () => {
      dispatch({
        type: USER_DETAILS_RESET
      });
    };
  }, []);

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    }

    if (success) {
      dispatch({
        type: USER_DETAILS_UPDATE_RESET
      });

      dispatch(userDetailsAction());
      history.push("/home")
    }

    if (successDelete) {
      dispatch({
        type: USER_DEACTIVATE_RESET
      })
      history.push("/login")
    }

    if (!user || !user.name) {
      dispatch(userDetailsAction());
    } else {
      setName(user.name);
      setLastName(user.lastName);
      setUserName(user.userName);
      setEmail(user.email);
    }
  }, [dispatch, user, success, successDelete]);

  const editProfileHandler = e => {
    e.preventDefault();

    setMessage('');

    if (password) {
      if (password !== confirmPassword) {
        setMessage('Passwords Do Not Match');
        return;
      }
    }

    if (photo == '') {
      console.log("NO")
      dispatch(
        userEditAction({
          name,
          lastName,
          email,
          userName,
          password,
          photo: '/images/blank.png'
        })
      );
    } else {
      console.log("yes")
      dispatch(
        userEditAction({
          name,
          lastName,
          email,
          userName,
          password,
          photo
        })
      );
    }
  };



  const clearPhotoHandler = () => {
    setPhoto('')
  }




  const uploadPhotoHandler = async (e) => {
    console.log("triggered")
    const file = e.target.files[0];

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

      setPhoto(data)
      setUploading(false)


    } catch (error) {

      console.error(error);
      setUploading(false)
    }

  }



  const deactivateAccountHandler = () => {
    dispatch(userDeactivateAction(userInfo._id))
  }


  return (
    <FormContainer>
      <Row>
        <Col md={10}>
          <h2 className='mt-5 text-primary text-center'>Edit Profile</h2>
        </Col>

        <Col md={2}>
          <Button type="button" variant="primary" className="mt-5 text-right " onClick={() => history.goBack()} >Back</Button>
        </Col>
      </Row>


      {loading || loadingUpdate || loadingDelete ? (
        <Loader />
      ) : (
          <>
            {message && <Message variant='danger'>{message}</Message>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={editProfileHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='lastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Last Name'
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='userName'>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter User Name'
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email Address'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control placeholder={photo} value={photo} readOnly />
                <Button variant="primary" className="btn btn-sm mt-1 mb-2" onClick={clearPhotoHandler}>clear</Button>
                <Form.File id="exampleFormControlFile1" label="Choose file"
                  custom
                  onChange={uploadPhotoHandler}
                  onClick={e => (e.target.value = null)}
                />
              </Form.Group>

              <Button type='submit' variant='primary' className='btn btn-block'>
                Edit Profile
            </Button>
            </Form>

            <Button type='button' variant='primary' className='btn my-5' onClick={handleShow}>
              Decativate Account
                </Button>
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
                <button className="button" onClick={deactivateAccountHandler}>
                  Ok
                               </button>
              </Modal.Footer>
            </Modal>
          </>
        )}
    </FormContainer>
  );
};

export default EditUserProfileScreen;
