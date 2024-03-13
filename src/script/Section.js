export default class Section {
    constructor({items,renderer}, containerSelector){
        this._rendererItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear(){
        this._container.innerHTML = '';
      }
      
    addItem(element){
        this._container.append(element);
    }

    prependItem(element){
        this._container.prepend(element)
        }

    renderItems() {
    this.clear();
    this._rendererItems.forEach(item => {
    this._renderer(item);
    })
    };


}
