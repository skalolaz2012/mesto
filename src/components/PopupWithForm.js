import Popup from './Popup.js'

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popup.querySelector('.popup__form')
    this._popupFields = this._popup.querySelectorAll('.popup__input')
    this._popupSubmitButton = this._popup.querySelector('.popup__submit-button')
  }

  _getInputValues() {
    this._formValues = {}
    this._popupFields.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setInputValues(data) {
    this._popupFields.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name]
    })
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  // При редактировании профиля уведомите пользователя о процессе загрузки, поменяв текст кнопки на: «Сохранение...», пока данные загружаются
  downloadProcess(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = 'Сохранение...'
    } else {
      this._popupSubmitButton.textContent = 'Сохранить'
    }
  }
}

// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners.
// Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
// но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.

export default PopupWithForm