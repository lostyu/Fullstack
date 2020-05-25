const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userid)

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = blogRouter
