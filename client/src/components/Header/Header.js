import React from 'react'
import { Link } from "react-router-dom"
import './Header.scss'

export default function Header(props) {
  
  return (
    <header id='header-all' className='arena-header header-all'>
      <div>
        <h1 className='arena-title'>{props.title || props.header}</h1>
      </div>
      <div className='buttons-container'>
        <Link to='/homepage' className='homepage-links'>
          <p id='buttons' className='detail-link arena-button'>HOMEPAGE</p>
        </Link>
        <Link to={`/${props.button1}`} className='homepage-links'>
          <p id='buttons' className='detail-link arena-button'>{`${props.button1} Page`}</p>
        </Link>
        <Link to={`/${props.button2}`} className='homepage-links'>
          <p id='buttons' className='detail-link arena-button'>{`${props.button2} Page`}</p>
        </Link>
      </div>
    </header>
  );
}
