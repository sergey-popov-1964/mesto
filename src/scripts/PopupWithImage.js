import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
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

