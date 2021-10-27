import React from "react";
import Card from './Card';
import profileImage from "../images/profile.jpg";
import cardsData from "../utils/cards.js";



function Main(props) {
  console.log(props);
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
       
          {/**_id = string , name = string, link = url, likes = array */}
          {
            cardsData.map((card, index) => 
            <li className="card"  key={index} ><Card {...card} /></li>
            )
          }
          
        </ul>
      </section>
    </main>
  );
}

export default Main;
