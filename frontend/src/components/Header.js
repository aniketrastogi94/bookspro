import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='info' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><i class="fab fa-accusoft"></i>{' '}BuyMyBooks</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <NavDropdown title="Old Books">
              <LinkContainer to='/oldbooks'>
                  <NavDropdown.Item>Old Books</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/adList'>
                  <NavDropdown.Item>Your Ads</NavDropdown.Item>
              </LinkContainer>
              </NavDropdown>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="Sign In" >
                <LinkContainer to='/login'>
                  <NavDropdown.Item>
                    <i className='fas fa-user'/><span> Login</span> 
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <NavDropdown.Item>
                    <i className='fas fa-user'/><span> Register</span>
                  </NavDropdown.Item>
                </LinkContainer>
                </NavDropdown>
                
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Shopkeeper Menu' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
