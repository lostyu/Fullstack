import React from 'react';

const Notification = ({ type = 'success', message }) => {
  if (message === null) {
    return null
  }

  const cls = `notification ${type}`;

  return (
    <div className={cls}>
      {message}
    </div>
  )
}

export default Notification;