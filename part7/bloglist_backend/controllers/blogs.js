const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  console.log(request.decodedToken)
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  // 从中间件里拿到token
  const token = request.token

  // 验证token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  console.log(decodedToken)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'invalid error token' })
  }

  const user = await User.findById(decodedToken.id)

  if (user) {
    // 添加数据
    const body = request.body
    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes,
      user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result.toJSON())
  } else {
    response.status(401).json({ error: 're login' })
  }
})

blogRouter.delete('/:id', middleware.checkToken, async (request, response) => {
  const decodedToken = request.decodedToken
  console.log(decodedToken)

  // 验证token是否和blog里面的用户一致
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user === undefined) {
    return response.status(401).json({ error: '你没有删除该博客的权限' })
  }

  if (blog.user.toString() === decodedToken.id) {
    await blog.remove()
    response.status(204).end()
  } else {
    response.status(401).json({ error: '你没有删除该博客的权限' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(body)
  const content = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const blog = await Blog.findByIdAndUpdate(request.params.id, content, {
    new: true
  })

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = blogRouter
