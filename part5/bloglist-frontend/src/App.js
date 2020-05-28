import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notifications from './components/Notifications'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')

  const blogFormRef = React.createRef()

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

  const handleCreate = async (blog) => {

    try {
      blogFormRef.current.toggleVisible()
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))

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
    <Toggleable buttonLabel="new note" ref={blogFormRef}>
      <NewBlogForm createBlog={handleCreate} />
    </Toggleable>
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