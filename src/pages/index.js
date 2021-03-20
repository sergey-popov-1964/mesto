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
  const card = new Card(newMesto, '.element-mesto', handleCardClick, handleDeleteCard);
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
buttonFormAddOpen.addEventListener('click', () => {
  popupAddMesto.open();
  validateFormAdd.resetValidation();
});

// Обработка submit формы Add
function addFormSubmitHandler(data) {
  api.setCards({name: data.add_name_mesto, link: data.add_name_link})
    .then(card => {
      addSection.addItem(createCard(card));
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
  api.setUserInfo({name: data.edit_name_avatar, about: data.edit_job})
    .then(user => mestoUserInfo.setUserInfo(user.name, user.about))
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


// Avatar
//-----------------------------------------------------------------------------------------------------------------------------------
//Создание инстанса для попапа формы Avatar
const popupAvatarMesto = new PopupWithForm('.popup-avatar', avatarFormSubmitHandler);
popupAvatarMesto.setEventListeners();

// Обработка submit формы Avatar
function avatarFormSubmitHandler(data) {
  api.setUserAvatar({avatar: data.avatar_mesto})
    .then(user => mestoUserInfo.setUserAvatar(user.avatar))
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
















