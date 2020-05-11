import React from 'react';
import './Arenapage.scss';
import { Link, Redirect } from 'react-router-dom';


const Arenapage = () => {
  return (
    <div>
      <h1>Arena Page Coming Soon...</h1>
      <Link to='/homepage'>
        <button>LINK BACK TO HOMEPAGE</button>
      </Link>
    </div>
  )
}

export default Arenapage;
