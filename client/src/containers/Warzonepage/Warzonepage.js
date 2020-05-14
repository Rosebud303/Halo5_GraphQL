import React from 'react';
import './Warzonepage.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Warzonepage = () => {
  return (
    <div>
      <h1>Warzone Page Coming Soon...</h1>
      <Link to='/homepage'>
        <button>LINK BACK TO HOMEPAGE</button>
      </Link>
      <Link to='/warzone/firefight'>
        <button>Fire fight</button>
      </Link>
      <Link to='/warzone/assault'>
        <button>Assault</button>
      </Link>
      <Link to='/warzone/regular'>
        <button>Regular</button>
      </Link>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem
});

export default connect(mapStateToProps)(Warzonepage);

