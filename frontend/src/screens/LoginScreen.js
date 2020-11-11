import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login,loginWithGoogle } from '../actions/userActions'
import GoogleLogin from 'react-google-login';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const responseSuccess=(response)=>{
    console.log(response.tokenId);
    dispatch(loginWithGoogle(response.tokenId));
  }
  const responseFailure=(response)=>{
    console.log(response);
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Forgot Password? </Form.Label>
          <Link to='/reset'> Reset Password</Link>
        </Form.Group>
        
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
        <GoogleLogin
          clientId="403380080270-6rpdj7ll4gkvlrvi4s03imtk3e487nuo.apps.googleusercontent.com"
          buttonText="SIGN IN WITH GOOGLE"
          onSuccess={responseSuccess}
          onFailure={responseFailure}
          cookiePolicy={'single_host_origin'}
          className='p-1 mx-3 bg-primary'
        />
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
