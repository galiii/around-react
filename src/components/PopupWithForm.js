import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_open`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Close"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <form name={props.formName} action="#" className="form">
          {props.children}

          <button type="submit" aria-label="Submit" className="form__button">
            {props.buttonSubmitTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
