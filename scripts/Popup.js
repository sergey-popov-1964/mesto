class Popup {
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

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this._formElement = this._popupSelector.querySelector('.form');
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector.addEventListener('submit', this.submitHandler);
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  // _getInputValues() {
  //   console.log(this._formElement)
  //   const inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
  //   inputList.forEach((inputElement) => {
  //   })
  // }

}



class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    this._popupSelector.querySelector('.zoom-img__img').src = link;
    this._popupSelector.querySelector('.zoom-img__img').alt = name;
    this._popupSelector.querySelector('.zoom-img__text').textContent = name;
  }
}


  export {Popup, PopupWithImage, PopupWithForm};
