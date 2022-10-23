import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputsValues = {};
        this._inputs.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        })
        
        return this._inputsValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();

        })
    }

    setInputValues(item) {
        this._inputs.forEach(input => {
            input.value = item[input.name];
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}