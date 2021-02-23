import initialCards from './initial-сards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';

const popupAddMesto = new Popup('.popup-add');
const popupEditProfile = new Popup('.popup-edit');
const popupPreviewImage = new Popup('.popup-image');



const buttonFormEditOpen = document.querySelector('.profile__button-edit');
// const popupEdit = document.querySelector('.popup-edit');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const buttonFormAddOpen = document.querySelector('.profile__button-add');
// const popupAdd = document.querySelector('.popup-add');

// Переменные для формы увеличенного просмотра картинки
const popupZoomImage = document.querySelector('.popup-image');
const zoomImageForm = popupZoomImage.querySelector('.zoom-img');
const zoomImageImg = zoomImageForm.querySelector('.zoom-img__img');
const zoomImageText = zoomImageForm.querySelector('.zoom-img__text');
const zoomImageClose = zoomImageForm.querySelector('.zoom-img__close');

// const popupElements = document.querySelectorAll('.popup');

// Переменные для формы Edit
const formEdit = document.forms.form_edit;
const nameInput = formEdit.elements.edit_name_avatar;
const jobInput = formEdit.elements.edit_job;
// const buttonFormEditClose = formEdit.elements.form_close;

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
  zoomImageImg.src = link
  zoomImageText.textContent = name
  zoomImageImg.alt = name;
  popupPreviewImage.open();
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

// Слушатель клика отправки формы Edit
formEdit.addEventListener('submit', editProfileSubmitHandler);

// Слушатель клика на кнопке Add
buttonFormAddOpen.addEventListener('click', () => {
  formAdd.reset();
  clearErrorMessage(formAdd, configValidation)
  popupAddMesto.open();
});

// Слушатель клика отправки формы Add
formAdd.addEventListener('submit', addFormSubmitHandler);

// Слушатель клика на кнопке закрытия формы Zoom
zoomImageClose.addEventListener('click', () => {
  popupPreviewImage.close();
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



