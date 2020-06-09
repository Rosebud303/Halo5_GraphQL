import React from 'react';
import './LibraryCardsFilters.scss'

export const LibraryCardsFilters = ({ selectedLibraryFilters, filterChosenLibrary }) => {
  let filters = selectedLibraryFilters.map(filter => <div className='filter-border'><p onClick={(event) => filterChosenLibrary(event)} >{filter}</p></div>)
  return (
    <div className='filter-buttons'>
      <p onClick={(event) => filterChosenLibrary(event)}>ALL</p>
      {filters}
    </div>
  )
}
