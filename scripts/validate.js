const form = document.querySelector('#form_name')
const formInput = form.querySelector('.popup__input')
const formError = form.querySelector(`.${formInput.id}-error`)

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__error_visible')
};

export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__input_type_error')
  errorElement.classList.remove('popup__error_visible')
  errorElement.textContent = ''
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__submit-button')
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement)
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри функции вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement)
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement)
    })
  })
}

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'))

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__field-info'))

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet)
    })
  })
}

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__submit-button_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__submit-button_disabled')
  }
}

enableValidation()