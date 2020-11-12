import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopADs } from '../actions/adActions'

const AdCarousel = () => {
  const dispatch = useDispatch()

  const adTopRated = useSelector((state) => state.adTopRated)
  const { loading, error, ads } = adTopRated

  useEffect(() => {
    dispatch(listTopADs())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary'>
      {ads.map((ad) => (
        <Carousel.Item key={ad._id}>
          <Link to={`/ad/${ad._id}`}>
            <Image src={ad.image} alt={ad.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {ad.name} (Rs{ad.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default AdCarousel
