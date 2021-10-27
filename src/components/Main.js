import React from "react";
import Card from './Card';


function Main(props) {
  console.log(props.cardData);
  return (
    <main className="content">
      {/* Profile */}
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={props.user.userAvatar}
            alt="A profile image"
            className="profile__image"
          />
          
          <button
            className="profile__update-image"
            onClick={props.onEditAvatarClick}
          ></button>
        </div>
        
        <div className="profile__section-information">
          <div className="profile__row-information">
            <h1 className="profile__name">{props.user.userName}</h1>
            <button
              type="button"
              aria-label="Edit"
              className="profile__edit-button"
              onClick={props.onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job"> {props.user.userDescription}</p>
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
          {
            props.cardData.map((card, index) => 
            <li className="card"  key={card._id} ><Card key={card._id} card={card} onCardClick = {props.onCardClick} /></li>
            )
          }
          
        </ul>
      </section>
    </main>
  );
}

export default Main;
