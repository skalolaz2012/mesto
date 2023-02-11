class Card {
  // В конструкторе будут динамические данные, для каждого экземпляра свои
  constructor({ card, templateSelector, handleCardClick, handleDeleteCard, userId, handleLikeItem }) {
    // все переменные — приватные поля, они нужны только внутри класса
    this._name = card.name
    this._link = card.link
    this._cardId = card._id
    this._likes = card.likes
    this._templateSelector = templateSelector // записали селектор в приватное поле
    this._handleImageClick = handleCardClick
    this._handleDeleteCard = handleDeleteCard
    this._userId = userId
    this._ownerId = userId === card.owner._id
    this._handleLikeItem = handleLikeItem
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
    this._titleElement = this._newCard.querySelector('.elements__title')
    this._titleElement.textContent = this._name
    
    this._imageElement = this._newCard.querySelector('.elements__image')
    this._imageElement.src = this._link
    this._imageElement.alt = `${this._name} - фото`

    this._elementsImageButton = this._newCard.querySelector('.elements__image-button')

    this._deleteButton = this._newCard.querySelector('.elements__delete-button')

    this._likeButton = this._newCard.querySelector('.elements__button')
    this._likeCountElement = this._newCard.querySelector('.elements__count')
    this._likeCountElement.textContent = this._likes.length
  }

  _countLikes() {
    if (this._checkLike()) {
      this.setLike()
    } else {
      this.unsetLike()
    }
  }

  setLike() {
    this._likeButton.classList.add('elements__button_active')
    this.likeActive = true
  }

  unsetLike() {
    this._likeButton.classList.remove('elements__button_active')
    this.likeActive = false
  }

  _checkLike() {
    return this._likes.some(item => item._id === this._userId)
  }

  delete() {
    this._newCard.remove()
    this._newCard = null
  }

  // Слушатели событий
  _setEventListeners() {
    if (!this._ownerId) {
      this._deleteButton.remove()
      this._deleteButton = null
    } else {
      this._deleteButton.addEventListener('click', (evt) => {
        this._handleDeleteCard(evt) // Через колбэк это элемент класса - карточка, а через запятую без колбэка - кнопка удаления
      })
    }
    
    this._likeButton.addEventListener('click', () => {
      this._handleLikeItem()
    })

    this._elementsImageButton.addEventListener('click', this._handleImageClick)
  }

  getCardId() {
    return this._cardId
  }

  setLikesAmount(data) {
    this._likeCountElement.textContent = data.length
  }

  //Возвращаем готовый шаблон карточки со слушателями данными
  getView() {
    this._newCard = this._getTemplate()
    this._setData()
    this._setEventListeners()
    this._countLikes()

    return this._newCard
  }
}

export default Card