class UserInfo {
  constructor(authorNameSelector, aboutSelector) {
    this._authorName = document.querySelector(authorNameSelector)
    this._about = document.querySelector(aboutSelector)
  }

  getUserInfo() {
    return {
      nick: this._authorName.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(nick, about) {
    this._authorName.textContent = nick
    this._about.textContent = about
  }

}

// Принимает в конструктор объект с селекторами двух элементов: 
// элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

export default UserInfo

