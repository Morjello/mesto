const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
};

const isValid = (formElement, input) => {
   if (!input.validity.valid) {
      showInputError(formElement, input, input.validationMessage);
   } else {
      hideInputError(formElement, input);
   }
};

const showInputError = (formElement, input, errorMessage) => {
   const error = formElement.querySelector(`.${input.id}-error`);
   input.classList.add('popup__input_type_error');
   error.textContent = errorMessage;
   error.classList.add('popup__error_visible');
}

const hideInputError = (formElement, input) => {
   const error = formElement.querySelector(`.${input.id}-error`);
   input.classList.remove('popup__input_type_error');
   error.classList.remove('popup__error_visible');
   error.textContent = '';
};

const toggleButtonState = (inputs, button) => {
   const hasInvalidInput = inputs.some(input => !input.validity.valid);
   if (hasInvalidInput) {
      button.classList.add('popup__button_disabled');
      button.classList.remove('popup__button_active');
   } else {
      button.classList.remove('popup__button_disabled');
      button.classList.add('popup__button_active');
   }
}

const handleSetValidate = (formElement) => {
   const inputs = Array.from(formElement.querySelectorAll(`.popup__input`));
   const button = formElement.querySelector('.popup__button');
   inputs.forEach((input) => {
      input.addEventListener('input', () => {
         isValid(formElement, input);
         toggleButtonState(inputs, button);
      });
   });
};

const enableValidation = () => {
   const formList = Array.from(document.querySelectorAll('.popup__form'));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (e) => {
         e.preventDefault();
      });
      handleSetValidate(formElement);
   });
};

enableValidation(validationConfig);
