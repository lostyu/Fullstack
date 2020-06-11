const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

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


  await User.deleteMany({})
  const userObjects = helper.users.map(user => new User(user))
  const promiseUserArr = userObjects.map(user => user.save())
  await Promise.all(promiseUserArr)
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
  test('not authorized 401', async () => {
    const blog = {
      title: 'testblog',
      author: 'jack',
      url: 'http://justtest.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  })

  test('add a valid blog be added', async () => {
    const { token } = await helper.loginAndGetToken(api)

    const blog = {
      title: 'testblog',
      author: 'jack',
      url: 'http://justtest.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.dataInDb()
    console.log(blogs)
    expect(blogs).toHaveLength(helper.blogs.length + 1)

    const authors = blogs.map(r => r.author)
    expect(authors).toContain('jack')
  })

  test('add a un valid blog not be added', async () => {
    const { token } = await helper.loginAndGetToken(api)

    const blog = {
      title: 'testblog',
      author: 'jack',
      url: 'http://123123.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(blog)
      .expect(400)

    const blogs = await helper.dataInDb()
    expect(blogs).toHaveLength(helper.blogs.length)
  })


})


describe('property test', () => {
  test('test id property', async () => {
    const blogs = await helper.dataInDb()

    expect(blogs[0].id).toBeDefined()
  })


  test('like is null defaults 0', async () => {
    const { token } = await helper.loginAndGetToken(api)

    const blog = {
      title: 'test222',
      author: 'tony t',
      url: 'http://iieo3902.com',
    }

    let result = await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', 'bearer ' + token)
      .expect(201)

    expect(result.body.likes).toBe(0)
  })

  test('need title and url ', async () => {
    const { token } = await helper.loginAndGetToken(api)
    const blog = {
      author: 'tony oopp'
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', 'bearer ' + token)
      .expect(400)

    const blogs = await helper.dataInDb()
    expect(blogs).toHaveLength(helper.blogs.length)
  })

})



describe('DELETE', () => {
  test('delete with no token 401', async () => {
    const blogs = await helper.dataInDb()
    const blog = blogs[0]

    await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(401)
  })

  test('delete a blog id is ok', async () => {
    const { token, id } = await helper.loginAndGetToken(api)
    const blogs = await helper.dataInDb()
    const blog = blogs[0]


    if (blog.user.toString() === id) {
      await api
        .delete(`/api/blogs/${blog.id}`)
        .set('Authorization', 'bearer ' + token)
        .expect(204)
    } else {
      await api
        .delete(`/api/blogs/${blog.id}`)
        .set('Authorization', 'bearer ' + token)
        .expect(401)
    }


  })

  test('delete a blog id is null', async () => {
    const { token } = await helper.loginAndGetToken(api)
    const id = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(404)
  })

  test('delete a blog id is error', async () => {
    const { token } = await helper.loginAndGetToken(api)
    const id = '123jifosdjjka'

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(400)
  })

})



describe('PUT', () => {
  test('update a blog with id ok', async () => {
    const blogs = await helper.dataInDb()
    const data = {
      title: 'test put1111111111111111',
      url: 'http://testurl1111111111111.com',
      author: 'tony111111111111111111',
      likes: 111111111111111
    }

    await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(data)
      .expect(200)

  })

  test('update a blog with id null', async () => {
    const id = '5ec9f31ba437fe2f682723e2'
    const data = {
      title: 'test put1111111111111111',
      url: 'http://testurl1111111111111.com',
      author: 'tony111111111111111111',
      likes: 111111111111111
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(data)
      .expect(404)

  })


  test('update a blog with id error', async () => {
    const id = '5ec9f31f682723e2'
    const data = {
      title: 'test put1111111111111111',
      url: 'http://testurl1111111111111.com',
      author: 'tony111111111111111111',
      likes: 111111111111111
    }

    await api
      .put(`/api/blogs/${id}`)
      .send(data)
      .expect(400)

  })

})


afterAll(() => {
  mongoose.connection.close()
})
