import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {default as initialCards, validationConfig} from './constants.js'

const popupProfileForm = document.querySelector('#popup-edit-form')
const popupCardsForm = document.querySelector('#popup-add-form')
const cardsForm = document.querySelector('#form_card')
const popupFigure = document.querySelector('#popup-figure')

const popups = document.querySelectorAll('.popup')

const buttonOpensProfileForm = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileText = document.querySelector('.profile__text')
const cardsContainer = document.querySelector('.elements__list')
const buttonOpensCardsForm = document.querySelector('.profile__add-button')
const popupImage = document.querySelector('.popup__image')
const popupDescription = document.querySelector('.popup__description')

const formProfilePopup = popupProfileForm.querySelector('.popup__form')
const authorNameInput = popupProfileForm.querySelector('.popup__input_field_title')
const aboutInput = popupProfileForm.querySelector('.popup__input_field_text')

const descriptionInput = popupCardsForm.querySelector('.popup__input_field_description')
const imageInput = popupCardsForm.querySelector('.popup__input_field_image')
const formCardsPopup = popupCardsForm.querySelector('.popup__form')

const validationFormProfile = new FormValidator(validationConfig, popupProfileForm)
const validationFormCards = new FormValidator(validationConfig, popupCardsForm)

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
    const popupOpened = document.querySelector('.popup_opened')
    // Нашли открытый попап и закрыли его функцией closePopup
    closePopup(popupOpened)
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

// Функция обработки сабмита profile
function handleEditingFormSubmit(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
  getDataFromProfileForm() // Устанавливаем данные с формы на страницу
  closePopup(popupProfileForm) //По клику на кнопку сохранить закрываем форму
}

// Функция записи данных из формы в сгенерированную карточку elements
function handleAddingFormSubmit(evt) {
  evt.preventDefault()
  addCard({
    name: descriptionInput.value,
    link: imageInput.value
  })
  closePopup(popupCardsForm)
}

// Открываем карточку с большим изображением 
const handleOpenFigure = (evt) => {
  const figureImage = evt.target
  setDataToFigurePopup(figureImage)
  popupDescription.textContent = figureImage.closest('.elements__item').querySelector('.elements__title').textContent
  openPopup(popupFigure)
}

//Для каждого попапа обработчики
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

//Обработчик формы редактирования профиля: по клику на кнопку редактора открываем форму и записываем в ее поля значения с экрана, прячем ошибки и активируем кнопку сабмита
buttonOpensProfileForm.addEventListener('click', () => {
  openPopup(popupProfileForm)
  setDataToProfileForm()
  validationFormProfile.hideErrors()
  validationFormProfile.enableButton()
})

// Прикрепляем обработчик к форме редактирования профиля: он будет следить за событием “submit” - «отправка»
formProfilePopup.addEventListener('submit', handleEditingFormSubmit);

// Обработчик формы создания карточки: по клику на кнопку редактора открываем форму и стираем значения полей инпута, прячем ошибки и блокируем кнопку инпута
buttonOpensCardsForm.addEventListener('click', () => {
  openPopup(popupCardsForm)
  cardsForm.reset()
  validationFormCards.hideErrors()
  validationFormCards.disableButton()
})

// Прикрепляем обработчик к форме добавления карточки: он будет следить за событием “submit” - «отправка»
formCardsPopup.addEventListener('submit', handleAddingFormSubmit)

// Создаем экземпляр класса
const createCard = (card) => {
  const newCard = new Card(card, '#element-template', handleOpenFigure)
  return newCard  
}

// Вставляем созданный класс в разметку
const addCard = (card) => {
  const cards = createCard(card)
  cardsContainer.prepend(cards.getView()) // getView - публичный метод получения представления карточки }
}

// Отрисовываем на страницу 6 карточек
initialCards.forEach((card) => {
  addCard(card)
})

// Запускаем валидацию формы редактирования профиля
validationFormProfile.enableValidation()

// Запускаем валидацию формы добавления карточек
validationFormCards.enableValidation()