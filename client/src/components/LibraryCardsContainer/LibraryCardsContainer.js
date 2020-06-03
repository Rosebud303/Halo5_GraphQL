import React from "react";
import "./LibraryCardsContainer.scss";

const LibraryCardsContainer = (props) => {
  const libraryCards = props.selectedLibrary.map((card) => {
    return (
      <li>
        <a>
          <span>{card.name}</span>
          <img src={card.largeIconImageUrl || card.imageUrl} />
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
