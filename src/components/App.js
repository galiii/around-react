import "../index.css";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
//import Card from './Card';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);

  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page__container">
      <Header />

      <Main
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
      />

      <Footer />

      {/**  Edit Profile Popup */}
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

      {/* Update Profile image Popup */}
      <PopupWithForm
        name="update-image-profile"
        title="Change profile picture"
        formName="profile-img" //profile
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

      {/* Add Card Popup */}
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

      {/* Delete card */}
      <PopupWithForm
        name="delete-card"
        title="Are you sure ?"
        formName="delete" //profile
        buttonSubmitTitle="Yes"
      />

      {/** Image Popup*/}
      <ImagePopup />
    </div>
  );
}

export default App;
