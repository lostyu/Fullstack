import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notifications from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()

  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)
    setUser(user)
  }, [])

  const handleLogin = async (ev) => {
    ev.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      setType('success')
      setMessage(`login success, welcome ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (e) {
      setType('error')
      setMessage(e.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreate = async (ev) => {
    ev.preventDefault()

    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setBlog({ title: '', author: '', url: '' })

      setType('success')
      setMessage(`a new blog added! by ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (e) {
      setType('error')
      setMessage(e.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateField = e => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value
    })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const newBlogForm = () => (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={blog.title}
            name="title"
            onChange={updateField}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blog.author}
            name="author"
            onChange={updateField}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blog.url}
            name="url"
            onChange={updateField}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notifications message={message} type={type} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notifications message={message} type={type} />
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>

      <h2>create new</h2>
      {newBlogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App