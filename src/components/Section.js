export default class Section {
  constructor({renderer}, itemSelector) {
    this._renderer = renderer; //  функция createCard, возвращающая созданную карточку
    this._itemSelector = document.querySelector(itemSelector); // Селектор куда вставляется карточка
  }

  // Добавление новой карточки в DOM
  addItem(card) {
    this._itemSelector.prepend(card);

  }

//Добавление в DOM первоначального массива карточек
  addCardsToDom(data) {
    data.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

}

