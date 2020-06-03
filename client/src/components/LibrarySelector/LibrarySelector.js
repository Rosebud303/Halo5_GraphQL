import React from "react";
import "./LibrarySelector.scss";

const LibrarySelector = (props) => {
  return (
    <div className='library-buttons-container'>
      <p className='libraries-button' data-filter={JSON.stringify(["OsirisTeam", "BlueTeam"])} onClick={(event) => props.changeLibrary(event)}>
        Campaigns
      </p>
      <p className='libraries-button' data-filter={JSON.stringify([])} onClick={(event) => props.changeLibrary(event)}>
        Vehicles
      </p>
      <p className='libraries-button' data-filter={JSON.stringify([])} onClick={(event) => props.changeLibrary(event)}>
        Skulls
      </p>
      <p className='libraries-button' data-filter={JSON.stringify(["Standard", "Unknown", "Power"])} onClick={(event) => props.changeLibrary(event)}>
        Weapons
      </p>
      <p className='libraries-button' data-filter={JSON.stringify(["Vehicles", "KillingSpree", "Style", "WeaponProficiency", "MultiKill", "Warzone"])} onClick={(event) => props.changeLibrary(event)}>
        Medals
      </p>
      <p className='libraries-button' data-filter={JSON.stringify(["Covenant", "Promethean", "Unsc"])} onClick={(event) => props.changeLibrary(event)}>
        Enemies
      </p>
      <p className='libraries-button' data-filter={JSON.stringify(["Campaign", "Warzone", "Arena", "Custom"])} onClick={(event) => props.changeLibrary(event)}>
        Maps
      </p>
    </div>
  );
};

export default LibrarySelector;
