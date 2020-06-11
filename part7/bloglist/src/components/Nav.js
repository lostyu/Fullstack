import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogout }) => {

  const sty={
    padding: 10
  }

  return (
    <div className="navbar">
      <Link style={sty} to="/">blogs</Link>
      <Link style={sty} to="/users">users</Link>
      {user.username} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Nav
