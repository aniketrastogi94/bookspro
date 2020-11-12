import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { resetPassword } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';

const ResetPassword = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const userPass=useSelector((state)=>state.userPassword)
  const {loading,error,msg}=userPass;
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(resetPassword(email));
  }
  return (
    <FormContainer>
      {error && <Message varaint='danger'>{error}</Message>}
      {loading && <Loader/>}
      {msg &&<Message variant='success' >{msg}</Message>}
      <h1>Reset Password</h1>
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

        
        <Button type='submit' variant='primary' className='btn btn-primary btn-lg'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ResetPassword
