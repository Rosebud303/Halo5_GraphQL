import React from 'react';
import './LibrarySelector.scss';

const LibrarySelector = (props) => {
  return (
    <div>
      <p className='libraries-button' onClick={(event) => props.changeLibrary(event)}>Campaigns</p>
      <p className='libraries-button' onClick={(event) => props.changeLibrary(event)}>Vehicles</p>
      <p className='libraries-button' onClick={(event) => props.changeLibrary(event)}>Skulls</p>
      <p className='libraries-button' onClick={(event) => props.changeLibrary(event)}>Weapons</p>
      <p className='libraries-button' onClick={(event) => props.changeLibrary(event)}>Medals</p>
      <p className='libraries-button' onClick={(event) => props.changeLibrary(event)}>Enemies</p>
      <p className='libraries-button' onClick={(event) => props.changeLibrary(event)}>Maps</p>
    </div>
  )
}

export default LibrarySelector;
