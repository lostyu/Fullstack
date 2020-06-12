import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = ({ user, handleLogout }) => {
  const sty = {
    marginBottom: 20
  }

  return (

    <Navbar bg="light" expand="lg" style={sty}>
      <Navbar.Brand href="#" as="span">
        <Link to="/">Blog App</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#" as="span">
            <span className="mr-sm-2">{user.username} logged in </span>
            <Button variant="secondary" onClick={handleLogout}>logout</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
