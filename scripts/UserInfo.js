class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userInfoSelector = document.querySelector(userInfoSelector);
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
