export class Card {
   constructor(data, templateSelector, handleCardClick) {
      this._title = data.title;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
   }

   _handleCardLike(e) {
      e.target.classList.toggle('cards__heart_active');
   };

   _handleCardDelete() {
      this._element.remove();
   };

   _createCard() {
      const cardElement = document
         .querySelector(this._templateSelector)
         .content
         .querySelector('.cards__card')
         .cloneNode(true);

      return cardElement;
   };

   _setEventListeners() {
      this._element.querySelector('.cards__heart').addEventListener('click', this._handleCardLike.bind(this));
      this._element.querySelector('.cards__delete').addEventListener('click', this._handleCardDelete.bind(this));
      this._element.querySelector('.cards__image-button').addEventListener('click', () => {
         this._handleCardClick({title: this._title, link: this._link});
      });
   };

   addCard() {
      this._element = this._createCard();
      this._setEventListeners();
      this._element.querySelector('.cards__text').textContent = this._title;
      this._element.querySelector('.cards__image').src = this._link;
      this._element.querySelector('.cards__image').alt = this._title;

      return this._element;
   };
};