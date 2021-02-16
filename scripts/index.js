import initialCards from './initial-сards.js';
import Card from './Card.js';


const buttonFormEditOpen = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const buttonFormAddOpen = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');

// Переменные для формы увеличенного просмотра картинки
export const popupZoomImage = document.querySelector('.popup-image');
const zoomImageForm = popupZoomImage.querySelector('.zoom-img');
export const zoomImageImg = zoomImageForm.querySelector('.zoom-img__img');
export const zoomImageText = zoomImageForm.querySelector('.zoom-img__text');
const zoomImageClose = zoomImageForm.querySelector('.zoom-img__close');

const popupElement = document.querySelectorAll('.popup');


// Переменные для формы Edit
const formEdit = document.forms.form_edit;
const nameInput = formEdit.elements.edit_name_avatar;
const jobInput = formEdit.elements.edit_job;
const buttonFormEditSubmit = formEdit.elements.form_submit;
const buttonFormEditClose = formEdit.elements.form_close;

// Переменные для формы Add
const formAdd = document.forms.form__add;
const placeNameInput = formAdd.elements.add_name_mesto;
const placeLinkInput = formAdd.elements.add_name_link;
const buttonFormAddSubmit = formAdd.elements.form_submit;
const buttonFormAddClose = formAdd.elements.form_close;

export const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};

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

// Поиск DOM элемента - список карточек
const listMesto = document.querySelector('.elements__list');

// Функция добавления карточки в DOM
function addCard(newMesto) {
  const card = new Card(newMesto);
  const mestoElement = card.generateMesto();
  listMesto.prepend(mestoElement);
}

// Начальная загрузка карточек в DOM
initialCards.forEach(function (item) {
  const card = new Card(item);
  const mestoElement = card.generateMesto();
  listMesto.prepend(mestoElement);
});

// Обработка формы Add
function addFormSubmitHandler(evt) {
  const newMesto = {};
  newMesto.name = placeNameInput.value;
  newMesto.link = placeLinkInput.value;
  addCard(newMesto);
  closePopup(popupAdd);
};

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', () => {
  // clearErrorMessage(formEdit, configValidation)
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
  // clearErrorMessage(formAdd, configValidation)
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
popupElement.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
});
