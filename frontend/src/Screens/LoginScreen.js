import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { USER_LOGIN_RESET } from '../constants/userContstants';
import { userLoginAction } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { loading, user, error } = userLogin;

  useEffect(() => {
    if (user && user.name) {
      history.push('/home');
    }
  }, [user]);

  const userLoginHandler = e => {
    e.preventDefault();

    dispatch(userLoginAction({ email, password }));
  };

  return (
    <FormContainer>
      <>
        <h2 className='text-center mt-5 text-primary'>Login</h2>

        {loading ? (
          <Loader />
        ) : (
            <>
              {error && <Message variant='danger'>{error}</Message>}
              <Form onSubmit={userLoginHandler}>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
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

                <Button type='submit' variant='primary' className='btn btn-block'>
                  Log In
              </Button>
              </Form>
              <p className='mt-2'>
                New User ? <Link to='/register'> Register here</Link>
              </p>
            </>
          )}
      </>
    </FormContainer>
  );
};

export default LoginScreen;
