const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// 1获取认证token
const getTokenFrom = req => {
  const authentication = req.get('authorization')

  if (authentication && authentication.toLowerCase().startsWith('bearer')) {
    return authentication.substring(7)
  }

  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  // 从headers里拿到token
  const token = getTokenFrom(request)

  // 验证token
  const decodedToken = jwt.verify(token, process.env.SECRET)


  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'invalid error token' })
  }

  const user = await User.findById(decodedToken.id)

  // 添加数据
  const body = request.body
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
