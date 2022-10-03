import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js'

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
const popupImageText = document.querySelector('.popup-image__text');
const popupImagePhoto = document.querySelector('.popup-image__photo');
const popupAddSaveButton = document.querySelector('.popup-add__save-button');
const cardsTable = document.querySelector('.cards__table');
const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
};

//валидация форм
const editProfileValidation = new FormValidator(validationConfig, profileForm,);
editProfileValidation.enableValidation();
const addFormValidation = new FormValidator(validationConfig, addForm,);
addFormValidation.enableValidation();

//открытие попапа с картинкой
const handleCardClick = (title, link) => {
   popupImagePhoto.src = link;
   popupImagePhoto.alt = title
   popupImageText.textContent = title;
   openPopup(popupImage);
};

//создание экземпляра карточки
function createCopyCard(data) {
   const card = new Card(data, '.template', handleCardClick).addCard();
   cardsTable.prepend(card);
}

initialCards.forEach((data) => {
   createCopyCard(data);
});

//открытие попапов
function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', handleKeyEscape);
};

//закрытие попапов
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

//открытие формы редактирования
editProfilePopupBtn.addEventListener('click', function () {
   openPopup(profilePopup);
   nameInput.value = profileName.textContent;
   bioInput.value = profileBio.textContent;
});

//открытие формы добавления карточки
addPopupBtn.addEventListener('click', function () {
   openPopup(addPopup);
   popupAddSaveButton.setAttribute('disabled', 'disabled');
   popupAddSaveButton.classList.add('popup__button_disabled');
});

//редактирование профиля
function handleProfileFormSubmit(e) {
   e.preventDefault()
   profileName.textContent = nameInput.value;
   profileBio.textContent = bioInput.value;
   closePopup(profilePopup);
};

//добавление карточки
function handleAddFormSubmit(e) {
   e.preventDefault();
   const data = {
      title: titleInput.value,
      link: linkInput.value
   }
   createCopyCard(data);
   e.target.reset();
   closePopup(addPopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);