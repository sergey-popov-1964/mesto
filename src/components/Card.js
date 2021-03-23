export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteCard, handleLikeClick, userID) {
   this._userID = userID;
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

  _setEventListeners() {
    this._elementHeart.addEventListener('click', () => {
      this._handleLikeClick(this._element, this._cardID);
    });

   // Если собственная карточка - навешиваем слушателя на корзину
    if (this._elementTrash) {
      this._elementTrash.addEventListener('click', () => {
        this._handleDeleteCard(this._element, this._cardID);
      });
    }

    this._elementImage.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this._handleCardClick(this._name, this._link);
      }
    });

  }

  generateMesto() {
    this._element = this._getTemplate();
    this._elementTrash = this._element.querySelector('.element__trash')
    this._elementImage = this._element.querySelector('.element__img');
    this._elementHeart = this._element.querySelector('.element__heart');

    if (this._ownerID !== this._userID) {
      this._elementTrash.remove()
    }
    this._setEventListeners();
    this._elementImage.style.backgroundImage = "url(" + this._link + ")";
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    // Если у карточки есть хотя бы один лайк - отображаем счетчик лайков
    if (this._likes.length > 0) {
      this._element.querySelector('.element__counter-like').textContent = this._likes.length.toString();
      // Если у карточки есть наш лайк - переводим сердце в активное состояние
      if (this._likes.includes(this._userID)) {
        this._elementHeart.classList.add('element__heart_like');
      }
    }
    return this._element;
  }
}
