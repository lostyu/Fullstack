import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import userService from '../services/users'

const User = () => {
  const params = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    userService.getById(params.id).then(res => {
      setUser(res)
    })
  }, [params.id])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs && user.blogs.length > 0 && (
        <ul>
          {user.blogs &&
            user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      )}
    </div>
  )
}

export default User
