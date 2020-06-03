import React from "react";
import "./LibraryCardsContainer.scss";

const LibraryCardsContainer = (props) => {
  const libraryCards = props.selectedLibrary.map((card) => {
    if (props.selectedLibraryName === "medals" && card.spriteLocation) {
      const medalStyle = {
        backgroundImage: `url(${card.spriteLocation.spriteSheetUri})`,
        backgroundPosition: `-${card.spriteLocation.left}px -${card.spriteLocation.top}px`,
        backgroundSize: "auto",
        width: "74px",
        height: "74px",
      };
      return (
        <div className='library-medal-container'>
          <li id='library-medal' style={medalStyle}></li>
          <p>{card.name}</p>
        </div>
      );
    }
    if (props.selectedLibraryName === "skulls") {
      return (
        <li id='library-skull'>
          <a>
            <span>{card.name} <p className='library-card-description'>{card.description}</p></span>
            <img src={card.largeIconImageUrl || card.imageUrl} />
            </a>
        </li>
      );
    }
    return (
      <li>
        <a>
          <span>{card.name}
            <p className='library-card-description'>{card.description}</p>
            <p className='library-card-description'>{card.faction}</p>
            <p className='library-card-description'>{card.type}</p>
          </span>
          
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
