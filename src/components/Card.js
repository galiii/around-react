import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext); //pro 11 1.4

  //likes [] _id name link owner: { name about avatar _id cohort }
  // console.log("card in card", card);
  //for delete button
  const isOwn = card.owner._id === currentUser._id; //Checking if the current user is the owner of the current card

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete_visible" : "card__delete_hidden"
  }`;

  // Check if the card was liked by the current user
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  //console.log("like", isLiked);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  const handleCardDelete = () => {
    onCardDelete(card);
  };

  return (
    <li className="card">
      <img
        src={card["link"]}
        alt={card["name"]}
        className="card__image"
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Delete"
        className={`card__delete ${
          isOwn ? "card__delete_visible" : "card__delete_hidden"
        }`}
        onClick={handleCardDelete}
      ></button>
      <div className="card__row">
        <h2 className="card__title">{card["name"]}</h2>
        <div className="card__like-container">
          <button
            type="button"
            aria-label="Like"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <span className="card__likes-count">{card["likes"].length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
