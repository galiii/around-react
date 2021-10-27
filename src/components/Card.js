import React from "react";

function Card({ card, onCardClick }) {
  //console.log("card",props);

  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <div>
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Delete"
        className="card__delete"
      ></button>
      <div className="card__row">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            aria-label="Like"
            className="card__like"
          ></button>
          <span className="card__likes-count">{card["likes"].length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
