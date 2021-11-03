import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  console.log("PROPS edit", props);
  const currentUser = React.useContext(CurrentUserContext); // Subscription to the context
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
   // console.log("current user", currentUser);
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);

  

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the browser from navigating to the form address

    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name,
      about: description,
    });


  };

  return (
    <div>
      <PopupWithForm
        name="edit-profile"
        title="Edit Profile"
        formName="profile"
        buttonSubmitTitle="Save"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
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
          value={name || ""} //It's give me Error on the console if it's Undefined 
          onChange={handleChangeName}
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
          value={description || ""} //It's give me Error on the console if it's Undefined 
          onChange={handleChangeDescription}
        />
        <span id="job-input-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default EditProfilePopup;
