import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { newPassword } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader';

const NewPassword = ({ match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userPassword=useSelector((state)=>state.userPassword);
  const {loading,error,msg}=userPassword;
  const dispatch = useDispatch()
  const token=match.params.token;
  const submitHandler = (e) => {
    e.preventDefault()
    if(password===confirmPassword) dispatch(newPassword(password,token));
    else{
        alert('Password does not match')
    }
  }
  return (
    <FormContainer>
    {error && <Message variant='danger'>{error}</Message>}
        {msg && <Message variant='success'>{msg}</Message>}
      {loading && <Loader />}
      <h1>Enter Your New Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default NewPassword
