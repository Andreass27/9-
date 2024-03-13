import Popup from './Popup.js';
export default class PopupWithAvatar extends Popup{
    constructor({popupSelector, handleFormSubmit}) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
     
    }
    open(element, remove) {
      super.open()
      this._id = element 
      this.remove = remove 
    }
  
    setEventListeners() {
      super.setEventListeners()
      this._popup.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._id, this.remove)
      })
    }
  }