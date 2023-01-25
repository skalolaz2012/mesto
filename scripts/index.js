import Card from './Card.js'
import FormValidator from './FormValidator.js'
import initialCards from './data.js'

const popupEditForm = document.querySelector('#popup-edit-form')
const editForm = document.querySelector('#form_name')
const popupAddForm = document.querySelector('#popup-add-form')
const addForm = document.querySelector('#form_card')
const popupFigure = document.querySelector('#popup-figure')

const popups = document.querySelectorAll('.popup')

const buttonOpenEditForm = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileText = document.querySelector('.profile__text')
const cardsContainer = document.querySelector('.elements__list')
const buttonOpenAddForm = document.querySelector('.profile__add-button')
const popupImage = document.querySelector('.popup__image')
const popupDescription = document.querySelector('.popup__description')

const formEditPopup = popupEditForm.querySelector('.popup__form')
const authorNameInput = popupEditForm.querySelector('.popup__input_field_title')
const aboutInput = popupEditForm.querySelector('.popup__input_field_text')

const descriptionInput = popupAddForm.querySelector('.popup__input_field_description')
const imageInput = popupAddForm.querySelector('.popup__input_field_image')
const formAddPopup = popupAddForm.querySelector('.popup__form')

const validationConfig = {
  input: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const validationFormEditCard = new FormValidator(validationConfig, popupEditForm)
const validationFormAddCard = new FormValidator(validationConfig, popupAddForm)

//Функция открытия формы
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  //Навешиваем обработчик по клавише 'Esc'
  document.addEventListener('keydown', closeByEscape)
}

//Функция закрытия формы
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  //Удаляем обработчик по клавише 'Esc'
  document.removeEventListener('keydown', closeByEscape)
}

//Функция закрытия попапа по клавише Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    // Нашли открытый попап и закрыли его функцией closePopup
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

//Функция записи данных со страницы в форму редактирования профиля
function setDataToProfileForm() {
  authorNameInput.value = profileTitle.textContent
  aboutInput.value = profileText.textContent
}

//Функция записи данных с формы редактирования профиля на страницу
function getDataFromProfileForm() {
  profileTitle.textContent = authorNameInput.value
  profileText.textContent = aboutInput.value
}

//Функция записи данных со страницы в форму редактирования профиля
function setDataToFigurePopup(image) {
  popupImage.src = image.src
  popupImage.alt = image.alt
}

//Для каждого попапа
popups.forEach((popup) => {
  //Закрытие попапа по клику на оверлей и на крестик
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    else if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

// Функция обработки сабмита profile
function handleEditingFormSubmit(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
  getDataFromProfileForm() // Устанавливаем данные с формы на страницу
  closePopup(popupEditForm) //По клику на кнопку сохранить закрываем форму
}

// Функция записи данных из формы в сгенерированную карточку elements
function handleAddingFormSubmit(evt) {
  evt.preventDefault()
  renderCard({
    name: descriptionInput.value,
    link: imageInput.value
  })
  closePopup(popupAddForm)
}

//Обработчик формы редактирования профиля: по клику на кнопку редактора открываем форму и записываем в ее поля значения с экрана, прячем ошибки и активируем кнопку сабмита
buttonOpenEditForm.addEventListener('click', () => {
  openPopup(popupEditForm)
  setDataToProfileForm()
  validationFormEditCard.hideErrors()
  validationFormEditCard.enableButton()
})

// Прикрепляем обработчик к форме редактирования профиля: он будет следить за событием “submit” - «отправка»
formEditPopup.addEventListener('submit', handleEditingFormSubmit);

// Обработчик формы создания карточки: по клику на кнопку редактора открываем форму и стираем значения полей инпута, прячем ошибки и блокируем кнопку инпута
buttonOpenAddForm.addEventListener('click', () => {
  openPopup(popupAddForm)
  addForm.reset()
  validationFormAddCard.hideErrors()
  validationFormAddCard.disableButton()
})

// Прикрепляем обработчик к форме добавления карточки: он будет следить за событием “submit” - «отправка»
formAddPopup.addEventListener('submit', handleAddingFormSubmit)

// Открываем карточку с большим изображением 
const handleOpenFigure = (evt) => {
  const figureImage = evt.target
  setDataToFigurePopup(figureImage)
  popupDescription.textContent = figureImage.closest('.elements__item').querySelector('.elements__title').textContent
  openPopup(popupFigure)
}

// Создаем экземпляр класса
const renderCard = (card) => {
  const newCard = new Card(card, '#element-template', handleOpenFigure)
  addCard(newCard)
}

// Вставляем созданный класс в разметку
const addCard = (card) => {
  cardsContainer.prepend(card.getView()) // getView - публичный метод получения представления карточки }
}

// Рендерим 6 карточек
initialCards.forEach((card) => {
  renderCard(card)
})

// Запускаем валидацию формы редактирования профиля
validationFormEditCard.enableValidation()

// Запускаем валидацию формы добавления карточек
validationFormAddCard.enableValidation()