import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = ev => {
    setValue(ev.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

console.log(123)
