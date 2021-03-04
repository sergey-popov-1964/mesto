class UserInfo {
  constructor({name, info}) {
    this._userNameSelector = document.querySelector(name);
    this._userInfoSelector = document.querySelector(info);
  }

  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      info: this._userInfoSelector.textContent,
    }
  }

  setUserInfo(userName, userInfo) {
    this._userNameSelector.textContent = userName;
    this._userInfoSelector.textContent = userInfo;
  }
}

export default UserInfo;
