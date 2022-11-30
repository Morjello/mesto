class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._header = options.headers;
    }

    _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfileInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._header
      })
      .then((res) => this._getResponseData(res))
      .catch((err) => Promise.reject(err))
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        headers: this._header
      })
      .then((res) => this._getResponseData(res))
      .catch((err) => Promise.reject(err))
  }

  editProfileInfo(user) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._header,
        body: JSON.stringify({
          name: user.name,
          about: user.bio
        })
      })
      .then((res) => this._getResponseData(res))
      .catch((err) => Promise.reject(err))
  }

  addNewCard(card) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._header,
        body: JSON.stringify({
          name: card.title,
          link: card.link
        })
      })
      .then((res) => this._getResponseData(res))
      .catch((err) => Promise.reject(err))
  };

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._header,
      })
    .then((res) => this._getResponseData(res))
    .catch((err) => Promise.reject(err))
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._header,
      })
    .then((res) => this._getResponseData(res))
    .catch((err) => Promise.reject(err))
  };

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._header,
      })
    .then((res) => this._getResponseData(res))
    .catch((err) => Promise.reject(err))
  };

  editUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => this._getResponseData(res))
    .catch((err) => Promise.reject(err))
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '8cd6391f-276f-4623-87db-26168ea0dc10',
    'Content-Type': 'application/json'
  }
});