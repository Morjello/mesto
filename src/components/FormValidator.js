export class FormValidator {
   constructor(validationConfig, formElement) {
      this._validationConfig = validationConfig;
      this._formElement = formElement;
      this._inputs = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
      this._forms = Array.from(document.querySelectorAll(this._validationConfig.formSelector));
      this._button = formElement.querySelector(this._validationConfig.submitButtonSelector);
   };

   _isValid(input) {
      if (!input.validity.valid) {
         this._showInputError(input);
      } else {
         this._hideInputError(input);
      }
   };

   _showInputError(input) {
      const error = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.add(this._validationConfig.inputErrorClass);
      error.textContent = input.validationMessage;
      error.classList.add(this._validationConfig.errorClass);
   }

   _hideInputError(input) {
      const error = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.remove(this._validationConfig.inputErrorClass);
      error.classList.remove(this._validationConfig.errorClass);
      error.textContent = '';
   }

   _setButtonDisabled() {
      this._button.classList.add(this._validationConfig.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
   };

   _setButtonActive() {
      this._button.classList.remove(this._validationConfig.inactiveButtonClass);
      this._button.removeAttribute('disabled', false);
   };

   _toggleButtonState() {
      const hasInvalidInput = this._inputs.some(input => !input.validity.valid);
      if (hasInvalidInput) {
         this._setButtonDisabled();
      } else {
         this._setButtonActive();
      }
   };

   _handleSetValidate() {
      this._inputs.forEach((input) => {
         input.addEventListener('input', () => {
            this._isValid(input);
            this._toggleButtonState();
         });
      });
   };

   resetValidation() {
      this._inputs.forEach((input) => {
        this._hideInputError(input);
        this._setButtonDisabled();
      });
    };

   enableValidation () {
      this._handleSetValidate();
   };
}
