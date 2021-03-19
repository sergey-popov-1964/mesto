import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector('.form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
  }

  open(cardElement, cardID) {
    super.open();
    this.cardElement = cardElement;
    this.cardID = cardID;
    }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => this.submitHandler(this.cardElement, this.cardID));
  }

}
