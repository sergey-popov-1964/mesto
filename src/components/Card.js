export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteCard, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardID = data._id;
    this._ownerID = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._likes = Array.from(data.likes).map(function (item) {
      return item._id;
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  _handleLikeIcon() {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_like');
  };

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => {
      // this._handleLikeIcon();
      this._handleLikeClick(this._element, this._cardID);
    });

    if (this._element.querySelector('.element__trash')) {
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._handleDeleteCard(this._element, this._cardID);
      });
    }
    this._element.querySelector('.element__img').addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this._handleCardClick(this._name, this._link);
      }
    });
  }

  generateMesto(userId) {
    this._element = this._getTemplate();
    if (this._ownerID !== userId) {
      this._element.querySelector('.element__trash').remove()
    }
    this._setEventListeners();
    this._element.querySelector('.element__img').style.backgroundImage = "url(" + this._link + ")";
    this._element.querySelector('.element__text').textContent = this._name;
    if (this._likes.length > 0) {
      this._element.querySelector('.element__counter-like').textContent = this._likes.length.toString();
      if (this._likes.includes(userId)) {
        this._element.querySelector('.element__heart').classList.add('element__heart_like');
      }
    }
    return this._element;
  }
}
