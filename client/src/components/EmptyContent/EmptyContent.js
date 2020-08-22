import React from 'react'
import './EmptyContent.scss'

const EmptyContent = ({ message }) => {
  return (
    <div className='no-content-container'>
      <div className='no-content-title'>
        <h2>ATTENTION</h2>
      </div>
      <div className='no-content-message'>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default EmptyContent;
