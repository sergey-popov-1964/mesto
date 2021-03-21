import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Api from '../components/Api.js';
import './index.css'


// Валидация
//-----------------------------------------------------------------------------------------------------------------------------------
const validatorList = {}; // объявление объекта для инстансов классов валидации

// Объект с настройками для FormValidator
const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};

// Для каждой проверяемой формы создается экземпляр класса FormValidator
const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  const formValidate = new FormValidator(configValidation, formElement);
  formValidate.enableValidation();
  validatorList[formElement.name] = formValidate //добавление инстанса в объект
});
//запись в константы инстансов класса formValidate для форм
const validateFormAdd = validatorList[document.querySelector('.popup-add').querySelector('.form').name];
const validateFormEdit = validatorList[document.querySelector('.popup-edit').querySelector('.form').name];
const validateFormAvatar = validatorList[document.querySelector('.popup-avatar').querySelector('.form').name];
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


// API
//-----------------------------------------------------------------------------------------------------------------------------------
// Константы для API
const authorization = {authorization: 'be1a7eff-1608-42e4-ab79-a96e12a8c4b6', 'Content-Type': 'application/json'}
const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-21'
const user_ID = '3e2a74326fac3d4d7e8ff79b';
const api = new Api(baseUrl, authorization);
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


// Работа с карточками
//-----------------------------------------------------------------------------------------------------------------------------------
// Возвращает новую карточку
function createCard(newMesto) {
  const card = new Card(newMesto, '.element-mesto', handleCardClick, handleDeleteCard, handleLikeClick);
  return card.generateMesto(user_ID);
}

const addSection = new Section({renderer: createCard}, '.elements__list');
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


// форма Add
//-----------------------------------------------------------------------------------------------------------------------------------
//Создание инстанса для попапа формы Add
const popupAddMesto = new PopupWithForm('.popup-add', addFormSubmitHandler);
popupAddMesto.setEventListeners();

const buttonFormAddOpen = document.querySelector('.profile__button-add');
const buttonFormAddSubmit = document.querySelector('.popup-add').querySelector('.form__submit');
buttonFormAddOpen.addEventListener('click', () => {
  popupAddMesto.open();
  validateFormAdd.resetValidation();
});

// Обработка submit формы Add
function addFormSubmitHandler(data) {
  buttonFormAddSubmit.innerText = 'Создание...'
  buttonFormAddSubmit.setAttribute("disabled", "disabled");
  api.setCards({name: data.add_name_mesto, link: data.add_name_link})
    .then(card => {
      addSection.addItem(createCard(card));
      buttonFormAddSubmit.innerText = 'Создать';
      buttonFormAddSubmit.removeAttribute("disabled");
    })
  popupAddMesto.close();
}

//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


// форма Edit. Инфо профиля
//-----------------------------------------------------------------------------------------------------------------------------------
// Переменные для формы Edit
const buttonFormEditOpen = document.querySelector('.profile__button-edit');
const formEdit = document.forms.form__edit;
const nameInput = formEdit.elements.edit_name_avatar;
const jobInput = formEdit.elements.edit_job;
const buttonSubmit = formEdit.elements.form_submit;

//Создание инстанса для попапа формы Edit
const popupEditProfile = new PopupWithForm('.popup-edit', editProfileSubmitHandler);
popupEditProfile.setEventListeners();

const mestoUserInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', () => {
  const objUserInfo = mestoUserInfo.getUserInfo();
  nameInput.value = objUserInfo.name;
  jobInput.value = objUserInfo.info;
  popupEditProfile.open();
  validateFormEdit.resetValidation();
});

// Обработка submit формы Edit
function editProfileSubmitHandler(data) {
  buttonSubmit.innerText = 'Сохранение...'
  buttonSubmit.setAttribute("disabled", "disabled");
  api.setUserInfo({name: data.edit_name_avatar, about: data.edit_job})
    .then(user => {
      mestoUserInfo.setUserInfo(user.name, user.about);
      buttonSubmit.innerText = 'Сохранить';
      buttonSubmit.removeAttribute("disabled");
    })
  popupEditProfile.close();
}

//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


// Превью изображения в карточке
//-----------------------------------------------------------------------------------------------------------------------------------
const popupPreviewImage = new PopupWithImage('.popup-image');
popupPreviewImage.setEventListeners();

// Обработка клика на изображении в карточке
function handleCardClick(name, link) {
  popupPreviewImage.open(name, link);
}

//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


// Клик на лайк
//-----------------------------------------------------------------------------------------------------------------------------------
function countLikes(card, elementCountLike) {
  const likes = Array.from(card.likes);
  if (likes.length === 0) {
    elementCountLike.textContent = '';
  } else {
    elementCountLike.textContent = likes.length.toString()
  }
}

function handleLikeClick(cardElement, cardId) {
  const elementHeart = cardElement.querySelector('.element__heart');
  const elementCountLike = cardElement.querySelector('.element__counter-like');
  if (!elementHeart.classList.contains('element__heart_like')) {
    api.setCardLike({_id: cardId})
      .then(card => {
        elementHeart.classList.add('element__heart_like');
        countLikes(card, elementCountLike);
      })
  } else {
    api.deleteCardLike({_id: cardId})
      .then(card => {
        elementHeart.classList.remove('element__heart_like');
        countLikes(card, elementCountLike);
      })
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


// Avatar
//-----------------------------------------------------------------------------------------------------------------------------------
//Создание инстанса для попапа формы Avatar
const buttonFormAvatarSubmit = document.querySelector('.popup-avatar').querySelector('.form__submit');
const popupAvatarMesto = new PopupWithForm('.popup-avatar', avatarFormSubmitHandler);
popupAvatarMesto.setEventListeners();

// Обработка submit формы Avatar
function avatarFormSubmitHandler(data) {
  buttonFormAvatarSubmit.innerText = 'Сохранение...'
  buttonFormAvatarSubmit.setAttribute("disabled", "disabled");
  api.setUserAvatar({avatar: data.avatar_mesto})
    .then(user => {
      mestoUserInfo.setUserAvatar(user.avatar);
      buttonFormAvatarSubmit.innerText = 'Сохранить';
      buttonFormAvatarSubmit.removeAttribute("disabled");
    })
  popupAvatarMesto.close();
}

// Обработка клика на аватаре
const editAvatar = document.querySelector('.profile__avatar-cover');
editAvatar.addEventListener('click', () => {
  popupAvatarMesto.open();
  validateFormAvatar.resetValidation();
});
//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


//  Удаление карточки
//-----------------------------------------------------------------------------------------------------------------------------------
//Создание инстанса для попапа формы Delete
const popupDeleteMesto = new PopupConfirm('.popup-delete', deleteFormSubmitHandler);
popupDeleteMesto.setEventListeners();

// Обработка клика на корзине в карточке
function handleDeleteCard(element, id) {
  popupDeleteMesto.open(element, id);
}

function deleteFormSubmitHandler(element, id) {
  api.deleteCards({_id: id})
    .then(() => {
      element.remove()
    })
  popupDeleteMesto.close();
}

//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------


// Начальная загрузка данных с сервера
//-----------------------------------------------------------------------------------------------------------------------------------
// Инфо пользователя
//-----------------------------
api.getInitialUserInfo().then(user => {
  mestoUserInfo.setUserInfo(user.name, user.about);
  mestoUserInfo.setUserAvatar(user.avatar);
})
// Карточки
//-----------------------------
api.getInitialCards().then(cards => {
  addSection.addCardsToDom(cards);
})
















