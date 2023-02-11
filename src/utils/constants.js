const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'cbc52507-7845-477e-abfa-382323046090',
    'Content-Type': 'application/json'
  }
}

export const validationConfig = {
  input: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const popupProfileFormSelector = '#popup-edit-form'
export const popupCardsFormSelector = '#popup-add-form'
export const popupFigureSelector = '#popup-figure'
export const popupAvatarFormSelector = '#popup-avatar-form'
export const popupWithConfirmationSelector = '#popup-delete-form'
export const profileTitleSelector = '.profile__title'
export const profileTextSelector = '.profile__text'
export const profileAvatarSelector = '.profile__avatar'
export const cardsContainer = '.elements__list'
export const templateSelector = '#element-template'

export default configApi