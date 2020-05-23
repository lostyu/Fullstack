const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, obj) => {
    return sum + obj.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let max = 0
  let _index = 0

  blogs.forEach((item, index) => {
    if (max < item.likes) {
      max = item.likes
      _index = index
    }
  })

  return blogs.length === 0
    ? null
    : blogs[_index]
}

const mostBlogs = (blogs) => {
  let result = {}
  let max = 0
  let k = ''

  lodash.forEach(blogs, blog => {
    if (result[blog.author]) {
      result[blog.author]++
    } else {
      result[blog.author] = 1
    }
  })

  lodash.forIn(result, (val, key) => {
    if (val > max) {
      max = val
      k = key
    }
  })

  return blogs.length === 0
    ? null
    : {
      author: k,
      blogs: result[k]
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
