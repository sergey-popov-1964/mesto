export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = document.querySelector(popupSelector).querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Функция открытия попапа с формой
  open() {
    this._popupElement.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  };

  // Функция закрытия попапа с формой
  close() {
    this._popupElement.classList.remove('popup_active');
     document.removeEventListener('keydown', this._handleEscClose);
  };

  setEventListeners() {
    // Закрытие попапов при клике на крестик
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });

    // Закрытие попапов при клике на оверлей
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}

