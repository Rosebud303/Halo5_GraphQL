import React from 'react';
import './LibraryCardsFilters.scss'

export const LibraryCardsFilters = ({ selectedLibraryFilters, filterChosenLibrary}) => {
  let filters = selectedLibraryFilters.map(filter => <p onClick={(event) => filterChosenLibrary(event)} >{filter}</p>)
  return (
    <div className='filter-buttons'>
      <p onClick={(event) => filterChosenLibrary(event)}>ALL</p>
      {filters}
    </div>
  )
}
