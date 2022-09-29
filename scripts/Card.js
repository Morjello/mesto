const initialCards = [
   {
      title: 'Форд',
      link: 'https://images.unsplash.com/photo-1661344853432-97655cdb17bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80'
   },
   {
      title: 'Поле',
      link: 'https://images.unsplash.com/photo-1661172212114-3f9b1ba72d83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
   },
   {
      title: 'Зенит - В',
      link: 'https://images.unsplash.com/photo-1661367596997-22261c7f922d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80'
   },
   {
      title: 'Каньон',
      link: 'https://images.unsplash.com/photo-1660866837205-348b627e3909?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
   },
   {
      title: 'Храм Святой Марии в Ловере',
      link: 'https://images.unsplash.com/photo-1659389976255-eb787cefd9f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
   },
   {
      title: 'Закат',
      link: 'https://images.unsplash.com/photo-1661344662632-ac54c94c8416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1975&q=80'
   }
];

export default class Card {
   static cardTemplate = document.querySelector('.template').content;

   constructor(data, templateSelector) {
      this._title = data.title;
      this._link = data.link;
      this._templateSelector = templateSelector;
   }

   _handleCardLike(e) {
      e.target.classList.toggle('cards__heart_active');
   };

   _handleCardDelete(e) {
      const cardDelete = e.target.closest('.cards__card');
      cardDelete.remove();
   };

   _handleCardClick() {
      this._element.querySelector('.cards__image').src = this._link;
      this._element.querySelector('.cards__image').alt = this._title;
      openPopup(popupImage);
   }

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
      this._element.querySelector('.cards__image-button').addEventListener('click', this._handleCardClick.bind(this));
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

initialCards.forEach((item) => {
   const card = new Card(item, '.template');
   const cardElement = card.addCard();
   document.querySelector('.cards__table').prepend(cardElement);
});