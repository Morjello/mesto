import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popup.querySelector('.popup-image__photo');
        this._imageTitle = this._popup.querySelector('.popup-image__text');
    }

    //передаем ссылку и название карточки
    open({title, link}) {
        super.open();
        this._imageElement.src = link;
        this._imageElement.alt = title;
        this._imageTitle.textContent = title;
    }
}