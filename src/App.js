import "./index.css";
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className="page__container">
     <Header />
      <main className="content">

        {/* Profile */}
        <Main />

        {/* Cards__list  */}
        <section className="cards">
          <ul className="cards__list"></ul>
        </section>
      </main>

      <Footer />
    {/**  Edit Profile Popup */}
      <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button
            type="button"
            aria-label="Close"
            className="popup__close-button"
          ></button>
          <h3 className="popup__title">Edit Profile</h3>
          <form name="profile" action="#" className="form" noValidate>
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

            <button type="submit" aria-label="Submit" className="form__button">
              Save
            </button>
          </form>
        </div>
      </div>
     
     {/* Update Profile image Popup */}
      <div className="popup popup_type_update-image-profile">
        <div className="popup__container">
          <button
            type="button"
            aria-label="Close"
            className="popup__close-button"
          ></button>
          <h3 className="popup__title">Change profile picture</h3>
          <form name="profile" action="#" className="form" noValidate>
            <input
              type="url"
              name="avatar"
              id="avatar-input"
              className="form__input form__input_type_avatar"
              placeholder="avatar"
              required
            />
            <span id="avatar-input-error"></span>

            <button type="submit" aria-label="Submit" className="form__button">
              Save
            </button>
          </form>
        </div>
      </div>
     
    {/* Add Card Popup */ }
      <div className="popup popup_type_add-card">
        <div className="popup__container">
          <button
            type="button"
            aria-label="Close"
            className="popup__close-button"
          ></button>
          <h3 className="popup__title">New Place</h3>
          <form name="new" action="#" className="form" noValidate>
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
            <button type="submit" aria-label="Submit" className="form__button">
              Create
            </button>
          </form>
        </div>
      </div>
      
      {/* Delete card */}
      <div className="popup popup_type_delete-card">
        <div className="popup__container">
          <button
            type="button"
            aria-label="Close"
            className="popup__close-button"
          ></button>
          <h3 className="popup__title">Are you sure ?</h3>
          <form name="profile" action="#" className="form" noValidate>
            <button type="submit" aria-label="Submit" className="form__button">
              Yes
            </button>
          </form>
        </div>
      </div>
      
      {/** Image Popup*/}
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
        </div>
      </div>
      


    </div>
  );
}

export default App;
