import '../src/pages/index.css'; // добавьте импорт главного файла стилей 
import Card from '../src/components/Card.js'
import FormValidator from '../src/components/FormValidator.js'
import PopupWithForm from '../src/components/PopupWithForm.js'
import Section from '../src/components/Section.js'
import PopupWithImage from '../src/components/PopupWithImage.js'
import UserInfo from '../src/components/UserInfo.js'


import {
  default as initialCards, 
  validationConfig,
  popupProfileFormSelector,
  popupCardsFormSelector,
  popupFigureSelector,
  profileTitleSelector,
  profileTextSelector,
  cardsContainer
} from '../src/utils/constants.js'

const popupProfileForm = document.querySelector('#popup-edit-form')
const popupCardsForm = document.querySelector('#popup-add-form')

const buttonOpensProfileForm = document.querySelector('.profile__edit-button')
const buttonOpensCardsForm = document.querySelector('.profile__add-button')

const validationFormProfile = new FormValidator(validationConfig, popupProfileForm)
const validationFormCards = new FormValidator(validationConfig, popupCardsForm)
const popupWithImage = new PopupWithImage(popupFigureSelector) //Экземпляр класса попапа с большим изображением

validationFormProfile.enableValidation() //Запускаем валидацию формы редактирования профиля
validationFormCards.enableValidation() //Запускаем валидацию формы создания карточек
popupWithImage.setEventListeners() //Навешиваем слушатели на попап с большим изображением

//Экземпляр класса Section
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, '#element-template', () => {
      const name = item.name
      const link = item.link
      popupWithImage.open(name, link)
    })
    return newCard.getView() //Возвращаем элемент карточки
  },
},
  cardsContainer
)

cardsList.createCard() //Добавляем карточки на страницу

//Экземпляр класса чтения/записи информации о пользователе
const userInfo = new UserInfo(
  profileTitleSelector, profileTextSelector)

//Создаем экземпляр класса формы редактирования профиля
const popupWithProfileForm = new PopupWithForm(popupProfileFormSelector,
  ({nick, about}) => {
    userInfo.setUserInfo(nick, about) //Записываем данные с формы на страницу 
    popupWithProfileForm.close() //По клику на кнопку сохранить закрываем форму
    validationFormProfile.disableButton() //Чтобы не было случайно сработки при двойном клике
  }
)

popupWithProfileForm.setEventListeners() //Навешиваем слушатели на форму редактирования профиля

//При нажатии на кнопку редактирования профиля
buttonOpensProfileForm.addEventListener('click', () => {
  const userData = userInfo.getUserInfo() //Получаем данные со страницы 
  popupWithProfileForm.setInputValues(userData)
  popupWithProfileForm.open() //Открываем форму редактирования карточки профиля
  validationFormProfile.hideErrors() //Прячем ошибки, если были
  validationFormProfile.enableButton() //В поле при открытии уже есть данные - кнопка активна

})

//Создаем экземпляр класса формы создания карточки
const popupWithCardForm = new PopupWithForm(popupCardsFormSelector,
  (formData) => {
    const newCard = {
      name: formData.place,
      link: formData.url
    }
    cardsList.addItem(newCard) //Добавляем созданную карточку в разметку
    popupWithCardForm.close() //Закрываем форму
  }
)

popupWithCardForm.setEventListeners() //Навешиваем слушатели на форму создания карточки

//При нажатии на кнопку добавления карточки
buttonOpensCardsForm.addEventListener('click', () => {
  popupWithCardForm.open() //Открываем форму с карточками
  validationFormCards.hideErrors() //Прячем ошибки, если были
  validationFormCards.disableButton()
})