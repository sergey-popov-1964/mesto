import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector('.form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
  }

  open(data) {
    super.open();
    this.data = data;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => this.submitHandler(this.data));
  }

}
