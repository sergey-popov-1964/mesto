import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImg = this._popupElement.querySelector('.zoom-img__img');
    this._previewText = this._popupElement.querySelector('.zoom-img__text');
  }

  open(name, link) {
    super.open();
    this._previewImg.src = link;
    this._previewImg.alt = name;
    this._previewText.textContent = name;
  }
}

