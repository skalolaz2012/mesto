//открытие и закрытие формы popup
let editButton = document.querySelector('.profile__edit-button')
let popupForm = document.querySelector('.popup')

//объявляем переменную и атрибутом popup передаем в стрелочную функцию добавление класса
let onOpen = (popup) => {
  popup.classList.add('popup_opened')
}

//удаляем класс
let onClose = (popup) => {
  popup.classList.remove('popup_opened')
}

//по клику на кнопку редактора открываем форму
editButton.addEventListener('click', () => {
  onOpen(popupForm)
})

//закрываем форму при нажатии на overlay формы, кнопку закрытия или кнопку сохранения
popupForm.addEventListener('click', (event) => {
  let isOverlay = event.target.classList.contains('popup')
  let isClose = event.target.classList.contains('popup__close-button')
  let isSave = event.target.classList.contains('popup__submit-button')

  if(isOverlay || isClose && isClose || isSave) {
    onClose(popupForm)
  }
})

//сохранение инфо в форму
// форма в DOM уже найдена в строке 3 popupForm, но найдём ещё раз
let formElement = document.querySelector('.popup')
  // Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__field-title')
let jobInput = formElement.querySelector('.popup__field-text')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  nameInput.getAttribute('value')
  jobInput.getAttribute('value')

  // Выберите элементы, куда должны быть вставлены значения полей
  let nameValue = document.querySelector('.profile-info__title')
  let jobValue = document.querySelector('.profile-info__text')

  // Вставьте новые значения с помощью textContent
  nameValue.textContent = nameInput.value
  jobValue.textContent = jobInput.value
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);