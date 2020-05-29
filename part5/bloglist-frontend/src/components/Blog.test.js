import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('test blog', () => {
  const blog = {
    title: 'my title',
    author: 'tony',
    url: 'http://baidu.com',
    likes: 9999
  }

  const component = render(<Blog blog={blog} />)
  const div = component.container.querySelector('.testDiv')
  const divHide = component.container.querySelector('.testHide')

  expect(div).toHaveTextContent('my title')
  expect(divHide).toHaveStyle('display:none')
})
