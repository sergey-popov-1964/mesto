import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
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



