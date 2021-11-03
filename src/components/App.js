import "../index.css";

import React from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { api } from "../utils/api.js";

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

  const [currentUser, setCurrentUser] = React.useState({}); //Default db - project 11 1.1
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser({ ...userData });
        setCards([...cardData]);
        //console.log(userData);
        //console.log("card ",cardData);
      })
      .catch(console.error);
  }, []);

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

  const handleCardLike = (card) => {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(
          (state) => state.filter((c) => c._id !== card._id) //create array of cards that aren't delete
        );
        //remove it from dom
        //card.removeCard();
        //deleteCardPopup.close();
      })
      .catch(console.error);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  return (
    <div className="page__container">
      {/* embedding data from the currentUser using the  context provider - project 11 1.2 */}
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          /*user={userInfo}*/
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
