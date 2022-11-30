import { api } from "./Api";

export class Card {
   constructor(data, templateSelector, user, handleCardClick, handlePutLike, handleDeleteLike, handleClickDelete) {
      this._name = data.name;
      this._link = data.link;
      this._like = data.likes;
      this._cardId = data._id;
      this._userId = user;
      this._ownerId = data.owner;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handlePutLike = handlePutLike;
      this._handleDeleteLike = handleDeleteLike;
      this._handleClickDelete = handleClickDelete;
   }

   _handleCardLike() {
      if (!this.likeBtn.classList.contains('cards__heart_active')) {
         this._handlePutLike(this, this._cardId);
      } else {
         this._handleDeleteLike(this, this._cardId);
      }
   };

   setLike(data) {
      this._element.querySelector('.cards__likes').textContent = data.length;
      this.likeBtn.classList.toggle('cards__heart_active');
   }

   handleCardDelete() {
      this._element.remove();
      this._element = null;
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
      this.likeBtn = this._element.querySelector('.cards__heart');
      this.likeBtn.addEventListener('click',  () => {
         this._handleCardLike();
      });
      this._element.querySelector('.cards__delete').addEventListener('click', () => {
         this._handleClickDelete(this);
      });
      this._element.querySelector('.cards__image-button').addEventListener('click', () => {
         this._handleCardClick({name: this._name, link: this._link});
      });
   };

   addCard() {
      this._element = this._createCard();
      this._setEventListeners();
      this._element.querySelector('.cards__text').textContent = this._name;
      this._element.querySelector('.cards__image').src = this._link;
      this._element.querySelector('.cards__image').alt = this._name;
      this._element.querySelector('.cards__likes').textContent = this._like.length;

      if (this._ownerId._id != this._userId) {
         this._element.querySelector('.cards__delete').remove();
      }

      if (this._like.some((user) => {
         return user._id === this._userId;
      })) {
         this.likeBtn.classList.add('cards__heart_active');
      }

      return this._element;
   };

   getCardId() {
      return this._cardId;
    }
};