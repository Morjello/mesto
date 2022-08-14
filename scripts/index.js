const popup = document.querySelector('.popup')
const openPopup = document.querySelector('.profile__edit-button')
const closeIcon = document.querySelector('.popup__close-icon')

const nameInput = document.querySelector('.popup__input_type_name');
const bioInput = document.querySelector('.popup__input_type_bio');

const profileName = document.querySelector('.profile__title');
const profileBio = document.querySelector('.profile__text');

const formElement = document.querySelector('.popup__form');

const togglePopup = function () {
   if (!popup.classList.contains('popup_opened')) {
      nameInput.value = profileName.textContent
      bioInput.value = profileBio.textContent
   }
   popup.classList.toggle('popup_opened')
}

openPopup.addEventListener('click', togglePopup)
closeIcon.addEventListener('click', togglePopup)

function formSubmitHandler(evt) {
   evt.preventDefault()

   profileName.textContent = nameInput.value
   profileBio.textContent = bioInput.value

   togglePopup()
}

formElement.addEventListener('submit', formSubmitHandler);