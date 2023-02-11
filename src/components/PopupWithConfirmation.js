import Popup from './Popup.js'

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')
  }

  handleConfirmSubmit(submit) {
    this._handleSubmit = submit
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmit()
    })
  }

}

export default PopupWithConfirmation