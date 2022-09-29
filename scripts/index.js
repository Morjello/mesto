import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.profile-popup');
const editProfilePopupBtn = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.profile-popup__input_type_name');
const bioInput = document.querySelector('.profile-popup__input_type_bio');
const profileName = document.querySelector('.profile__title');
const profileBio = document.querySelector('.profile__text');
const profileForm = document.querySelector('.profile-popup__form');
const addPopup = document.querySelector('.popup-add');
const addPopupBtn = document.querySelector('.profile__add-button');
const titleInput = document.querySelector('.popup-add__input_type_title');
const linkInput = document.querySelector('.popup-add__input_type_link');
const addForm = document.querySelector('.popup-add__form');
const popupImage = document.querySelector('.popup-image');
const popupImageOpenBtn = document.querySelector('.cards__image-button');
const popupImageText = document.querySelector('.popup-image__text');
const popupImagePhoto = document.querySelector('.popup-image__photo');
const popupSubmitButton = document.querySelector('.popup__button');
const popupAddSaveButton = document.querySelector('.popup-add__save-button');

function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', handleKeyEscape);
};

function closePopup(popup) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', handleKeyEscape);
};

popups.forEach((popup) => {
   popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
         closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
         closePopup(popup)
      }
   })
});

function handleKeyEscape(e) {
   if (e.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
   }
};

editProfilePopupBtn.addEventListener('click', function () {
   openPopup(profilePopup);
   nameInput.value = profileName.textContent;
   bioInput.value = profileBio.textContent;
});

addPopupBtn.addEventListener('click', function () {
   openPopup(addPopup);
   popupAddSaveButton.setAttribute('disabled', 'disabled');
   popupAddSaveButton.classList.add('popup__button_disabled');
});

function handleProfileFormSubmit(e) {
   e.preventDefault()
   profileName.textContent = nameInput.value;
   profileBio.textContent = bioInput.value;
   closePopup(profilePopup);
};

function handleAddFormSubmit(e) {
   e.preventDefault()
   addCard({
      title: titleInput.value,
      link: linkInput.value
   });
   e.target.reset();
   closePopup(addPopup);
};

export function openPopupImage(e) {
   const cardsImage = e.target.closest('.cards__image');
   const imgSrc = cardsImage.getAttribute('src');
   const imgAlt = cardsImage.getAttribute('alt');
   popupImagePhoto.setAttribute('src', imgSrc);
   popupImagePhoto.setAttribute('alt', imgAlt);
   popupImageText.textContent = imgAlt;
   openPopup(popupImage);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);