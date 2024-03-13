export default class Card {
  constructor(name, link, cardSelector, handleCardClick, likes, handleDeleteClick, userId, owner, id, handlerLikes, handlerDislikes) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._handleDeleteClick = handleDeleteClick
    this._userId = userId;
    this._owner = owner;
    this._id = id;
    this._handlerLikes = handlerLikes;
    this._handlerDislikes = handlerDislikes;
  }

   _getTemplate = () => {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element__template').cloneNode(true);
    return cardElement;
  }

  _likeCard = () => {
    if(this._likebutton.classList.contains('element__like_active')) {
      this._handlerDislikes()
    }
    else {
      this._handlerLikes()
    }
  }

  getId() {
    return this._id;
  }

  setLikesInfo(data) {
        this._element.querySelector('.element__like-counter').textContent = data.likes.length; 
        this._likebutton.classList.toggle('element__like_active'); 
    }

  _DeleteCardOnliOwner = () => { 
    if(this._userId === this._owner) {
      this._element.querySelector('.element__trash').classList.add('element__trash-active')
    }
  }

  removeCard() {
    this._element.remove()
  }
  

  _setEventListeners = () => {
    this._element.querySelector('.element__trash').addEventListener('click', ()=>{this._handleDeleteClick(this._id, () =>this.removeCard())})
    this._likebutton.addEventListener('click', this._likeCard);
    this._image.addEventListener('click', this._handleCardClick)

  }

  renderCard = () => {
    this._element = this._getTemplate();
    this._likebutton = this._element.querySelector('.element__like');
    this._image = this._element.querySelector('.element__img');
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._likes.length; 
    if(this._likes.find((i) => i._id == this._userId)){ 
      this._likebutton.classList.add('element__like_active');
    }
    else {
      this._likebutton.classList.remove('element__like_active');
    }
    this._DeleteCardOnliOwner()
    this._setEventListeners();
    return this._element;
  }
}