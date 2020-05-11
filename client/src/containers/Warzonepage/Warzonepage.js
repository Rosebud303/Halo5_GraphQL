import React from 'react';
import './Warzonepage.scss';
import { Link, Redirect } from 'react-router-dom';

const Warzonepage = () => {
  
  return (
    <div>
      <h1>Warzone Page Coming Soon...</h1>
      <Link to='/homepage'>
        <button>LINK BACK TO HOMEPAGE</button>
      </Link>

    </div>
  )
}

export default Warzonepage;
