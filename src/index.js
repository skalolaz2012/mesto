import '../src/pages/index.css'; // добавьте импорт главного файла стилей 
import Card from '../src/components/Card.js'
import FormValidator from '../src/components/FormValidator.js'
import PopupWithForm from '../src/components/PopupWithForm.js'
import Section from '../src/components/Section.js'
import PopupWithImage from '../src/components/PopupWithImage.js'
import UserInfo from '../src/components/UserInfo.js'
import Api from '../src/components/Api.js'
import PopupWithConfirmation from '../src/components/PopupWithConfirmation.js'


import {
  default as configApi,
  validationConfig,
  popupProfileFormSelector,
  popupCardsFormSelector,
  popupFigureSelector,
  popupAvatarFormSelector,
  popupWithConfirmationSelector,
  profileTitleSelector,
  profileTextSelector,
  profileAvatarSelector,
  cardsContainer,
  templateSelector
} from '../src/utils/constants.js'

const popupProfileForm = document.querySelector('#popup-edit-form')
const popupCardsForm = document.querySelector('#popup-add-form')
const popupAvatarForm = document.querySelector('#popup-avatar-form')


const buttonOpensProfileForm = document.querySelector('.profile__edit-button')
const buttonOpensCardsForm = document.querySelector('.profile__add-button')
const buttonOpensAvatarForm = document.querySelector('.profile__edit-avatar')

const api = new Api(configApi)

api.proceedFromServer()
  .then((res) => {
    const [initialCard, userData] = res
    userInfo.setUserInfo({name: userData.name, about: userData.about, avatar: userData.avatar, id: userData._id})
    cardsList.renderCard(initialCard)
  })
  .catch((error) => {
    console.log(error)
  })

const validationFormProfile = new FormValidator(validationConfig, popupProfileForm)
const validationFormCards = new FormValidator(validationConfig, popupCardsForm)
const validationFormAvatar = new FormValidator(validationConfig, popupAvatarForm)
const popupWithImage = new PopupWithImage(popupFigureSelector) //Экземпляр класса попапа с большим изображением
const popupWithConfirmation = new PopupWithConfirmation(popupWithConfirmationSelector)

validationFormProfile.enableValidation() //Запускаем валидацию формы редактирования профиля
validationFormCards.enableValidation() //Запускаем валидацию формы создания карточек
validationFormAvatar.enableValidation() //Запускаем валидацию формы смены аватара

popupWithImage.setEventListeners() //Навешиваем слушатели на попап с большим изображением
popupWithConfirmation.setEventListeners() //Навешиваем слушатели на попап с большим изображением

//Экземпляр класса Section
const cardsList = new Section({

  renderer: (item) => {

    const newCard = new Card({

      card: item, 

      templateSelector: templateSelector,

      handleCardClick: () => {
        const name = item.name
        const link = item.link
        popupWithImage.open(name, link)
      },

      handleDeleteCard: (evt) => {
        const cardId = newCard.getCardId()
        popupWithConfirmation.open()
        popupWithConfirmation.setHandleConfirmSubmit(() => {
          api.deleteCard(cardId)
            .then(() => {
              newCard.delete()
              popupWithConfirmation.close()
            })
            .catch((error) => {
              console.log(error)
            })
        })
      },

      userId: userInfo.getUserId(),

      handleLikeItem: () => {
        if (newCard.likeActive) {
          api.deleteLike(newCard.getCardId())
            .then((data) => {
              newCard.unsetLike()
              newCard.setLikesAmount(data.likes)
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          api.putLike(newCard.getCardId())
            .then((data) => {
              newCard.setLikesAmount(data.likes)
            })
            .catch((error) => {
              console.log(error)
            })
          newCard.setLike()
        }
      }
    })

    return newCard.getView() //Возвращаем элемент карточки
  },
},
  cardsContainer
)

//Экземпляр класса чтения/записи информации о пользователе
const userInfo = new UserInfo(profileTitleSelector, profileTextSelector, profileAvatarSelector)

//Создаем экземпляр класса формы редактирования профиля
const popupWithProfileForm = new PopupWithForm(popupProfileFormSelector,
  (formData) => {
    popupWithProfileForm.downloadProcess(true)
    api.changeUserObj({name: formData.name, about: formData.about})
      .then((data) => {
        userInfo.userInfoFromForm( {name: data.name, about: data.about} ) 
        popupWithProfileForm.close() //По клику на кнопку сохранить закрываем форму
        validationFormProfile.disableButton() //Чтобы не было случайно сработки при двойном клике
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        popupWithProfileForm.downloadProcess(false)
      })
  })

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
    popupWithCardForm.downloadProcess(true)
    api.createCard(formData)
      .then((formData) => {
        cardsList.addItem(formData)
        popupWithCardForm.close() //Закрываем форму
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        popupWithCardForm.downloadProcess(false)
      })
  })

popupWithCardForm.setEventListeners() //Навешиваем слушатели на форму создания карточки

//При нажатии на кнопку добавления карточки
buttonOpensCardsForm.addEventListener('click', () => {
  popupWithCardForm.open() //Открываем форму с карточками
  validationFormCards.hideErrors() //Прячем ошибки, если были
  validationFormCards.disableButton()
})

//Создаем экземпляр класса формы смены аватара
const popupWithAvatarForm = new PopupWithForm(popupAvatarFormSelector,
  (formData) => {
    popupWithAvatarForm.downloadProcess(true)
    api.changeAvatar({avatar: formData.avatar})
      .then((data) => {
        userInfo.setAvatar({ newAvatar: data.avatar})
        popupWithAvatarForm.close()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        popupWithAvatarForm.downloadProcess(false)
      })
  })

popupWithAvatarForm.setEventListeners() //Навешиваем слушатели на форму создания карточки

//При нажатии на кнопку добавления карточки
buttonOpensAvatarForm.addEventListener('click', () => {
  popupWithAvatarForm.open() //Открываем форму с карточками
  validationFormAvatar.hideErrors() //Прячем ошибки, если были
  validationFormAvatar.disableButton()
})