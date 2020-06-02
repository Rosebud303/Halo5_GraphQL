import React from 'react';
import './LibraryCardsContainer.scss';

const LibraryCardsContainer = (props) => {
  const libraryCards = props.selectedLibrary.map(card => {
    console.log(card.name)
    return (<p>{card.name}</p>)
  })

  return (
    <div>
      {libraryCards}
    </div>
  )
}

export default LibraryCardsContainer;
