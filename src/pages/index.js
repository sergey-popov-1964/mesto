import {renderLoading} from '../components/util.js';

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

const FormAdd = document.querySelector('.popup-add').querySelector('.form');
const FormEdit = document.querySelector('.popup-edit').querySelector('.form');
const FormAvatar = document.querySelector('.popup-avatar').querySelector('.form');

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
const validateFormAdd = validatorList[FormAdd.name];
const validateFormEdit = validatorList[FormEdit.name];
const validateFormAvatar = validatorList[FormAvatar.name];

// Константы для API
const authorization = {authorization: 'be1a7eff-1608-42e4-ab79-a96e12a8c4b6', 'Content-Type': 'application/json'};
const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-21';
const user_ID = '3e2a74326fac3d4d7e8ff79b';
const api = new Api(baseUrl, authorization);

// Возвращает новую карточку
const elementMestoSelector = '.element-mesto';

function createCard(newMesto) {
  const card = new Card(newMesto, elementMestoSelector, handleCardClick, handleDeleteCard, handleLikeClick, user_ID);
  return card.generateMesto();
}

const elementListSelector = '.elements__list';
const cardsSection = new Section({renderer: createCard}, elementListSelector);

// форма Add
//Создание инстанса для попапа формы Add

const elementPopupAddSelector = '.popup-add';
const popupAddMesto = new PopupWithForm(elementPopupAddSelector, addFormSubmitHandler);
popupAddMesto.setEventListeners();

const buttonFormAddOpen = document.querySelector('.profile__button-add');
const buttonFormAddSubmit = document.querySelector('.popup-add').querySelector('.form__submit');
buttonFormAddOpen.addEventListener('click', () => {
  popupAddMesto.open();
  validateFormAdd.resetValidation();
});

// Обработка submit формы Add
function addFormSubmitHandler(data) {
  renderLoading(buttonFormAddSubmit, 'Создание...', 'disabled');
  api.addCard({name: data.add_name_mesto, link: data.add_name_link})
    .then(card => {
      cardsSection.addItem(createCard(card));
      renderLoading(buttonFormAddSubmit, 'Создать', 'enabled');
      popupAddMesto.close();
    })
    .catch(() => console.log(`Ошибка при создании карточки`))
    .finally(() => {
      renderLoading(buttonFormAddSubmit, 'Создать', 'enabled');
      popupAddMesto.close();
    });
}

// форма Edit. Инфо профиля
// Переменные для формы Edit
const buttonFormEditOpen = document.querySelector('.profile__button-edit');
const formEdit = document.forms.form__edit;
const nameInput = formEdit.elements.edit_name_avatar;
const jobInput = formEdit.elements.edit_job;
const buttonSubmit = formEdit.elements.form_submit;

//Создание инстанса для попапа формы Edit
const elementPopupEditSelector = '.popup-edit';
const popupEditProfile = new PopupWithForm(elementPopupEditSelector, editProfileSubmitHandler);
popupEditProfile.setEventListeners();

const elementProfileNameSelector = '.profile__name';
const elementProfileJobSelector = '.profile__job';
const elementProfileAvatarSelector = '.profile__avatar';
const mestoUserInfo = new UserInfo(elementProfileNameSelector, elementProfileJobSelector, elementProfileAvatarSelector);

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
  renderLoading(buttonSubmit, 'Сохранение...', 'disabled');
  api.setUserInfo({name: data.edit_name_avatar, about: data.edit_job})
    .then(user => {
      mestoUserInfo.setUserInfo(user.name, user.about);
    })
    .catch(() => console.log(`Ошибка при сохранении профиля пользователя`))
    .finally(() => {
      renderLoading(buttonSubmit, 'Сохранить.', 'enabled');
      popupEditProfile.close();
    });
}

// Превью изображения в карточке
const elementPopupImageSelector = '.popup-image';
const popupPreviewImage = new PopupWithImage(elementPopupImageSelector);
popupPreviewImage.setEventListeners();

// Обработка клика на изображении в карточке
function handleCardClick(name, link) {
  popupPreviewImage.open(name, link);
}

// Клик на лайк
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
      .catch(() => console.log(`Ошибка при удалении лайка`));
  } else {
    api.deleteCardLike({_id: cardId})
      .then(card => {
        elementHeart.classList.remove('element__heart_like');
        countLikes(card, elementCountLike);
      })
      .catch(() => console.log(`Ошибка при установке лайка`));
  }
}

// Avatar
//Создание инстанса для попапа формы Avatar
const buttonFormAvatarSubmit = document.querySelector('.popup-avatar').querySelector('.form__submit');
const elementPopupAvatarSelector = '.popup-avatar';
const popupAvatarMesto = new PopupWithForm(elementPopupAvatarSelector, avatarFormSubmitHandler);
popupAvatarMesto.setEventListeners();

// Обработка submit формы Avatar
function avatarFormSubmitHandler(data) {
  renderLoading(buttonFormAvatarSubmit, 'Сохранение...', 'disabled');
  api.setUserAvatar({avatar: data.avatar_mesto})
    .then(user => {
      mestoUserInfo.setUserAvatar(user.avatar);
    })
    .catch(() => console.log(`Ошибка при сохранении аватара`))
    .finally(() => {
      renderLoading(buttonFormAvatarSubmit, 'Сохранить', 'enabled');
      popupAvatarMesto.close();
    });
}

// Обработка клика на аватаре
const editAvatar = document.querySelector('.profile__avatar-cover');
editAvatar.addEventListener('click', () => {
  popupAvatarMesto.open();
  validateFormAvatar.resetValidation();
});

//  Удаление карточки
//Создание инстанса для попапа формы Delete
const buttonFormDeleteSubmit = document.querySelector('.popup-delete').querySelector('.form__submit');
const elementPopupDeleteSelector = '.popup-delete';
const popupDeleteMesto = new PopupConfirm(elementPopupDeleteSelector, deleteFormSubmitHandler);
popupDeleteMesto.setEventListeners();

// Обработка клика на корзине в карточке
function handleDeleteCard(element, id) {
  popupDeleteMesto.open(element, id);
}

function deleteFormSubmitHandler(element, id) {
  renderLoading(buttonFormDeleteSubmit, 'Удаление...', 'disabled');
  api.deleteCards({_id: id})
    .then(() => {
      element.remove();
    })
    .catch(() => console.log(`Ошибка при удалении карточки`))
    .finally(() => {
      renderLoading(buttonFormDeleteSubmit, 'Да', 'enabled');
      popupDeleteMesto.close();
    });
}

// Начальная загрузка данных с сервера
Promise.all([api.getInitialUserInfo(), api.getInitialCards()])
  .then(data => {
    mestoUserInfo.setUserInfo(data[0].name, data[0].about);
    mestoUserInfo.setUserAvatar(data[0].avatar);
    const reversCard = data[1].reverse();
    cardsSection.addCardsToDom(reversCard);
  })
  .catch(() => console.log(`Ошибка загрузки данных с сервера`));










