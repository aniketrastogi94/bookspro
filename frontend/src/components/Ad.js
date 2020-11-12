import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Ad = ({ ad }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/ad/${ad._id}`}>
        <Card.Img src={ad.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/ad/${ad._id}`}>
          <Card.Title as='div'>
            <strong>{ad.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='h3'>Rs{ad.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Ad
