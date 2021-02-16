import {
  openPopup
} from './index.js';

class Card {
  constructor(mestoValue) {
    this._name = mestoValue.name;
    this._link = mestoValue.link;
    this._popupZoomImage = document.querySelector('.popup-image');
    this._zoomImageImg = this._popupZoomImage.querySelector('.zoom-img__img');
    this._zoomImageText = this._popupZoomImage.querySelector('.zoom-img__text');
  }

  _getTemplate() {
    const mestoElement = document
      .querySelector('.element-mesto')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return mestoElement;
  }

  _handleLikeIcon() {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_like');
  };

  _handleDeleteCard() {
    this._element.remove();
  };

  _handlePreviewPicture() {
    this._zoomImageImg.src = this._link;
    this._zoomImageText.textContent = this._name;
    this._zoomImageImg.alt = this._name;
    openPopup(this._popupZoomImage);
  };

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.element__img').addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this._handlePreviewPicture();
      }
    });

  }

  generateMesto() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__img').style.backgroundImage = "url(" + this._link + ")";
    this._element.querySelector('.element__text').textContent = this._name;
    return this._element;
  }
}

export default Card;
