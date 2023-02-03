class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.input
    this._submitButtonSelector = settings.submitButtonSelector
    this._inactiveButtonClass = settings.inactiveButtonClass
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
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
      this._showInputError(inputElement) // showInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
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

  _disableButton() {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.disabled = true
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass)
    this._buttonElement.disabled = false
  }

  //Переключение состояния кнопки отправки формы
  _toggleButtonState() {
    //Если есть хотя бы один невалидный инпут, сделаем кнопку неактивной
    if (this._hasInvalidInput()) {
      this._disableButton()
    } else {
      //Иначе сделаем кнопку активной
      this._enableButton()      
    }
  }

  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      //Каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        //Внутри функции вызовем checkInputValidity, передав ей форму и проверяемый элемент
        this._checkInputValidity(inputElement)
        //Чтобы проверять его при изменении любого из полей
        this._toggleButtonState()
      })
    })
  }

  hideErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
}

export default FormValidator