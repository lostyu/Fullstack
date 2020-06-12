import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import { Card, Button, Row, Col, Form } from 'react-bootstrap'

import loginService from './services/login'
import blogService from './services/blogs'

import BlogList from './components/BlogList'
import Menu from './components/Menu'
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
  const history = useHistory()
  const blogFormRef = React.createRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      dispatch(addUser(JSON.parse(loggedUser)))
    }
  }, [dispatch])

  useEffect(() => {
    blogService.getAll().then(res => {
      setBlogs(res)
    })
  }, [])

  const handleLogout = () => {
    dispatch(removeUser())
    history.replace('/')
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

  const handleState = newBlog => {
    setBlogs([...blogs, newBlog])
  }

  const newBlogForm = () => (
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlogForm handleState={handleState} refProps={blogFormRef} />
    </Toggleable>
  )

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Username
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            value={username}
            name="Username"
            type="text"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          Password
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="password"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}></Form.Label>
        <Col sm={9}>
          <Button block type="submit">
            Login
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )

  if (user === null) {
    return (
      <div className="container">
        <Notifications />

        <Row className="loginBox">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="">
              <Card.Header>Log in to application</Card.Header>
              <Card.Body>{loginForm()}</Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div className="container">
      <Notifications />
      <div id="testApp">
        <Menu user={user} handleLogout={handleLogout} />

        <Switch>
          <Route path="/blogs/:id">
            <BlogView />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <h2>Blogs</h2>
            {newBlogForm()}
            {/* <BlogList /> */}
            <BlogViewList blogs={blogs} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
