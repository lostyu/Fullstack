import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import loginService from './services/login'

import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Notifications from './components/Notifications'
import Toggleable from './components/Toggleable'
import User from './components/User'
import Users from './components/Users'
import BlogViewList from './components/BlogViewList'
import BlogView from './components/BlogView'

import { setMessage } from './reducers/notificationReducer'
import { addUser, removeUser } from './reducers/userReducer'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      dispatch(addUser(JSON.parse(loggedUser)))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(removeUser())
  }

  const handleLogin = async ev => {
    ev.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      // blogService.setToken(user.token)

      dispatch(addUser(user))
      setUsername('')
      setPassword('')
      dispatch(setMessage(`login success, welcome ${user.username}`))
    } catch (e) {
      dispatch(setMessage(e.response.data.error, 'error'))
    }
  }

  const newBlogForm = () => (
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlogForm refProps={blogFormRef} />
    </Toggleable>
  )

  const loginForm = () => (
    <form id="test-loginForm" onSubmit={handleLogin}>
      <div>
        username
        <input
          id="test-username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="test-password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notifications />
        {loginForm()}
      </div>
    )
  }

  return (
    <Router>
      <div id="testApp">
        <h2>blogs</h2>
        <Notifications />
        <p>
          {user.username} logged in{' '}
          <button onClick={handleLogout}>logout</button>
        </p>

        <Switch>
          <Route path="/blogs/:id">
            <BlogView/>
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            {newBlogForm()}
            {/* <BlogList /> */}
            <BlogViewList />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
