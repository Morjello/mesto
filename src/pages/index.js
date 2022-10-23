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
   profilePopupBtn,
   profileName, profileBio,
   profileForm, popupAdd,
   popupAddBtn, addForm,
   popupImage,
   cardsTable,
   validationConfig } from '../components/constants.js';

//валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.enableValidation();
const cardFormValidation = new FormValidator(validationConfig, addForm);
cardFormValidation.enableValidation();

const popupImageOpen = new PopupWithImage(popupImage);

//открытие попапа с картинкой
const handleCardClick = ({title, link}) => {
   popupImageOpen.open({title, link});
};

popupImageOpen.setEventListeners();

//создание списка
const cardList = new Section({
   items: initialCards,
   renderer: (data) => {
      cardList.addItem(newCard(data));
    }
}, cardsTable);

cardList.renderer();

//открытие формы редактирования
profilePopupBtn.addEventListener('click', function () {
   popupProfileForm.open();
   profileValidation.resetValidation()
   const allInfo = userInfo.getUserInfo();
   popupProfileForm.setInputValues(allInfo);
});

//открытие формы добавления карточки
popupAddBtn.addEventListener('click', function () {
   popupAddForm.open();
   cardFormValidation.resetValidation()
});

//редактирование профиля
const userInfo = new UserInfo({nameSelector: profileName, bioSelector: profileBio});

const popupProfileForm = new PopupWithForm(profilePopup, ({name, bio}) => {
   userInfo.setUserInfo({name, bio})
})

popupProfileForm.setEventListeners();

//создание новой карточки
function newCard(item) {
   const card = new Card(item, '.template', handleCardClick);

   return card.addCard();
}

//*/добавление карточки
const popupAddForm = new PopupWithForm(popupAdd, (item) => {
         cardList.addItem(newCard(item));
      }
);

popupAddForm.setEventListeners();