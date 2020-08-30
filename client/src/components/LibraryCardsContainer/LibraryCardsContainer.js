import React from 'react';
import './LibraryCardsContainer.scss';

const LibraryCardsContainer = ({ selectedLibrary, selectedLibraryName }) => {
  const libraryCards = selectedLibrary.map((card) => {
    if (selectedLibraryName === 'medals' && card.spriteLocation) {
      const { spriteLocation: { spriteSheetUri, left, top }, name, description } = card
      const medalStyle = {
        backgroundImage: `url(${spriteSheetUri})`,
        backgroundPosition: `-${left}px -${top}px`,
        backgroundSize: 'auto',
        width: '74px',
        height: '74px',
      };
      return (
        <div className='library-medal-container'>
          <li id='library-medal' style={medalStyle}></li>
          <p className='meta-medal-title'>{name}</p>
          <p className='meta-medal-description'>{description}</p>
        </div>
      );
    }
    const { name, description, largeIconImageUrl, imageUrl, faction, type } = card
    if (selectedLibraryName === 'skulls') {
      return (
        <li id='library-skull'>
          <a href='/libraries'>
            <span>{name} <p className='library-card-description'>{description}</p></span>
            <img alt='Available skullls' src={largeIconImageUrl || imageUrl} />
          </a>
        </li>
      );
    }
    if (selectedLibraryName === 'weapons' && type === 'Vehicle') {
      return ''
    }
    return (
      <li>
        <a href='/libraries'>
          <span>
            {name}
            <p className='library-card-description'>{description}</p>
            <p className='library-card-description'>{faction}</p>
            <p className='library-card-description'>{type}</p>
          </span>

          <img alt='weapon display' src={largeIconImageUrl || imageUrl} />
        </a>
      </li>
    );
  });

  return (
    <div className='library-cards-container'>
      <ul>{libraryCards}</ul>
    </div>
  );
};

export default LibraryCardsContainer;
