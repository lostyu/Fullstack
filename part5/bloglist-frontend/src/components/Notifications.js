import React from 'react'

const Notification = ({ message, type = 'success' }) => {
  const cls = `notification ${type}`
  if (message !== null) {
    return (
      <div className={cls}>
        {message}
      </div>
    )
  }

  return null
}

export default Notification