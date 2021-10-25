import React from 'react';
import profileImage from '../images/profile.jpg';

 function Main(props) {
   return (
    <section className="profile">
    <div className="profile__image-container">
      <img
        src={profileImage}
        alt="A profile image"
        className="profile__image"
      />
      <button className="profile__update-image"></button>
    </div>

    <div className="profile__section-information">
      <div className="profile__row-information">
        <h1 className="profile__name">Jacques Cousteau</h1>
        <button
          type="button"
          aria-label="Edit"
          className="profile__edit-button"
        ></button>
      </div>
      <p className="profile__job">Explorer</p>
    </div>
    <button
      type="button"
      aria-label="Add"
      className="profile__add-button"
    ></button>
  </section>
   );
 }
   
 export default Main;