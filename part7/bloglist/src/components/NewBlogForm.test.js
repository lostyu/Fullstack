import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('form', () => {
  const mockHandle = jest.fn()

  const component = render(<NewBlogForm createBlog={mockHandle} />)
  const div = component.container.querySelector('.testDiv')
  const input = div.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: {value: 'im test form'}
  })
  fireEvent.submit(form)

  expect(mockHandle.mock.calls).toHaveLength(1)
  expect(mockHandle.mock.calls[0][0].author).toBe('im test form')
})
