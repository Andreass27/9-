import '../vendor/index.css';
import './script/const.js';
import Card from './script/Card.js';
import PopupWithForm from './script/PopupWithForm.js';
import PopupWithImage from './script/PopupWithImage.js';
import Section from './script/Section.js';
import UserInfo from './script/UserInfo.js';
import {validationData} from'../src/script/validationData.js';
import FormValidator from './script/FormValidator.js';
import {addCardsForm,jobInput,profileEditForm,nameInput,profileEditButton,profileAddButton,avatar,avatarForm,} from './script/const.js'
import Api from './script/Api.js';
import PopupWithAvatar from './script/PopupWithAvatar.js'
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: '37a57185-a3c1-401e-aba8-ce2242497099',
    'Content-Type': 'application/json'
  }
});

const editProfileValidity = new FormValidator(validationData, profileEditForm) 
const addCardFormValidity = new FormValidator(validationData, addCardsForm) 
const avatarFormValidity = new FormValidator(validationData, avatarForm) 
const openBigimage = new PopupWithImage('.popup_type_bigImage') 
const userInfoPopup = new UserInfo('.profile__name', '.profile__researcher', '.profile__image');
openBigimage.setEventListeners();

const openEditPopup = new PopupWithForm({ 
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (input) => {
    api.patchUserData(input.profile_name, input.profile_researcher) 
    .then(()=> {
      userInfoPopup.setUserInfo(input.profile_name, input.profile_researcher),
      openEditPopup.buttonLoading(false),
      openEditPopup.close()})
    .catch((err)=> console.log(err))
    .finally(()=> openEditPopup.buttonLoading(true))
  }
})
openEditPopup.setEventListeners();


const changeAvatarPopup = new PopupWithForm({ 
  popupSelector: '.popup__avatar',
  handleFormSubmit: (input) => {
    userInfoPopup.setAvatar(input.avatarUrl)
    api.patchAvatar(input.avatarUrl) 
    .then(()=> {
      userInfoPopup.setAvatar(input.avatarUrl),
      changeAvatarPopup.buttonLoading(false),
      changeAvatarPopup.close()
    })
    .catch((err)=> console.log(err))
    .finally(()=> changeAvatarPopup.buttonLoading(true))
  }
})
changeAvatarPopup.setEventListeners();


const openDeletePopup = new PopupWithAvatar({
  popupSelector:'.popup__delete_card', 
  handleFormSubmit: (id, remove) => { 
  api.deleteCard(id)
  .then(()=> {
    remove()
    openDeletePopup.close()
  })
  .catch((err) => console.log(err))
}})

openDeletePopup.setEventListeners()


function handlerLikeCard(card) { 
  api.addLike(card.getId())
    .then(data => {
      card.setLikesInfo(data)})
    .catch((err)=> console.log(err))
}

function handlerDeleteLike(card) { 
  api.deleteLike(card.getId())
    .then(data => card.setLikesInfo(data))
    .catch((err)=> console.log(err))
}

const createCard = ( 
  name,
  link, 
  selector,
  likes,
  handleDeleteClick, 
  userId, 
  owner, 
  id, 
  handlerLikes,
  handlerDislikes
  ) => {

 const card = new Card(name, link, selector, () => {
  openBigimage.open(name, link);
 }, likes,handleDeleteClick,userId, owner, id, ()=>{handlerLikeCard(card)}, ()=>{handlerDeleteLike(card)})
 const cardElement = card.renderCard()
 return cardElement
}


Promise.all([api.getUserData(), api.getCards()])
.then(([ userData, cards ]) => {
  userInfoPopup.setUserInfo(userData.name, userData.about)
  userInfoPopup.setAvatar(userData.avatar)
  const renderСards = new Section({ 
  items: cards,
  renderer: (item) => {
      const card = createCard(item.name, item.link, '#card__template', item.likes, (...args)=>{openDeletePopup.open(...args)}, userData._id, item.owner._id, item._id,)
      renderСards.addItem(card);
    }
  },'.elements');
  renderСards.renderItems();


  const addCard = new PopupWithForm({
    popupSelector: '.popup_type_card-add',
    handleFormSubmit: (item) => {
      api.postCard(item.addFormName, item.addFormUrl)
      .then((res) => {
        const card = createCard(res.name, res.link, '#card__template', res.likes, (...args)=>{openDeletePopup.open(...args)}, userData._id, res.owner._id, res._id)
        renderСards.prependItem(card),
        addCard.buttonLoading(false),
        addCard.close()
      })
      .catch((err)=> console.log(err))
      .finally(()=> addCard.buttonLoading(true))
    }
  })
  addCard.setEventListeners()


  profileAddButton.addEventListener('click', function() {
    addCardFormValidity.resetInputError()
    addCard.open()
    addCard.buttonLoading(false)
  })
})


avatar.addEventListener('click', () => { 
  avatarFormValidity.resetInputError()
  changeAvatarPopup.open()
  changeAvatarPopup.buttonLoading(false)
})


profileEditButton.addEventListener('click', function() { 
  const userInfo = userInfoPopup.getUserInfo();
  nameInput.value = userInfo.profileName;
  jobInput.value = userInfo.profileResearcher;
  editProfileValidity.resetInputError()
  openEditPopup.open()
  openEditPopup.buttonLoading(false)
});


editProfileValidity.enableValidation()
addCardFormValidity.enableValidation()
avatarFormValidity.enableValidation()