import React from 'react';
import './Detailspage.scss';
import { Link } from 'react-router-dom';


const Detailspage = () => {
  return (
    <div>
      <header></header>
      <h1>Details Page Coming Soon...</h1>
      <Link to='/homepage'>
        <button>LINK BACK TO HOMEPAGE</button>
      </Link>
      <section className='details-page-sections'>
        <div className='accumulative-arena-wl'>

        </div>
        <div className='accumulative-arena-kda'>

        </div>
        <div className='arena-rank'>

        </div>
      </section>
      <section className='details-page-sections'>
        <div>

        </div>
        <div>

        </div>
        <div>

        </div>
      </section>
      <section className='details-page-sections'>

      </section>
    </div>
  )
}

export default Detailspage;
