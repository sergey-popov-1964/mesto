export  default  class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupCloseButton = document.querySelector(popupSelector).querySelector('.popup__close')
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._popupSelector.classList.remove('popup_active');
      this.close();
    }
  }

  // Функция открытия попапа с формой
  open() {
    this._popupSelector.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  };

  // Функция закрытия попапа с формой
  close() {
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _setEventListeners() {
    // Закрытие попапов при клике на крестик
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });

    // Закрытие попапов при клике на оверлей
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }
}

