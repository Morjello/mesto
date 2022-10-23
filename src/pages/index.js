import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/initialCards.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
   profilePopup,
   editProfilePopupBtn,
   profileName, profileBio,
   profileForm, addPopup,
   addPopupBtn, addForm,
   popupImage,
   cardsTable,
   validationConfig } from '../components/constants.js';

//валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.enableValidation();
const cardFormValidation = new FormValidator(validationConfig, addForm);
cardFormValidation.enableValidation();

const openImagePopup = new PopupWithImage(popupImage);

//открытие попапа с картинкой
const handleCardClick = ({title, link}) => {
   openImagePopup.open({title, link});
};

openImagePopup.setEventListeners();

//создание списка
const cardList = new Section({
   items: initialCards,
   renderer: (data) => {
      cardList.addItem(newCard(data));
    }
}, cardsTable);

cardList.renderer();

//открытие формы редактирования
editProfilePopupBtn.addEventListener('click', function () {
   editProfileForm.open();
   profileValidation.resetValidation()
   const allInfo = userInfo.getUserInfo();
   editProfileForm.setInputValues(allInfo);
});

//открытие формы добавления карточки
addPopupBtn.addEventListener('click', function () {
   popupForm.open();
   cardFormValidation.resetValidation()
});

//редактирование профиля
const userInfo = new UserInfo({nameSelector: profileName, bioSelector: profileBio});

const editProfileForm = new PopupWithForm(profilePopup, ({name, bio}) => {
   userInfo.setUserInfo({name, bio})
})

editProfileForm.setEventListeners();

//создание новой карточки
function newCard(item) {
   const card = new Card(item, '.template', handleCardClick);

   return card.addCard();
}

//*/добавление карточки
const popupForm = new PopupWithForm(addPopup, (item) => {
         cardList.addItem(newCard(item));
      }
);

popupForm.setEventListeners();