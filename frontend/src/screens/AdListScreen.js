import React, { Fragment, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listAds,
  deleteAD,
  createAD,
} from '../actions/adActions'
import { AD_CREATE_RESET } from '../constants/adConstants'

const AdListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  //const id = userInfo._id;
  const adList = useSelector((state) => state.adList)
  const { loading, error, ads, page, pages } = adList
  

  const adDelete = useSelector((state) => state.adDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = adDelete

  const adCreate = useSelector((state) => state.adCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    ad: createdad,
  } = adCreate

  

  useEffect(() => {
    dispatch({ type: AD_CREATE_RESET })

    if (!userInfo) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/ad/${createdad._id}/edit`)
    } else {
      dispatch(listAds('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdad,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAD(id))
    }
  }

  const createAdHandler = () => {
    dispatch(createAD())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Ads</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createAdHandler}>
            <i className='fas fa-plus'></i> Create Ad
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                ad.user===userInfo._id?
                (<tr key={ad._id}>
                  <td>{ad._id}</td>
                  <td>{ad.name}</td>
                  <td>Rs{ad.price}</td>
                  <td>{ad.category}</td>
                  <td>{ad.brand}</td>
                  <td>
                      <LinkContainer to={`/ad/${ad._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(ad._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>):<Fragment></Fragment>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default AdListScreen
