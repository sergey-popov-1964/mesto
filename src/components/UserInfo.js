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
      avatar: this._userAvatarSelector.src,

    }
  }

  setUserInfo(userName, userInfo) {
    if (userName) {
      this._userNameSelector.textContent = userName;
    }
    if (userInfo) {
      this._userInfoSelector.textContent = userInfo;
    }
  }

  setUserAvatar(userAvatar) {
    if (userAvatar) {
      this._userAvatarSelector.src = userAvatar;
    }
  }

}
