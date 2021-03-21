export default class Api {
  constructor(baseUrl, config) {
    this._baseUrl = baseUrl;
    this._config = config;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._config,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при получении карточек`));
  }

  getInitialUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._config,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при получении профиля`));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._config,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при изменении профиля`));
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._config,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при изменении аватара`));
  }

  setCards(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._config,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при создании карточки`));
  }

  deleteCards(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._config,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при удалении карточки`));
  }

  setCardLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._config,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при установке лайка`));
  }

  deleteCardLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._config,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при удалении лайка`));
  }
}
