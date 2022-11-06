//открытие и закрытие формы popup
const popupForm = document.querySelector('.popup')
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__close-button')
const saveButton = document.querySelector('.popup__submit-button')
const formElement = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_field_title')
const jobInput = document.querySelector('.popup__input_field_text')
const profileTitle = document.querySelector('.profile__title')
const profileText = document.querySelector('.profile__text')


//объявляем переменную и атрибутом popup передаем в стрелочную функцию добавление класса
const onOpen = (popup) => {
  popup.classList.add('popup_opened')
}

//удаляем класс
const onClose = (popup) => {
  popup.classList.remove('popup_opened')
}

//по клику на кнопку редактора открываем форму и записываем в поля значения с экрана
editButton.addEventListener('click', () => {
  onOpen(popupForm)
  nameInput.value = profileTitle.textContent
  jobInput.value = profileText.textContent
})

//по клику на крестик закрываем форму
closeButton.addEventListener('click', () => {
  onClose(popupForm)
})

//функция записи данных из формы в блок profile
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameValue = profileTitle
  const jobValue = profileText

  nameValue.textContent = nameInput.value
  jobValue.textContent = jobInput.value

  //по клику на кнопку сохранить закрываем форму
  saveButton.addEventListener('click', () => {
  onClose(popupForm)
})
}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);