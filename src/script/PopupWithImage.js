import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__image');
    this._imgName = this._popup.querySelector('.popup__imgName');
  } 
 open(name,link){
     super.open()
     this._image.setAttribute('alt',name);
     this._imgName.textContent = name;
     this._image.setAttribute('src',link);

 }
 }
 
