import React from 'react';
import './LibraryCardsFilters.scss'

export const LibraryCardsFilters = (props) => {
  let filters = props.selectedLibraryFilters.map(filter => <p>{filter}</p>)
  return (
    <div className='filter-buttons'>
      <p>ALL</p>
      {filters}
    </div>
  )
}
