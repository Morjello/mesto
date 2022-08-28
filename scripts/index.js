const closeButtons = document.querySelectorAll('.popup__close-icon');
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
const cardsTable = document.querySelector('.cards__table');
const popupImage = document.querySelector('.popup-image');
const popupImageOpenBtn = document.querySelector('.cards__image-button');
const popupImageText = document.querySelector('.popup-image__text');
const popupImagePhoto = document.querySelector('.popup-image__photo');
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

function openPopup(popup) {
   popup.classList.add('popup_opened');
};

function closePopup(popup) {
   popup.classList.remove('popup_opened');
};

closeButtons.forEach((button) => {
   const popup = button.closest('.popup');
   button.addEventListener('click', () => closePopup(popup));
});

editProfilePopupBtn.addEventListener('click', function () {
   openPopup(profilePopup);
   nameInput.value = profileName.textContent;
   bioInput.value = profileBio.textContent;
});

addPopupBtn.addEventListener('click', function () {
   openPopup(addPopup);
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

function handleLikeCard(e) {
   e.target.classList.toggle('cards__heart_active');
};

function handleDeleteCard(e) {
   const cardDelete = e.target.closest('.cards__card');
   cardDelete.remove();
};

function openPopupImage(e) {
   const cardsImage = e.target.closest('.cards__image');
   const imgSrc = cardsImage.getAttribute('src');
   const imgAlt = cardsImage.getAttribute('alt');
   popupImagePhoto.setAttribute('src', imgSrc);
   popupImagePhoto.setAttribute('alt', imgAlt);
   popupImageText.textContent = imgAlt;
   openPopup(popupImage);
};

function createCard(item) {
   const cardTemplate = document.querySelector('.template').content;
   const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
   const cardImage = cardElement.querySelector('.cards__image')
   cardImage.src = item.link;
   cardImage.alt = item.title;
   cardElement.querySelector('.cards__text').textContent = item.title;
   cardElement.querySelector('.cards__heart').addEventListener('click', handleLikeCard);
   cardElement.querySelector('.cards__delete').addEventListener('click', handleDeleteCard);
   cardElement.querySelector('.cards__image-button').addEventListener('click', openPopupImage);
   return cardElement;
};

function addCard(item) {
   const cardElement = createCard(item)
   cardsTable.prepend(cardElement);
};

initialCards.forEach(addCard);

profileForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);