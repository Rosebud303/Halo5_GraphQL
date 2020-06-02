import React from 'react';
import './LibrarySelector.scss';

const LibrarySelector = (props) => {
  return (
    <div>
      <p className='libraries-button' data-filter={['OsirisTeam', 'BlueTeam']} onClick={(event) => props.changeLibrary(event)}>Campaigns</p>
      <p className='libraries-button' data-filter={[]} onClick={(event) => props.changeLibrary(event)}>Vehicles</p>
      <p className='libraries-button' data-filter={[]} onClick={(event) => props.changeLibrary(event)}>Skulls</p>
      <p className='libraries-button' data-filter={['Standard', 'Unknown', 'Power']} onClick={(event) => props.changeLibrary(event)}>Weapons</p>
      <p className='libraries-button' data-filter={['Vehicles', 'KillingSpree', 'Style', 'WeaponProficiency', 'MultiKill', 'Warzone']} onClick={(event) => props.changeLibrary(event)}>Medals</p>
      <p className='libraries-button' data-filter={['Covenant', 'Promethean', 'Unsc']} onClick={(event) => props.changeLibrary(event)}>Enemies</p>
      <p className='libraries-button' data-filter={['Campaign', 'Warzone', 'Arena', 'Custom']} onClick={(event) => props.changeLibrary(event)}>Maps</p>
    </div>
  )
}

export default LibrarySelector;
