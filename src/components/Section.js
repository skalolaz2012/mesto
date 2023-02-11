class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer
    this._container = document.querySelector(selector)
  }

  // публичный метод, который отвечает за отрисовку всех элементов.
  renderCard(initialCards) {
    initialCards.forEach(item => {
      this.addItem(item)
    })
  }

  // публичный метод, который принимает DOM - элемент и добавляет его в контейнер
  addItem(item) {
    const newCard = this._renderer(item)
    this._container.prepend(newCard)
  }
}

// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
// Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
// renderer — это функция, которая отвечает за создание и отрисовку данных на странице
// Содержит публичный метод, который отвечает за отрисовку всех элементов.
// Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
// Содержит публичный метод addItem, который принимает DOM - элемент и добавляет его в контейнер.
// У класса Section нет своей разметки.Он получает разметку через функцию - колбэк и вставляет её в контейнер.

export default Section

