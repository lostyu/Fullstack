const Blog = require('../models/blog')

// 定义测试数据
const blogs = [
  {
    'title': 'test1',
    'author': 'tony',
    'url': 'http://123123.com',
    'likes': 999,
    'id': '5ec779c11e53cb0f9c1e7e04'
  },
  {
    'title': 'fosdf',
    'author': 'tony222',
    'url': 'http://456456.com',
    'likes': 2222222,
    'id': '5ec78f37e57437149cce751b'
  },
  {
    'title': 'jj',
    'author': 'tony',
    'url': 'http://hjui.com',
    'likes': 999,
    'id': '5ec7a124f2926e2ad0d47660'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ url: 'http://xxjjoopp.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const dataInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  blogs,
  nonExistingId,
  dataInDb
}
