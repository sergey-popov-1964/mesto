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

// Закрытие попапов при нажатии клавишт Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_active'));
  }
}

// Функция открытия попапа с формой
function openPopup(popup) {
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

// Удаление карточки
function handleDeleteCard(evt) {
  evt.target.closest('.element').remove();
};

// Установка лайка
function handleLikeIcon(evt) {
  evt.target.classList.toggle('element__heart_like')
};

// Превью увеличенного изображения
function handlePreviewPicture(link, name) {
  zoomImageImg.setAttribute("src", link);
  zoomImageText.textContent = name;
  zoomImageImg.setAttribute("alt", name);
  openPopup(popupZoomImage);
};

// функция создания по tenmplate карточек и слушателей
function createCard(mestoValue) {
  const mestoTemplate = document.querySelector('#element-mesto').content;
  const mestoElement = mestoTemplate.cloneNode(true);
  const mestoElementImage = mestoElement.querySelector('.element__img');

  // Присваивание аттрибутов (ссылки на изображение и наименования места)
  mestoElementImage.setAttribute("style", "background-image: url(" + mestoValue.link + ")");
  mestoElement.querySelector('.element__text').textContent = mestoValue.name;

  // Слушатели лайка, удаления карточки и превью увеличенного изображения
  mestoElement.querySelector('.element__heart').addEventListener('click', handleLikeIcon);

  mestoElement.querySelector('.element__trash').addEventListener('click', handleDeleteCard);

  mestoElementImage.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      handlePreviewPicture(mestoValue.link, mestoValue.name);
    }
  });

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
  clearErrorMessage(formEdit, {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_active'
  })
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
  clearErrorMessage(formAdd, {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_active'
  })
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
