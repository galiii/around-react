import React from "react";
import photo from "../images/profile.jpg";
import { api } from "../utils/api.js";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext'; 

function Main(props) {
  console.log(props);

  //name about avatar _id cohort
  const currentUser = React.useContext(CurrentUserContext); //pro 11 1.3
  //console.log("user in main", currentUser);


  return (
    <main className="content">
      {/* Profile */}
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser["avatar"]}
            alt={currentUser["name"]}
            className="profile__image"
          />

          <button
            className="profile__update-image"
            onClick={props.onEditAvatarClick}
          ></button>
        </div>

        <div className="profile__section-information">
          <div className="profile__row-information">
            <h1 className="profile__name">{currentUser["name"]}</h1>
            <button
              type="button"
              aria-label="Edit"
              className="profile__edit-button"
              onClick={props.onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job"> {currentUser["about"]}</p>
        </div>
        <button
          type="button"
          aria-label="Add"
          className="profile__add-button"
          onClick={props.onAddPlaceClick}
        ></button>
      </section>

      {/* Cards__list  */}
      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
              />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;