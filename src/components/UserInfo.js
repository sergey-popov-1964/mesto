export default class UserInfo {
  constructor(name, info, avatar) {
    this._userNameSelector = document.querySelector(name);
    this._userInfoSelector = document.querySelector(info);
    this._userAvatarSelector = document.querySelector(avatar);
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

  getUserAvatar() {
    return {
      avatar: this._userAvatarSelector.src,
    }
  }

  setUserAvatar(userAvatar) {
    this._userAvatarSelector.src = userAvatar;
  }

}
