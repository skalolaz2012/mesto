import Popup from './Popup.js'

class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.popup__image')
    this._popupDescription = this._popup.querySelector('.popup__description')
  }

  open(name, link) {
    this._popupDescription.textContent = name
    this._popupImage.src = link
    this._popupImage.alt = `${name} - фото`

    super.open()
  }
}

// Этот класс должен перезаписывать родительский метод open. 
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.

export default PopupWithImage

