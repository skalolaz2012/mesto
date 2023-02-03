class Card {
  // В конструкторе будут динамические данные, для каждого экземпляра свои
  constructor(card, templateSelector, handleCardClick) {
    // все переменные — приватные поля, они нужны только внутри класса
    this._name = card.name
    this._link = card.link
    this._templateSelector = templateSelector // записали селектор в приватное поле
    this._handleImageClick = handleCardClick
  }

  _getTemplate() {
    // Здесь выполним все необходимые операции, чтобы вернуть разметку
    const newItem = document
    .querySelector(this._templateSelector)
    .content.querySelector('.elements__item')
    .cloneNode(true)

    return newItem
  }

  _setData() {
    // Добавим данные в карточку
    const titleElement = this._newCard.querySelector('.elements__title')
    titleElement.textContent = this._name
    
    const imageElement = this._newCard.querySelector('.elements__image')
    imageElement.src = this._link
    imageElement.alt = `${this._name} - фото`
  }

  _handleDeleteItem() {
    this._newCard.remove()
    this._newCard = null
  }

  _handleLikeItem() {
    this._likeButton.classList.toggle('elements__button_active') // Вот здесь как раз была в this сама кнопка лайка
  }

  // Слушатели событий
  _setEventListeners() {
    const deleteButton = this._newCard.querySelector('.elements__delete-button')
    deleteButton.addEventListener('click', () => {
      this._handleDeleteItem() // Через колбэк это элемент класса - карточка, а через запятую без колбэка - кнопка удаления
    })

    this._likeButton = this._newCard.querySelector('.elements__button')
    this._likeButton.addEventListener('click', () => {
      this._handleLikeItem()
    })

    const elementsImageButton = this._newCard.querySelector('.elements__image-button')
    elementsImageButton.addEventListener('click', this._handleImageClick)
  }

  //Возвращаем готовый шаблон карточки со слушателями данными
  getView() {
    this._newCard = this._getTemplate()
    this._setData()
    this._setEventListeners()

    return this._newCard
  }
}

export default Card