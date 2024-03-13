export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
}


_handleEscClose(e){
    if (e.key === 'Escape'){
        this.close()
    }
}


close(){
    this._popup.classList.remove('popup__open');
    document.removeEventListener('keydown', this._handleEscClose);

}


open(){
    this._popup.classList.add('popup__open');
    document.addEventListener('keydown',this._handleEscClose)
}


setEventListeners() {
  this._popup.addEventListener('mousedown', (e) => {  
    if(e.target.classList.contains('popup__open') || e.target.classList.contains('popup__close')) {
      this.close()
    }
  })
}
}