import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  //console.log("PROPS  avatar edit", props);
  const avatarRef = React.useRef(); // assigning the object returned by a hook to a variable
 

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the browser from navigating to the form address

    props.onUpdateAvatar({
        avatar: avatarRef.current.value
      });
    
  };

  return (
    <div>
      <PopupWithForm
        name="update-image-profile"
        title="Change profile picture"
        formName="profile-img"
        buttonSubmitTitle="Save"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
         type="url"
         name="avatar"
         id="avatar-input"
         className="form__input form__input_type_avatar"
         placeholder="avatar"
         required
         ref={avatarRef}
        />
       <span id="avatar-input-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default EditAvatarPopup;
