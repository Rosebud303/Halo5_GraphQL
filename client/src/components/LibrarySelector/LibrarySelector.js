import React from 'react';
import './LibrarySelector.scss';

const LibrarySelector = ({ changeLibrary }) => {
  return (
    <div className='library-buttons-container'>
      <p className='libraries-button' data-compare='type' data-filter={JSON.stringify(['OsirisTeam', 'BlueTeam'])} onClick={(event) => changeLibrary(event)}>
        Campaigns
      </p>
      <p className='libraries-button' data-compare='' data-filter={JSON.stringify([])} onClick={(event) => changeLibrary(event)}>
        Vehicles
      </p>
      <p className='libraries-button' data-compare='' data-filter={JSON.stringify([])} onClick={(event) => changeLibrary(event)}>
        Skulls
      </p>
      <p className='libraries-button' data-compare='type' data-filter={JSON.stringify(['Standard', 'Power', 'Unknown'])} onClick={(event) => changeLibrary(event)}>
        Weapons
      </p>
      <p className='libraries-button' data-compare='classification' data-filter={JSON.stringify(['Vehicles', 'KillingSpree', 'Style', 'WeaponProficiency', 'MultiKill', 'Warzone'])} onClick={(event) => changeLibrary(event)}>
        Medals
      </p>
      <p className='libraries-button' data-compare='faction' data-filter={JSON.stringify(['Covenant', 'Promethean', 'Unsc'])} onClick={(event) => changeLibrary(event)}>
        Enemies
      </p>
      <p className='libraries-button' data-compare='supportedGameModes' data-filter={JSON.stringify(['Campaign', 'Warzone', 'Arena'])} onClick={(event) => changeLibrary(event)}>
        Maps
      </p>
    </div>
  );
};

export default LibrarySelector;
