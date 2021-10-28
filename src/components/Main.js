import React from "react";
import photo from "../images/profile.jpg";
import { api } from "../utils/api.js";
import Card from "./Card";

function Main(props) {
  console.log("main data",props);

  const [cards, setCards] = React.useState([]); 

  const [userInfo, setUserInfo] = React.useState({
    userName: "Jacques Cousteau",
    userDescription: "Explorer",
    userAvatar: photo,
  }); //Default  db

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setUserInfo({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
        });
        setCards([...cardData]);
        //console.log(cardData);
      })
      .catch(console.error);
  }, []);


  return (
    <main className="content">
      {/* Profile */}
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={userInfo["userAvatar"]}
            alt={userInfo["userName"]}
            className="profile__image"
          />

          <button
            className="profile__update-image"
            onClick={props.onEditAvatarClick}
          ></button>
        </div>

        <div className="profile__section-information">
          <div className="profile__row-information">
            <h1 className="profile__name">{userInfo["userName"]}</h1>
            <button
              type="button"
              aria-label="Edit"
              className="profile__edit-button"
              onClick={props.onEditProfileClick}
            ></button>
          </div>
          <p className="profile__job"> {userInfo["userDescription"]}</p>
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
          {cards.map((card) => (
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
