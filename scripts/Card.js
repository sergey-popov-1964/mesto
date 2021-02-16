import { zoomImageImg, zoomImageText, openPopup, popupZoomImage } from './index.js';

class Card {
  constructor(mestoValue) {
    this._name = mestoValue.name;
    this._link = mestoValue.link;
  }

  _getTemplate() {
    const mestoElement = document
      .querySelector('.element-mesto')
      .content
      .cloneNode(true);

    return mestoElement;
  }

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

  _handleLikeIcon() {
        this._element.querySelector('.element__heart').classList.toggle('element__heart_like');
  };

  _handleDeleteCard() {
    this._element.querySelector('.element').remove();
  };

  _handlePreviewPicture() {
    zoomImageImg.setAttribute("src", this._link);
    zoomImageText.textContent = this._name;
    zoomImageImg.setAttribute("alt", this._name);
    openPopup(popupZoomImage);
  };

  generateMesto() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__img').style.backgroundImage = "url(" + this._link + ")";
    this._element.querySelector('.element__text').textContent = this._name;
     return this._element;
  }
}

export default Card;
