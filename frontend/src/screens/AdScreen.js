import React, {useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listADDetails,
} from '../actions/adActions'

const AdScreen = ({ history, match }) => {

  const dispatch = useDispatch()

  const adDetails = useSelector((state) => state.adDetails)
  const { loading, error, ad } = adDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    dispatch(listADDetails(match.params.id))
  }, [dispatch, match,])

  return (
    <>
      <Link className='btn btn-light my-3' to='/oldbooks'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={ad.name} />
          <Row>
            <Col md={6}>
              <Image src={ad.image} alt={ad.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{ad.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: Rs{ad.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {ad.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>Rs{ad.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {ad.status}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                         <Col>Seller's Info-</Col>
                         <Col>
                         {ad.number}
                         </Col>
                    </Row>
                   
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Name:</Col>
                      <Col>{userInfo.name}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default AdScreen
