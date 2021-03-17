export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteCard) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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
      this._handleLikeIcon();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteCard(this._element);
    });

    this._element.querySelector('.element__img').addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this._handleCardClick(this._name, this._link);
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
