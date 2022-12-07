const form = document.querySelector('#form_name')
const formInput = form.querySelector('.popup__input')
const formError = form.querySelector(`.${formInput.id}-error`)

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(settings.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(settings.errorClass)
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(settings.inputErrorClass)
  errorElement.classList.remove(settings.errorClass)
  errorElement.textContent = ''
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings)
  } else {
    hideInputError(formElement, inputElement, settings)
  }
}

const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
  const buttonElement = formElement.querySelector(settings.submitButtonSelector)
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, settings)
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри функции вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, settings)
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, settings)
    })
  })
}

const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector))

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldSetSelector))

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, settings)
    })
  })
}

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.inactiveButtonClass)
    buttonElement.setAttribute('disabled', '')
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldSetSelector: '.popup__field-info',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});