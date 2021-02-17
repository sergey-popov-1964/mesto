import initialCards from './initial-сards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const buttonFormEditOpen = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const buttonFormAddOpen = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');

// Переменные для формы увеличенного просмотра картинки
const popupZoomImage = document.querySelector('.popup-image');
const zoomImageForm = popupZoomImage.querySelector('.zoom-img');
const zoomImageImg = zoomImageForm.querySelector('.zoom-img__img');
const zoomImageText = zoomImageForm.querySelector('.zoom-img__text');
const zoomImageClose = zoomImageForm.querySelector('.zoom-img__close');

const popupElements = document.querySelectorAll('.popup');

// Переменные для формы Edit
const formEdit = document.forms.form_edit;
const nameInput = formEdit.elements.edit_name_avatar;
const jobInput = formEdit.elements.edit_job;
const buttonFormEditClose = formEdit.elements.form_close;

// Переменные для формы Add
const formAdd = document.forms.form__add;
const placeNameInput = formAdd.elements.add_name_mesto;
const placeLinkInput = formAdd.elements.add_name_link;
const buttonFormAddClose = formAdd.elements.form_close;

// Закрытие попапов при нажатии клавишт Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_active'));
  }
}

// Функция открытия попапа с формой
export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupEsc);
};

// Функция закрытия попапа с формой
function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupEsc);
};

// Обработка формы Edit
function editProfileSubmitHandler(evt) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

// Обраблтка клика на изображении в карточке
function handleCardClick(name, link) {
  zoomImageImg.src = link
  zoomImageText.textContent = name
  zoomImageImg.alt = name;
  openPopup(popupZoomImage)
}

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

// Обработка формы Add
function addFormSubmitHandler(evt) {
  const newMesto = {};
  newMesto.name = placeNameInput.value;
  newMesto.link = placeLinkInput.value;
  addCard(createCard(newMesto));
  closePopup(popupAdd);
};

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', () => {
  clearErrorMessage(formEdit, configValidation)
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Слушатель клика на кнопке закрытия формы Edit
buttonFormEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
});

// Слушатель клика отправки формы Edit
formEdit.addEventListener('submit', editProfileSubmitHandler);

// Слушатель клика на кнопке Add
buttonFormAddOpen.addEventListener('click', () => {
  formAdd.reset();
  clearErrorMessage(formAdd, configValidation)
  openPopup(popupAdd);
});

// Слушатель клика на кнопке закрытия формы Add
buttonFormAddClose.addEventListener('click', () => {
  closePopup(popupAdd);
});

// Слушатель клика отправки формы Add
formAdd.addEventListener('submit', addFormSubmitHandler);

// Слушатель клика на кнопке закрытия формы Zoom
zoomImageClose.addEventListener('click', () => {
  closePopup(popupZoomImage);
});

// Закрытие попапов при клике на оверлей
popupElements.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
});

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
