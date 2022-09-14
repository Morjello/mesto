const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
};

function isValid(form, input, config) {
   const error = form.querySelector(`.${input.id}-error`);
   if (!input.validity.valid) {
      input.classList.add(config.inputErrorClass);
      error.textContent = input.validationMessage;
      error.classList.add(config.errorClass);
   } else {
      input.classList.remove(config.inputErrorClass);
      error.classList.remove(config.errorClass);
      error.textContent = '';
   }
};

function setButtonActive(button, config) {
   button.classList.remove(config.inactiveButtonClass);
   button.removeAttribute('disabled', false);
};

function setButtonDisabled(button, config) {
   button.classList.add(config.inactiveButtonClass);
   button.setAttribute('disabled', true);
};

function toggleButtonState(inputs, button, config) {
   const hasInvalidInput = inputs.some(input => !input.validity.valid);
   if (hasInvalidInput) {
      setButtonDisabled(button, config);
   } else {
      setButtonActive(button, config);
   }
};

function handleSetValidate(form, config) {
   const inputs = Array.from(form.querySelectorAll(config.inputSelector));
   const button = form.querySelector(config.submitButtonSelector);
   inputs.forEach((input) => {
      input.addEventListener('input', () => {
         isValid(form, input, config);
         toggleButtonState(inputs, button, config);
      });
   });
};

/*function resetValidation(form, config) {
   const inputs = Array.from(form.querySelectorAll(config.inputSelector));
   const button = form.querySelector(config.submitButtonSelector);
   inputs.forEach((input) => {
      input.addEventListener('input', () => {
         if (!input.validity.valid) {
            setButtonDisabled(button, config);
         }
      });
   });
}*/

function enableValidation(config) {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((form) => {
      form.addEventListener('submit', (e) => {
         e.preventDefault();
      });
      handleSetValidate(form, config);
   });
};

enableValidation(validationConfig);
