import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector('.form');
   }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => this.submitHandler(this.data));
  }

  open(data) {
    super.open();
    this.data = data;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

}
