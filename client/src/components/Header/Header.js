import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header({ title, header, button1, button2 }) {

  return (
    <header id='header-all' className='arena-header header-all'>
      <div>
        <h1 className='arena-title header-title'>{title || header}</h1>
      </div>
      <div className='buttons-container'>
        <Link to='/homepage' className='homepage-links'>
          <p id='buttons' className='detail-link arena-button'>HOMEPAGE</p>
        </Link>
        <Link to={`/${button1}`} className='homepage-links'>
          <p id='buttons' className='detail-link arena-button'>{`${button1} Page`}</p>
        </Link>
        <Link to={`/${button2}`} className='homepage-links'>
          <p id='buttons' className='detail-link arena-button'>{`${button2} Page`}</p>
        </Link>
      </div>
    </header>
  );
}
