//массив с данными 6 карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupEditForm = document.querySelector('#popup-edit-form')
const popupAddForm = document.querySelector('#popup-add-form')
const popupFigure = document.querySelector('#popup-figure')

const closeButtons = document.querySelectorAll('.popup__close-button')
const overlays = document.querySelectorAll('.popup')

const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileText = document.querySelector('.profile__text')
const elementsContainer = document.querySelector('.elements__list')
const addButton = document.querySelector('.profile__add-button')
const popupImage = document.querySelector('.popup__image')
const popupDescription = document.querySelector('.popup__description')
const formEl = popupEditForm.querySelector('.popup__form')
const nameInput = popupEditForm.querySelector('.popup__input_field_title')
const jobInput = popupEditForm.querySelector('.popup__input_field_text')
const nameError = popupEditForm.querySelector('.name-input-error')
const aboutError = popupEditForm.querySelector('.about-input-error')
const descriptionInput = popupAddForm.querySelector('.popup__input_field_description')
const imageInput = popupAddForm.querySelector('.popup__input_field_image')
const formImage = popupAddForm.querySelector('.popup__form')
const cardError = popupAddForm.querySelector('.card-input-error')
const urlError = popupAddForm.querySelector('.url-input-error')

//Импорты из validate
import { hideInputError } from '../scripts/validate.js';

//Функция открытия формы
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  nameError.textContent = ''
  aboutError.textContent = ''
  cardError.textContent = ''
  urlError.textContent = ''
}

//Функция закрытия формы
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

// Находим все "оверлеи" проекта по универсальному селектору и проходимся по каждому элементу коллекции NodeList
overlays.forEach((overlay) => {
  // Находим 1 раз ближайший к крестику попап 
  const popup = overlay.closest('.popup')
  document.addEventListener('keydown', function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup)
    }
  });
  // Устанавливаем обработчик на закрытие формы
  overlay.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  })
})

// Находим все "крестики" проекта по универсальному селектору и проходимся по каждому элементу коллекции NodeList
closeButtons.forEach((button) => {
  // Находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');

  // Устанавливаем обработчик закрытия на кнопку закрытия формы
  button.addEventListener('click', () => closePopup(popup));
});

//Форма редактирования профиля
//по клику на кнопку редактора открываем форму и записываем в поля значения с экрана
editButton.addEventListener('click', () => {
  openPopup(popupEditForm)
  nameInput.value = profileTitle.textContent
  jobInput.value = profileText.textContent
})

//Функция записи данных из формы в блок profile
function handleEditingFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameValue = profileTitle
  const jobValue = profileText

  nameValue.textContent = nameInput.value
  jobValue.textContent = jobInput.value

  //По клику на кнопку сохранить закрываем форму
  closePopup(popupEditForm)
}

// Прикрепляем обработчик к форме редактирования профиля:
// он будет следить за событием “submit” - «отправка»
formEl.addEventListener('submit', handleEditingFormSubmit);

//Форма создания карточки
//по клику на кнопку редактора открываем форму и записываем в поля значения с экрана
addButton.addEventListener('click', () => {
  openPopup(popupAddForm)
  descriptionInput.value = ''
  imageInput.value = ''
})

//Функция записи данных из формы в сгенерированную карточку elements
function handleAddingFormSubmit(evt) {
  evt.preventDefault()

  const title = descriptionInput.value
  const image = imageInput.value

  renderCard({ 
    name: title,
    link: image
  })

  closePopup(popupAddForm)
}

// Прикрепляем обработчик к форме добавления карточки:
// он будет следить за событием “submit” - «отправка»
formImage.addEventListener('submit', handleAddingFormSubmit)

//Templates
const elementsTemplate = document.querySelector('#element-template').content.querySelector('.elements__item')

//Генерация карточки
//Вешаем событие на значок корзины и удаляем карточку
const handleDeleteItem = (evt) => {
  evt.target.closest('.elements__item').remove()
}

//Событие на кнопку лайка - toggle класса
const handleLikeItem = (evt) => {
  evt.target.classList.toggle('elements__button_active')
}

//Открываем карточку с большим изображением 
const handleOpenFigure = (evt) => {
  const figureImage = evt.target

  const urlSource = figureImage.getAttribute('src')
  const altSource = figureImage.getAttribute('alt')
  popupImage.setAttribute('src', urlSource)
  popupImage.setAttribute('alt', altSource)
  popupDescription.textContent = figureImage.closest('.elements__item').querySelector('.elements__title').textContent

  openPopup(popupFigure)
}

//Создаём карточку из шаблона со всеми элементами
const createCard = (card) => {
  const newItem = elementsTemplate.cloneNode(true)
  const title = newItem.querySelector('.elements__title')
  title.textContent = card.name

  const image = newItem.querySelector('.elements__image')
  image.setAttribute('src', card.link)
  image.setAttribute('alt', `${card.name} - фото`)

  const deleteButton = newItem.querySelector('.elements__delete-button')
  deleteButton.addEventListener('click', handleDeleteItem)

  const likeButton = newItem.querySelector('.elements__button')
  likeButton.addEventListener('click', handleLikeItem)

  const elementsImageButton = newItem.querySelector('.elements__image-button')
  elementsImageButton.addEventListener('click', handleOpenFigure)

  return newItem
}

//Добавляем 6 карточек
const renderCard = (card) => {
  elementsContainer.prepend(createCard(card))
}

//Рендерим 6 карточек
initialCards.forEach((card) => {
  renderCard(card)
})