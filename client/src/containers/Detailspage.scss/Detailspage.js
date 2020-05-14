import React from 'react';
import './Detailspage.scss';
import { Link } from 'react-router-dom';


const Detailspage = () => {
  return (
    <div>
      <h1>Details Page Coming Soon...</h1>
      <Link to='/homepage'>
        <button>LINK BACK TO HOMEPAGE</button>
      </Link>
    </div>
  )
}

export default Detailspage;
