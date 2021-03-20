export default class Api {
  constructor(baseUrl, config) {
    this._urlCards = baseUrl + '/cards';
    this._urlUserInfo = baseUrl + '/users/me';
    this._urlUserAvatar = baseUrl + '/users/me/avatar';
    this._config = config;
  }

  getInitialCards() {
    return fetch(this._urlCards, {
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
    return fetch(this._urlUserInfo, {
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
    return fetch(this._urlUserInfo, {
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
    return fetch(this._urlUserAvatar, {
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
    return fetch(this._urlCards, {
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

  deleteCards(url, data) {
    return fetch(url, {
      method: 'DELETE',
      headers: this._config,
      body: JSON.stringify(data)
  })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(() => console.log(`Ошибка при удалении карточки`));
  }
}
