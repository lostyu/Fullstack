const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// 定义测试数据
const blogs = [
  {
    'title': 'test1',
    'author': 'tony',
    'url': 'http://123123.com',
    'likes': 999,
    'id': '5ec779c11e53cb0f9c1e7e04',
    'user': '5ecb38aefbe77525cc4d3c4f'
  },
  {
    'title': 'fosdf',
    'author': 'tony222',
    'url': 'http://456456.com',
    'likes': 2222222,
    'id': '5ec78f37e57437149cce751b',
    'user': '5ecb38aefbe77525cc4d3c4f'
  },
  {
    'title': 'jj',
    'author': 'tony',
    'url': 'http://hjui.com',
    'likes': 999,
    'id': '5ec7a124f2926e2ad0d47660'
  }
]

const users = [
  {
    'blogs': ['5ec779c11e53cb0f9c1e7e04', '5ec78f37e57437149cce751b'],
    'id': '5ecb38aefbe77525cc4d3c4f',
    'username': 'tony',
    'name': 'tony',
    'passwordHash': '$2b$10$AmJMsZ7FAZ1u8ByoL8uC/OHhMIf/18i1FqPpnEzi2ehdtUmsnGJ.G'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'xx', url: 'http://xxjjoopp.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const dataInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const loginAndGetToken = async (api) => {
  const user = {
    username: 'tony',
    password: '123'
  }

  const result = await api.post('/api/login').send(user)
  return result.body
}

module.exports = {
  blogs,
  users,
  nonExistingId,
  dataInDb,
  loginAndGetToken
}
