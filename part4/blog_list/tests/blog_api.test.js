const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// 每次测试重新生成数据
beforeEach(async () => {
  console.log('start init data')
  // 每次测试前删除数据
  await Blog.deleteMany({})

  // 重新生成数据
  const arrObjects = helper.blogs.map(blog => new Blog(blog))
  const promiseArr = arrObjects.map(blog => blog.save())

  await Promise.all(promiseArr)
  console.log('end init data')
})

describe('GET', () => {
  test('get all blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(blog => blog.author)

    expect(authors).toContain('tony')
  })
})

describe('POST', () => {
  test('add a valid blog be added', async () => {
    const blog = {
      title: 'testblog',
      author: 'jack',
      url: 'http://justtest.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.dataInDb()
    expect(blogs).toHaveLength(helper.blogs.length + 1)

    const authors = blogs.map(r => r.author)
    expect(authors).toContain('jack')
  })

  test('add a un valid blog not be added', async () => {
    const blog = {
      title: 'testblog',
      author: 'jack',
      url: 'http://123123.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const blogs = await helper.dataInDb()
    expect(blogs).toHaveLength(helper.blogs.length)
  })


})





afterAll(() => {
  mongoose.connection.close()
})
