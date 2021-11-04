import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup"; //pro 11 3.1 - Refactoring: Create the  component
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
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
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

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
      })
      .catch(console.error);
  }, []);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleDeleteCard = () => setIsDeleteCardPopupOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
    setIsImagePopupOpen(true);
  };

  //pro 11 2.2 - add support like and dislike support card
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); //Check one more time if this card was already liked
    api //Send a request to the API and getting the updated card data
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  };

  //pro 11 2.2 - add support delete card
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards(
          (state) => state.filter((c) => c._id !== card._id) //Create array of cards that aren't delete
        );
        //setIsDeleteCardPopupOpen(false);
      })
      .catch(console.error);
  };

  const handleUpdateUser = (user) => {
    api
      .editProfileUserInfo(user)
      .then((res) => {
        setCurrentUser({
          ...res,
        });
        setIsEditProfilePopupOpen(false);
      })
      .catch(console.error)
      .finally(
        () => console.log("finally")
        //renderLoading(false, editProfileModel, buttonsSettings.edit)
      );
  };

  const handleUpdateAvatar = (link) => {
    api
      .updateUserImage(link)
      .then((res) => {
        setCurrentUser({
          ...res,
        });
        console.log("AVATAR APP", res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(console.error)
      .finally(
        () => console.log("finally")
        //renderLoading(false, editProfileModel, buttonsSettings.edit)
      );
  };

  const handleAddPlaceSubmit = (data) => {
    console.log("new",data);
    api
      .addCard(data)
      .then((res) => {
        const newCard = {
          name: data["name"],
          link: data["link"],
          _id: res._id, //_id i have some problem if i don't _id
          owner: res.owner,
          likes: res.likes,
        };
        setCards([newCard, ...cards]); 
        setIsAddPlacePopupOpen(false);
      })
      .catch(console.error)
      .finally(() => console.log("finally")
        //renderLoading(false, addCardModel, buttonsSettings.create)
      );
  }

  

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

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
         
        <PopupWithForm
          name="delete-card"
          title="Are you sure ?"
          formName="delete"
          buttonSubmitTitle="Yes"
          //isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          //onSubmit={handleDeleteCard}
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
