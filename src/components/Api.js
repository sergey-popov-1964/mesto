export default class Api {
  constructor(baseUrl, config) {
    this._urlCards = baseUrl + '/cards';
    this._urlUserInfo = baseUrl + '/users/me';
    this._urlUserAvatar = baseUrl + '/users/me/avatar';
    this._config = config;
  }

  getInitialCards() {
    return fetch(this._urlCards, this._config)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialUserInfo() {
    return fetch(this._urlUserInfo, this._config)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setUserInfo(method, headers, body) {
    return fetch(this._urlUserInfo, {method, headers, body})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setUserAvatar(method, headers, body) {
    return fetch(this._urlUserAvatar, {method, headers, body})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setCards(method, headers, body) {
    return fetch(this._urlCards, {method, headers, body})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCards(url, method, headers, body) {
    return fetch(url, {method, headers, body})
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}
