class FormValidator {
  constructor(settings, formElement) {
    this._submitButtonSelector = settings.submitButtonSelector
    this._inactiveButtonClass = settings.inactiveButtonClass
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'))
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`) // Выбираем элемент ошибки на основе уникального класса
    inputElement.classList.add(this._inputErrorClass) // Добавляем стилизацию поля при ошибке
    errorElement.classList.add(this._errorClass) // Показываем текст ошибки
    errorElement.textContent = inputElement.validationMessage // Присваиваем текстовое сообщение ошибки
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`) // Выбираем элемент ошибки на основе уникального класса
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
    }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // showInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  // hasInvalidInput принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция hasInvalidInput вернёт true
      return !inputElement.validity.valid
    })
  }

  // Переключение состояния кнопки отправки формы
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // Сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', '')
    } else {
      // Иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled')
    }
  }

  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри функции вызовем checkInputValidity, передав ей форму и проверяемый элемент
        this._checkInputValidity(inputElement)
        // Чтобы проверять его при изменении любого из полей
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
  
}

export default FormValidator