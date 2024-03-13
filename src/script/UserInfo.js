 export default class UserInfo{
    constructor(nameSelector,researcherSelector,avatar){
        this._name = document.querySelector(nameSelector);
        this._researcher = document.querySelector(researcherSelector);
        this._avatar = document.querySelector(avatar);
    }
    getUserInfo(){
        this._data = {};
        this._data.profileName = this._name.textContent;
        this._data.profileResearcher = this._researcher.textContent;
        return this._data;
    }
    setUserInfo(name,researcher) {
    this._name.textContent = name;
    this._researcher.textContent = researcher;

    }
    setAvatar(avatar) {
        this._avatar.setAttribute('src', avatar);

    }
}