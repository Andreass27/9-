import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}){
  super(popupSelector)
  this._handleFormSubmit = handleFormSubmit;
  this._inputList = this._popup.querySelectorAll('.popup__input');
  this._form = this._popup.querySelector('.popup__form');
  
  }

  
  _getInputValues() {
      this._formValue = {};
      this._inputList.forEach(input => {
          this._formValue[input.name] = input.value;
      });
      return this._formValue;
  }


  close(){
      super.close();
      this._form.reset();
  }


  buttonLoading(isLoading) {
    if(isLoading) {
      this._popup.querySelector('.popup__button').textContent = 'Сохранение'
    }
    else {
      this._popup.querySelector('.popup__button').textContent = 'Сохранить'
    }
  }
  

  setEventListeners(){
      super.setEventListeners() 
      this._popup.addEventListener('submit', (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
  };
  
  }
  
  