import React from "react";

function ImagePopup(props) {
    return (
        <div className="popup popup_type_image">
        <div className="popup__container popup__figure-container">
          <button
            type="button"
            aria-label="Close image"
            className="popup__close-button"
          ></button>
          <figure className="popup__figure">
            <img
              alt="default"
              src="https://code.s3.yandex.net/web-code/yosemite.jpg"
              className="popup__image"
            />
            <figcaption className="popup__caption"></figcaption>
          </figure>
        </div> {/**   popup__container */}
      </div> 
    );
}

export default ImagePopup;