import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../components/initialCards.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
   profilePopup, 
   editProfilePopupBtn, 
   profileName, profileBio, 
   profileForm, addPopup, 
   addPopupBtn, addForm, popupImage, 
   popupAddSaveButton, 
   cardsTable, 
   validationConfig} from '../components/constants.js';

//валидация форм
const editProfileValidation = new FormValidator(validationConfig, profileForm);
editProfileValidation.enableValidation();
const addFormValidation = new FormValidator(validationConfig, addForm);
addFormValidation.enableValidation();

const openProfilePopup = new Popup(profilePopup);
const openAddPopup = new Popup(addPopup);
const openImagePopup = new PopupWithImage(popupImage);

//открытие попапа с картинкой
const handleCardClick = ({title, link}) => {
   openImagePopup.open({title, link});
};

//создание списка
const cardList = new Section({
   items: initialCards,
   renderer: (data) => {
      const card = new Card(data, '.template', handleCardClick).addCard();
      cardList.addItem(card);
    }
}, cardsTable);

cardList.renderer();

//открытие формы редактирования
editProfilePopupBtn.addEventListener('click', function () {
   openProfilePopup.open();
   const allInfo = userInfo.getUserInfo();
   console.log(allInfo)
   editProfileForm.setInputValues(allInfo);
});

//открытие формы добавления карточки
addPopupBtn.addEventListener('click', function () {
   openAddPopup.open();
   popupAddSaveButton.setAttribute('disabled', 'disabled');
   popupAddSaveButton.classList.add('popup__button_disabled');
});

//редактирование профиля
const userInfo = new UserInfo({name: profileName, bio: profileBio});

const editProfileForm = new PopupWithForm(profilePopup, ({name, bio}) => {
   userInfo.setUserInfo({name, bio})
})

editProfileForm.setEventListeners();

//создание новой карточки
function newCard({title, link}) {
   const card = new Card({title, link}, '.template', openImagePopup.open.bind(openImagePopup));

   return card.addCard();
}

//*/добавление карточки
const popupForm = new PopupWithForm(addPopup, (item) => {
         cardList.addItem(newCard(item));
      }
);

popupForm.setEventListeners();