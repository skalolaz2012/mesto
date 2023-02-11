class UserInfo {
  constructor(authorNameSelector, aboutSelector, avatarSelector) {
    this._authorName = document.querySelector(authorNameSelector)
    this._about = document.querySelector(aboutSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._authorName.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo({ name, about, avatar, id }) {
    this.userInfoFromForm({ name, about })
    this._avatar.src = avatar
    this._userId = id
  }

  userInfoFromForm({ name, about }) {
    this._authorName.textContent = name
    this._about.textContent = about
  }

  setAvatar({newAvatar}) {
    this._avatar.src = newAvatar
  }

  getUserId() {
    return this._userId
  }
}

// Принимает в конструктор объект с селекторами двух элементов: 
// элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

export default UserInfo

