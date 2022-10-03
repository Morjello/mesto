import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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
const cardsTable = document.querySelector('.cards__table');
const initialCards = [
   {
      title: 'Форд',
      link: 'https://images.unsplash.com/photo-1661344853432-97655cdb17bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80'
   },
   {
      title: 'Поле',
      link: 'https://images.unsplash.com/photo-1661172212114-3f9b1ba72d83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
   },
   {
      title: 'Зенит - В',
      link: 'https://images.unsplash.com/photo-1661367596997-22261c7f922d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80'
   },
   {
      title: 'Каньон',
      link: 'https://images.unsplash.com/photo-1660866837205-348b627e3909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
   },
   {
      title: 'Храм Святой Марии в Ловере',
      link: 'https://images.unsplash.com/photo-1659389976255-eb787cefd9f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
   },
   {
      title: 'Закат',
      link: 'https://images.unsplash.com/photo-1661344662632-ac54c94c8416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1975&q=80'
   }
];
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

initialCards.forEach((item) => {
   const card = new Card(item, '.template', handleCardClick);
   const cardElement = card.addCard();
   document.querySelector('.cards__table').prepend(cardElement);
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
   const card = new Card(data, '.template', handleCardClick).addCard();
   cardsTable.prepend(card);
   e.target.reset();
   closePopup(addPopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);