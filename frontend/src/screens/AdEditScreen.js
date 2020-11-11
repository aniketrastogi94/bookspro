import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listADDetails, updateAD } from '../actions/adActions'
import { AD_UPDATE_RESET } from '../constants/adConstants'

const AdEditScreen = ({ match, history }) => {
  const adId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [number, setNumber] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [status, setstatus] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const adDetails = useSelector((state) => state.adDetails)
  const { loading, error, ad } = adDetails

  const adUpdate = useSelector((state) => state.adUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: AD_UPDATE_RESET })
      history.push('/adlist')
    } else {
      if (!ad.name || ad._id !== adId) {
        dispatch(listADDetails(adId))
      } else {
        setName(ad.name)
        setPrice(ad.price)
        setImage(ad.image)
        setBrand(ad.brand)
        setCategory(ad.category)
        setstatus(ad.status)
        setDescription(ad.description)
        setNumber(ad.number)
      }
    }
  }, [dispatch, history, adId, ad, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
        updateAD({
        _id: adId,
        name,
        price,
        image,
        brand,
        category,
        description,
        status,
        number
      })
    )
  }

  return (
    <>
      <Link to='/adlist' className='btn btn-dark my-3'>
      <i class="fas fa-long-arrow-alt-left"></i>Go Back
      </Link>
      <FormContainer>
        <h1>Edit Ad</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='number'>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Contact Number'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Status(available or sold out)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter status'
                value={status}
                onChange={(e) => setstatus(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AdEditScreen
