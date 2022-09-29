const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
};

export default class FormValidator {
   constructor(data) {
      this._form = data.form;
      this._input = data.input;
      this._button = data.nutton
      this.config = data.config;
   };

   _isValid(form, input, config) {
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

   _setButtonActive(button, config) {
      button.classList.remove(config.inactiveButtonClass);
      button.removeAttribute('disabled', false);
   };

   _setButtonDisabled(button, config) {
      button.classList.add(config.inactiveButtonClass);
      button.setAttribute('disabled', true);
   };

   _toggleButtonState() {
      const hasInvalidInput = inputs.some(input => !input.validity.valid);
      if (hasInvalidInput) {
         setButtonDisabled(button, config);
      } else {
         setButtonActive(button, config);
      }
   };

   _handleSetValidate() {
      const inputs = Array.from(form.querySelectorAll(config.inputSelector));
      const button = form.querySelector(config.submitButtonSelector);
      inputs.forEach((input) => {
         input.addEventListener('input', () => {
            isValid(form, input, config);
            toggleButtonState(inputs, button, config);
         });
      });
   };

   enableValidation() {
      const formList = Array.from(document.querySelectorAll(config.formSelector));
      formList.forEach((form) => {
         form.addEventListener('submit', (e) => {
            e.preventDefault();
         });
         handleSetValidate(form, config);
      });
   };
}

enableValidation(validationConfig);
