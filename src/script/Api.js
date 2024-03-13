export default class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
  

    _checkFetch(res) {
        if (res.ok) {
          return res.json();
        }
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
  

    getUserData() { 
      return fetch(this.baseUrl + '/users/me', {
        headers: this.headers
        })
        .then(res => {
         return this._checkFetch(res)
        })
    }
  

    getCards() { 
      return fetch(this.baseUrl + '/cards', {
        headers: this.headers
      })
      .then(res => {
        return this._checkFetch(res)
      })
    }
  

    patchUserData(name, about) { 
      return fetch(this.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => {
        return this._checkFetch(res)
      })
    }
  

    postCard(nameCard, linkCard) { 
      return fetch(this.baseUrl + '/cards', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: nameCard,
          link: linkCard
        })
      })
      .then(res => {
        return this._checkFetch(res)
      })
    }
  

    deleteCard(cardId) {
      return fetch(this.baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        return this._checkFetch(res)
      })
    }
  

    addLike(cardId) {
      return fetch(this.baseUrl + '/cards/likes/' + cardId, {
        method: 'PUT',
        headers: this.headers
      })
      .then(res => {
        return this._checkFetch(res)
      })
    }
  

    deleteLike(cardId) {
      return fetch(this.baseUrl + '/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        return this._checkFetch(res)
      })
    }
  
    
    patchAvatar(avatar) { 
      return fetch(this.baseUrl + '/users/me/avatar',{
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(res => {
        return this._checkFetch(res)
      })
    }
  }
  