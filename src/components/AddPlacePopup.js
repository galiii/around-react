import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddPlacePopup(props) {
  
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");
    
  
    // After loading the current user from the API
    // their data will be used in managed components.
    React.useEffect(() => {
      // console.log("current user", currentUser);
      setName('');
      setLink('');
    }, [props.isOpen]);
  
    const handleAddName = (e) => {
        console.log("eee",e.target);
        setName(e.target.value);
    }
    const handleAddLink = (e) => setLink(e.target.value);
  
    
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the browser from navigating to the form address

    //console.log("e",e.error);
    // Pass the values of the managed components to the external handler
    props.onAddPlaceSubmit({
       name,
      link
    });
  };

  return (
    <div>
      <PopupWithForm
        name="add-card"
        title="New Place"
        formName="new"
        buttonSubmitTitle="Create"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
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
            value={name || ""}
            onChange={handleAddName}
          />
          <span id="card-title-input-error"></span>
          <input
            type="url"
            name="card-link"
            id="card-link-input"
            className="form__input form__input_type_card-link"
            placeholder="Image link"
            required
            value={link || ""}
            onChange={handleAddLink}
          />
          <span id="card-link-input-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default AddPlacePopup;
