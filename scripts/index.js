// POPUP
const popup = document.querySelector('.popup');
const openEditPopup = document.querySelector('.profile__edit-button');
const closePopup = document.querySelector('.popup__close-icon');
const nameInput = document.querySelector('.popup__input_type_name');
const bioInput = document.querySelector('.popup__input_type_bio');
const profileName = document.querySelector('.profile__title');
const profileBio = document.querySelector('.profile__text');
const formElement = document.querySelector('.popup__form');
// POPUP-ADD
const addPopup = document.querySelector('.popup-add');
const openAddPopup = document.querySelector('.profile__add-button');
const closeAddPopup = document.querySelector('.popup-add__close-icon');
const input = document.querySelector('.popup-add__input');
const titleInput = document.querySelector('.popup-add__input_type_title');
const linkInput = document.querySelector('.popup-add__input_type_link');
const addFormElement = document.querySelector('.popup-add__form');
const cardsTable = document.querySelector('.cards__table');
// POPUP-IMAGE
const popupImage = document.querySelector('.popup-image');
const popupImageClose = document.querySelector('.popup-image__close');
const popupImageOpen = document.querySelector('.cards__popup-image');
const popupImageText = document.querySelector('.popup-image__text');
const popupImageImage = document.querySelector('.popup-image__image');
const cardsText = document.querySelector('.cards__text');
const cardsImage = document.querySelector('.cards__image');

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

// POPUP
const togglePopup = function () {
   if (!popup.classList.contains('popup_opened')) {
      nameInput.value = profileName.textContent
      bioInput.value = profileBio.textContent
   }
   popup.classList.toggle('popup_opened')
}

function formSubmitHandler(e) {
   e.preventDefault()
   profileName.textContent = nameInput.value
   profileBio.textContent = bioInput.value
   togglePopup()
}

// POPUP-ADD
const toggleaddPopup = function () {
   !addPopup.classList.contains('popup-add_opened');
   addPopup.classList.toggle('popup-add_opened');
}


function likeHandlerfunction(e) {
   e.target.classList.toggle('cards__heart_active');
};

function cardsDeleteHandler(e) {
   const cardDelete = e.target.closest('.cards__card');
   cardDelete.remove();
};

function openPopupImage(item) {
   return function () {
      popupImage.classList.add('popup-image_opened');
      popupImageText.textContent = item.title;
      popupImageImage.src = item.link;
      console.log(123)
   }

}

// CARDS
function addFormSubmitHandler(e) {
   e.preventDefault()
   addCard({
      title: titleInput.value,
      link: linkInput.value
   });
   titleInput.value = '';
   linkInput.value = '';
   toggleaddPopup()
};

function addCard(item) {
   const cardTemplate = document.querySelector('.template').content;
   const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
   cardElement.querySelector('.cards__text').textContent = item.title;
   cardElement.querySelector('img').src = item.link;
   cardElement.querySelector('.cards__heart').addEventListener('click', likeHandlerfunction);
   cardElement.querySelector('.cards__delete').addEventListener('click', cardsDeleteHandler);
   cardElement.querySelector('.cards__popup-image').addEventListener('click', openPopupImage(item));
   cardsTable.prepend(cardElement);
}

function closePopupImage() {
   popupImage.classList.toggle('popup-image_opened');
   console.log(123)
}

initialCards.forEach(addCard);

// POPUP-IMAGE 
openEditPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
openAddPopup.addEventListener('click', toggleaddPopup);
closeAddPopup.addEventListener('click', toggleaddPopup);
addFormElement.addEventListener('submit', addFormSubmitHandler);
popupImageClose.addEventListener('click', closePopupImage);