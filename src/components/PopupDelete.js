import {Popup} from './Popup.js';
export class PopupDelete extends Popup {
    constructor (popupSelector, handleSureCardDelete) {
        super(popupSelector);
        this._handleSureCardDelete = handleSureCardDelete;
        this._button = this._popup.querySelector('.popup__button');
    }

    open(card) {
        this._card = card;
        super.open();
    }

    setEventListeners() {
        this._button.addEventListener('click', () => {
            this._handleSureCardDelete(this._card);
        })
        super.setEventListeners();
    }
}