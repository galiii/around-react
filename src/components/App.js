import "../index.css";
import { api } from "../utils/api.js";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import photo from "../images/profile.jpg";
//import initCards from "../utils/cards.js";

function App() {
  //Popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });

    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  const [userInfo, setUserInfo] = React.useState({
    userName: "Jacques Cousteau",
    userDescription: "Explorer",
    userAvatar: photo,
  }); //Default  db

  const [cards, setCards] = React.useState([]); 

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setUserInfo({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
        });
        setCards([...cardData]);
        console.log(cardData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page__container">
      <Header />

      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        user={userInfo}
        cardData={cards}
        onCardClick={handleCardClick}
      />

      <Footer />

     
      <PopupWithForm
        name="edit-profile"
        title="Edit Profile"
        formName="profile"
        buttonSubmitTitle="Save"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="name"
          id="name-input"
          className="form__input form__input_type_name"
          placeholder="name"
          required
          minLength="2"
          maxLength="40"
        />
        <span id="name-input-error"></span>

        <input
          type="text"
          name="job"
          id="job-input"
          className="form__input form__input_type_job"
          placeholder="job"
          required
          minLength="2"
          maxLength="200"
        />
        <span id="job-input-error"></span>
      </PopupWithForm>

     
      <PopupWithForm
        name="update-image-profile"
        title="Change profile picture"
        formName="profile-img" 
        buttonSubmitTitle="Save"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          name="avatar"
          id="avatar-input"
          className="form__input form__input_type_avatar"
          placeholder="avatar"
          required
        />
        <span id="avatar-input-error"></span>
      </PopupWithForm>

     
      <PopupWithForm
        name="add-card"
        title="New Place"
        formName="new"
        buttonSubmitTitle="Create"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          name="card-title"
          id="card-title-input"
          className="form__input form__input_type_card-title"
          placeholder="Title"
          required
          minLength="1"
          maxLength="30"
        />
        <span id="card-title-input-error"></span>
        <input
          type="url"
          name="card-link"
          id="card-link-input"
          className="form__input form__input_type_card-link"
          placeholder="Image link"
          required
        />
        <span id="card-link-input-error"></span>
      </PopupWithForm>

      
      <PopupWithForm
        name="delete-card"
        title="Are you sure ?"
        formName="delete" 
        buttonSubmitTitle="Yes"
      />

      {/** Image Popup*/}
      <ImagePopup
        isOpen={isImagePopupOpen}
        name="image"
        selectedCard={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
