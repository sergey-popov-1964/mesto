import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector('.form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => this.submitHandler(this._getInputValues()));
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues() {
    const formData = {};
    this._inputList.forEach(input => formData[input.name] = input.value);
    return formData;
  }
}
