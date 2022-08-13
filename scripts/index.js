const popup = document.querySelector('.popup')
const openPopup = document.querySelector('.profile__edit-button_open-popup')
const closeIcon = document.querySelector('.popup__close-icon')

console.log(popup);
console.log(openPopup);
console.log(closeIcon);

const togglePopup = function () {
   popup.classList.toggle('popup_opened')
}

openPopup.addEventListener('click', togglePopup)
closeIcon.addEventListener('click', togglePopup)


const formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
   evt.preventDefault();

   const nameInput = document.querySelector('.popup__name');
   const bioInput = document.querySelector('.popup__bio');

   const profileName = document.querySelector('.profile__title');
   const profileBio = document.querySelector('.profile__text');

   profileName.textContent = nameInput.value;
   profileBio.textContent = bioInput.value;

   togglePopup()
}


formElement.addEventListener('submit', formSubmitHandler);