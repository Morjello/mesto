export class FormValidator {
   constructor(validationConfig, formElement) {
      this._validationConfig = validationConfig;
      this._formElement = formElement;
      this._inputs = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
      this._forms = Array.from(document.querySelectorAll(this._validationConfig.formSelector));
      this._button = formElement.querySelector(this._validationConfig.submitButtonSelector);
   };

   _isValid(input) {
      const error = this._formElement.querySelector(`.${input.id}-error`);
      if (!input.validity.valid) {
         input.classList.add(this._validationConfig.inputErrorClass);
         error.textContent = input.validationMessage;
         error.classList.add(this._validationConfig.errorClass);
      } else {
         input.classList.remove(this._validationConfig.inputErrorClass);
         error.classList.remove(this._validationConfig.errorClass);
         error.textContent = '';
      }
   };

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
            this._toggleButtonState( );
         });
      });
   };

   enableValidation () {
      this._handleSetValidate();
   };
}
