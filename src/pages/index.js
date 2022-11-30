import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupDelete } from '../components/PopupDelete';
import { api } from '../components/Api.js';
import {
   profilePopupBtn,
   profileForm,
   popupAddBtn,
   addForm,
   editAvatarBtn,
   popupAvatarForm,
   validationConfig } from '../components/constants.js';

//валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.enableValidation();
const cardFormValidation = new FormValidator(validationConfig, addForm);
cardFormValidation.enableValidation();
const avatarValidation = new FormValidator(validationConfig, popupAvatarForm)
avatarValidation.enableValidation();

const userInfo = new UserInfo({nameSelector: '.profile__title', bioSelector: '.profile__text', avatarSelector: '.profile__image'});

//добавление карточек в разметку
const cardList = new Section({
   renderer: (item) => {
      cardList.addItem(createNewCard(item));
    }
}, '.cards__table');

//создание списка карточек и инфо о пользователе
Promise.all([api.getProfileInfo(), api.getInitialCards()])
   .then(([data, cards]) => {
      userInfo.setAllInfo(data);
      cardList.renderer(cards);
   })
   .catch((err) => {
      console.log('Error load cards', err);
   });

//удаление карточки
const popupDeleteCard = new PopupDelete('.popup__delete', handleSureCardDelete);

const handleClickDelete = (card) => {
   popupDeleteCard.open(card);
}

popupDeleteCard.setEventListeners();

function handleSureCardDelete (card) {
   api.deleteCard(card.getCardId()).then(() => {
      card.handleCardDelete();
      popupDeleteCard.close();
   }).catch((err) => {
      console.log('Error delete card', err);
   })
};

//открытие формы редактирования
profilePopupBtn.addEventListener('click', function () {
   popupProfileForm.open();
   profileValidation.resetValidation()
   const allInfo = userInfo.getUserInfo();
   popupProfileForm.setInputValues(allInfo);
});

//редактирование профиля
const popupProfileForm = new PopupWithForm('.profile-popup', (userData) => {
   api.editProfileInfo(userData).then((data) => {
      data = userInfo.setUserInfo(userData)
   }).catch((err) => {
      console.log('Error updating profile', err);
   }).finally(() => popupProfileForm.loading(false))
})

popupProfileForm.setEventListeners();

//открытие редактирвоания аватара
editAvatarBtn.addEventListener('click', function () {
   popupAvatar.open();
   avatarValidation.resetValidation();
})

//редактирование аватарa
const popupAvatar = new PopupWithForm('.popup-avatar', (avatar) => {
   api.editUserAvatar(avatar['avatar-link']).then((avatarUrl) => {
      document.querySelector('.profile__image').src = avatarUrl.avatar;
   }).catch((err) => {
      console.log('Error updating avatar', err);
   }).finally(() => popupAvatar.loading(false))
});

popupAvatar.setEventListeners();

//открытие формы добавления карточки
popupAddBtn.addEventListener('click', function () {
   popupAddForm.open();
   cardFormValidation.resetValidation()
});

//поставить лайк
const handlePutLike = (card, cardId) => {
   api.putLike(cardId).then((res) => {
      card.setLike(res.likes)
}).catch((err) => {
   console.log('Error like', err);
})
}

//убрать лайк
const handleDeleteLike = (card, cardId) => {
   api.deleteLike(cardId).then((res) => {
      card.setLike(res.likes)
   }).catch((err) => {
      console.log('Error remove like', err);
   })
}

//создание новой карточки
function createNewCard(item) {
   const card = new Card(item,
       '.template',
         userInfo.getUserId(),
         handleCardClick,
         handlePutLike,
         handleDeleteLike,
         handleClickDelete);

   return card.addCard();
}

//добавление карточки
const popupAddForm = new PopupWithForm('.popup-add', (cardData) => {
   api.addNewCard(cardData).then((item) => {
      cardList.addItem(createNewCard(item));
   }).catch((err) => {
      console.log('Error add card', err);
   }).finally(() => popupAddForm.loading(false))
});

popupAddForm.setEventListeners();

const popupImageOpen = new PopupWithImage('.popup-image');

//открытие попапа с картинкой
const handleCardClick = ({name, link}) => {
   popupImageOpen.open({name, link});
};

popupImageOpen.setEventListeners();