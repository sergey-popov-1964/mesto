import initialCards from './initial-сards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';




//-------------------------------------------------------------------------------
// Создание новых объектов
//-------------------------------------------------------------------------------
const popupAddMesto = new PopupWithForm('.popup-add', addFormSubmitHandler);
popupAddMesto._setEventListeners();

const popupEditProfile = new PopupWithForm('.popup-edit', editProfileSubmitHandler);
popupEditProfile._setEventListeners();

const popupPreviewImage = new PopupWithImage('.popup-image');
popupPreviewImage._setEventListeners();




const buttonFormEditOpen = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const buttonFormAddOpen = document.querySelector('.profile__button-add');

// Переменные для формы Edit
const formEdit = document.forms.form_edit;
const nameInput = formEdit.elements.edit_name_avatar;
const jobInput = formEdit.elements.edit_job;

// Переменные для формы Add
const formAdd = document.forms.form__add;
const placeNameInput = formAdd.elements.add_name_mesto;
const placeLinkInput = formAdd.elements.add_name_link;

// Обработка формы Edit
function editProfileSubmitHandler(evt) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupEditProfile.close();
};

// Обраблтка клика на изображении в карточке
function handleCardClick(name, link) {
  popupPreviewImage.open(name, link);
}

// Обработка формы Add
function addFormSubmitHandler(evt) {
  const newMesto = {};
  newMesto.name = placeNameInput.value;
  newMesto.link = placeLinkInput.value;
  addCard(createCard(newMesto));
  popupAddMesto.close();
};

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', () => {
  clearErrorMessage(formEdit, configValidation)
  popupEditProfile.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Слушатель клика на кнопке Add
buttonFormAddOpen.addEventListener('click', () => {
  clearErrorMessage(formAdd, configValidation)
  popupAddMesto.open();
});

//-------------------------------------------------------------------------------
// Добавление карточек в DOM
//-------------------------------------------------------------------------------

// Поиск DOM элемента - список карточек
const listMesto = document.querySelector('.elements__list');

// Возвращает новую карточку
function createCard(newMesto) {
  const card = new Card(newMesto, '.element-mesto', handleCardClick);
  const mestoElement = card.generateMesto();
  return mestoElement;
}

// Функция добавления карточки в DOM
function addCard(card) {
  listMesto.prepend(card);
}

// Начальная загрузка карточек в DOM
initialCards.forEach(function (item) {
  addCard(createCard(item));
});


//-------------------------------------------------------------------------------
// Для вадидации
//-------------------------------------------------------------------------------

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
});

// подготовка полей и submit при повторном вызове формы
function clearErrorMessage(formElement, configValidation) {
  formElement.querySelector(configValidation.submitButtonSelector).classList.add(configValidation.inactiveButtonClass)
  formElement.querySelector(configValidation.submitButtonSelector).setAttribute("disabled", "disabled");
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.classList.remove(configValidation.inputErrorClass);
    inputElement.nextElementSibling.classList.remove(configValidation.errorClass);
    inputElement.nextElementSibling.textContent = '';
  });
}



