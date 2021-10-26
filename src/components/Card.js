import React from 'react';

 function Card(props) {
   //_id = string , name = string, link = url, likes = array
   return (
   
      <div >
        <img src={props.link} className="card__image" />
        <button type="button" aria-label="Delete" className="card__delete"></button>
        <div className="card__row">
          <h2 className="card__title">{props.name}</h2>
          <div className="card__like-container">
            <button type="button" aria-label="Like" className="card__like"></button>
          <span className="card__likes-count">{props.likes.length}</span>
          </div>
          </div>
        </div>
     
    
   );
 }

 export default Card;


