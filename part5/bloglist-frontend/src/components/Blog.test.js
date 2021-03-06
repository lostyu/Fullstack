import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    const blog = {
      title: 'my title',
      author: 'tony',
      url: 'http://baidu.com',
      likes: 9999
    }

    component = render(<Blog blog={blog} />)
  })

  test('test blog', () => {
    const div = component.container.querySelector('.testDiv')
    const divHide = component.container.querySelector('.testHide')

    expect(div).toHaveTextContent('my title')
    expect(divHide).toHaveStyle('display:none')
  })

  test('test button click url and likes', () => {
    const divHide = component.container.querySelector('.testHide')
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(divHide).toHaveStyle('display:block')
    expect(divHide).toHaveTextContent('http://baidu.com')
    expect(divHide).toHaveTextContent('9999')
  })

  test('test click button twice', () => {
    const blog = {
      title: 'my title',
      author: 'tony',
      url: 'http://baidu.com',
      likes: 9999
    }
    const mockHandle = jest.fn()
    const component = render(<Blog blog={blog} addLike={mockHandle} />)

    const buttonLike = component.container.querySelector('.testBtn')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandle.mock.calls).toHaveLength(2)
  })
})
