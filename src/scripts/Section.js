export default class Section {
  constructor({data, renderer}, itemSelector) {
    this._items = data  // Объект карточки
    this._renderer = renderer; //  функция createCard, возвращающая созданную карточку
    this._itemSelector = document.querySelector(itemSelector); // Селектор куда вставляется карточка
  }

  // Добавление новой карточки в DOM
  addItem(card) {
   this._itemSelector.prepend(card);
  }

//Добавление в DOM первоначального массива карточек
  addCardsToDom() {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

}

