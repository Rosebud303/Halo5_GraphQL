import React from 'react';
import './Spinner.css';

const Spinner = (props) => (
  <>
    <div className='spinner' />
    <p className='spinner__text'>Loading {props.name}...</p>
  </>
);

export default Spinner;
