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

const popups = document.querySelectorAll('.popup')
const inputs = document.querySelectorAll('.popup__input')

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
const submitButtonEditForm = popupEditForm.querySelector('.popup__submit-button')
const descriptionInput = popupAddForm.querySelector('.popup__input_field_description')
const imageInput = popupAddForm.querySelector('.popup__input_field_image')
const formImage = popupAddForm.querySelector('.popup__form')
const cardError = popupAddForm.querySelector('.card-input-error')
const urlError = popupAddForm.querySelector('.url-input-error')
const submitButtonAddForm = popupAddForm.querySelector('.popup__submit-button')

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

//Функция стирания строк ошибок и нормализации границ полей ввода от ошибок
const eraseErrors = (string1, string2, border) => {
  string1.textContent = ''
  string2.textContent = ''
  border.forEach((item) => {
    item.classList.remove('popup__input_type_error')
  })
}

//Функция закрытия попапа по клавише Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    // Нашли открытый попап и закрыли его функцией closePopup
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

//Для каждого попапа
popups.forEach((popup) => {
  //Закрытие попапа по клику на оверлей и на крестик
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

//Форма редактирования профиля
//по клику на кнопку редактора открываем форму и записываем в поля значения с экрана
editButton.addEventListener('click', () => {
  openPopup(popupEditForm)
  nameInput.value = profileTitle.textContent
  jobInput.value = profileText.textContent
  //Если закрытие формы было с "красными полями" - очищаем ошибки для лучшего UX
  eraseErrors(nameError, aboutError, inputs)
  //Кнопка сабмита всегда активная при открытии
  submitButtonEditForm.removeAttribute('disabled')
  submitButtonEditForm.classList.remove('popup__submit-button_disabled')
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
  //Если закрытие формы было с "красными полями" - очищаем ошибки для лучшего UX
  eraseErrors(cardError, urlError, inputs)
  //Кнопка сабмита всегда деактивирована при открытии
  submitButtonAddForm.setAttribute('disabled', '')
  submitButtonAddForm.classList.add('popup__submit-button_disabled')
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