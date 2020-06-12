import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import blogService from '../services/blogs'

import { setMessage } from '../reducers/notificationReducer'
import { addLike } from '../reducers/blogReducer'

import { Button, Form, Col } from 'react-bootstrap'

const BlogView = () => {
  const [blog, setBlog] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  useEffect(() => {
    blogService.getById(params.id).then(res => {
      console.log(res)
      setBlog(res)
    })
  }, [params.id])

  const handleLike = id => {
    dispatch(addLike(id, blog))
    dispatch(setMessage(`add like ${blog.title}`))
    setBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleComment = async ev => {
    ev.preventDefault()
    const newBlog = await blogService.addComment(blog.id, content)
    setContent('')
    setBlog(newBlog)
  }

  if (blog === null) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} like
        <Button onClick={() => handleLike(blog.id)}>like</Button>
      </p>
      <p>added by {blog.user.username}</p>

      {blog.comments && (
        <>
          <h3>comments</h3>
          <Form onSubmit={handleComment}>
            <Form.Row className="align-items-center">
              <Col xs="auto" className="my-1">
                <Form.Control
                  value={content}
                  type="text"
                  name="content"
                  onChange={({ target }) => setContent(target.value)}
                ></Form.Control>
              </Col>
              <Col xs="auto" className="my-1">
                <Button type="submit">Comment</Button>
              </Col>
            </Form.Row>
          </Form>
          <ul>
            {blog.comments.map(comment => (
              <li key={Math.random() + comment}>{comment}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default BlogView
