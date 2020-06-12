import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from '../services/blogs'

import { createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

import { Button, Form, Row, Col } from 'react-bootstrap'

const NewBlogForm = ({ refProps, handleState }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const defaultBlog = { title: '', author: '', url: '' }
  const [blog, setBlog] = useState(defaultBlog)

  const updateField = ev => {
    setBlog({
      ...blog,
      [ev.target.name]: ev.target.value
    })
  }

  const handleCreate = async ev => {
    ev.preventDefault()

    try {
      const newBlog = await blogService.create(blog)
      setBlog(defaultBlog)
      refProps.current.toggleVisible()

      dispatch(setMessage(`a new blog added! by ${user.username}`))
      handleState(newBlog)
    } catch (e) {
      // console.log(e.response)
      dispatch(setMessage(e.response.data.error))
    }
  }

  return (
    <div className="testDiv">
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>title： </Form.Label>
          <Form.Control
            placeholder="Title"
            type="text"
            value={blog.title}
            name="title"
            onChange={updateField}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author： </Form.Label>
          <Form.Control
            placeholder="Author"
            type="text"
            value={blog.author}
            name="author"
            onChange={updateField}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url： </Form.Label>
          <Form.Control
            placeholder="Url"
            type="text"
            value={blog.url}
            name="url"
            onChange={updateField}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlogForm
