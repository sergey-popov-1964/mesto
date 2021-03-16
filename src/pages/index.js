import initialCards from '../components/initial-сards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';

import './index.css'

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

//-------------------------------------------------------------------------------
// Создание новых объектов
//-------------------------------------------------------------------------------
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

//Создание инстанса для попапа формы Add
const popupAddMesto = new PopupWithForm('.popup-add', addFormSubmitHandler);
popupAddMesto.setEventListeners();

//Создание инстанса для попапа формы Edit
const popupEditProfile = new PopupWithForm('.popup-edit', editProfileSubmitHandler);
popupEditProfile.setEventListeners();

//Создание инстанса для попапа формы Avatar
const popupAvatarMesto = new PopupWithForm('.popup-avatar', avatarFormSubmitHandler);
popupAvatarMesto.setEventListeners();

//Создание инстанса для попапа формы Delete
const popupDeleteMesto = new PopupConfirm('.popup-delete', deleteFormSubmitHandler);
popupDeleteMesto.setEventListeners();

const popupPreviewImage = new PopupWithImage('.popup-image');
popupPreviewImage.setEventListeners();

const mestoUserInfo = new UserInfo({name: '.profile__name', info: '.profile__job'});

const addSection = new Section({data: initialCards, renderer: createCard}, '.elements__list');

// Переменные для формы Edit
const buttonFormEditOpen = document.querySelector('.profile__button-edit');
const formEdit = document.forms.form__edit;
const nameInput = formEdit.elements.edit_name_avatar;
const jobInput = formEdit.elements.edit_job;

// Переменные для формы Add
const buttonFormAddOpen = document.querySelector('.profile__button-add');

// Обработка submit формы Edit
function editProfileSubmitHandler(data) {
  mestoUserInfo.setUserInfo(data.edit_name_avatar, data.edit_job);
  popupEditProfile.close();
}

// Обработка submit формы Add
function addFormSubmitHandler(data) {
  const newMesto = {};
  newMesto.name = data.add_name_mesto;
  newMesto.link = data.add_name_link;
  addSection.addItem(createCard(newMesto));
  popupAddMesto.close();
}

// Обработка submit формы Avatar
function avatarFormSubmitHandler(data) {
  popupAvatarMesto.close();
}
function deleteFormSubmitHandler(data) {
  console.log(data)
  data.remove()
  popupDeleteMesto.close();
}

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', () => {
  const objUserInfo = mestoUserInfo.getUserInfo();
  nameInput.value = objUserInfo.name;
  jobInput.value = objUserInfo.info;
  popupEditProfile.open();
  validateFormEdit.resetValidation();
});

// Слушатель клика на кнопке Add
buttonFormAddOpen.addEventListener('click', () => {
  popupAddMesto.open();
  validateFormAdd.resetValidation();
});

// Обработка клика на изображении в карточке
function handleCardClick(name, link) {
  popupPreviewImage.open(name, link);
}

// Обработка клика на корзине в карточке
function handleDeleteCard(data) {
  popupDeleteMesto.open(data);
}

//-------------------------------------------------------------------------------
// Добавление карточек в DOM
//-------------------------------------------------------------------------------

// Возвращает новую карточку
function createCard(newMesto) {
  const card = new Card(newMesto, '.element-mesto', handleCardClick, handleDeleteCard);
  return card.generateMesto();
}

//Добавление в DOM первоначального массива карточек
addSection.addCardsToDom();


const editAvatar = document.querySelector('.profile__avatar-cover');

editAvatar.addEventListener('click', () => {
  popupAvatarMesto.open();
  validateFormAvatar.resetValidation();
});

