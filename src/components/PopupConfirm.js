import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
   }

  open(cardElement, cardID) {
    super.open();
    this.cardElement = cardElement;
    this.cardID = cardID;
    }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => this.submitHandler(this.cardElement, this.cardID));
  }

}
