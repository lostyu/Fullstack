import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = ev => {
    setValue(ev.target.value)
  }

  const reset = ev => {
    setValue('')
  }

  const props = {
    type,
    value,
    onChange
  }

  return {
    props,
    reset
  }
}
