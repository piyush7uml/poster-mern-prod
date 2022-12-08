import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { USER_REGISTER_RESET } from '../constants/userContstants';
import { userRegisterAction } from '../actions/userActions';

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { user: userInfo } = userLogin;

  const userRegister = useSelector(state => state.userRegister);

  const { user, loading, error } = userRegister;

  useEffect(() => {
    return () => {
      dispatch({
        type: USER_REGISTER_RESET
      });
    };
  }, []);

  useEffect(() => {
    if (user || userInfo) {
      history.push('/home');
    }
  }, [user, userInfo]);

  const registerUserHandler = e => {
    e.preventDefault();

    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords Do Not Match');
    } else {
      dispatch(
        userRegisterAction({
          name,
          lastName,
          userName,
          email,
          password
        })
      );
    }
  };

  return (
    <FormContainer>
      <h1 className='mt-5 text-center text-primary'>Register</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          <Form onSubmit={registerUserHandler}>
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

            <Button type='submit' variant='primary' className='btn btn-block'>
              Register
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default RegisterScreen;
