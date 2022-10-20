export class Popup {
   constructor(popup) {
      this._popup = popup;
   }
   //открытие попапов
   open() {
      this._popup.classList.add('popup_opened');
      this.setEventListeners();
      document.addEventListener('keydown', this._handleKeyEscape);
   };
 
   //закрытие попапов
   close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleKeyEscape);
   };

   setEventListeners() {
      this._popup.addEventListener('mousedown', (evt) => {
         if (evt.target.classList.contains('popup_opened')) {
            this.close()
            }
         if (evt.target.classList.contains('popup__close')) {
            this.close()
            }
         });
   };

   _handleKeyEscape = (e) => {
     if (e.key === 'Escape') {
         this.close();
      }
   };
}