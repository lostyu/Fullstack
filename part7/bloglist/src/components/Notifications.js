import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector(state => state.notification)
  const cls = `notification ${type}`
  if (message) {
    return <div className={cls}>{message}</div>
  }

  return null
}

export default Notification
