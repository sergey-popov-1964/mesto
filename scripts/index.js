// Переменные для формы Edit
const buttonFormEditOpen = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const formEditElement = popupEdit.querySelector('.form')
const buttonFormEditClose = formEditElement.querySelector('.form__close');


const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// const nameInput = formEditElement.querySelector('.form__input_edit_name');
// const jobInput = formEditElement.querySelector('.form__input_edit_job');

// Переменные для формы Add
const buttonFormAddOpen = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');
const formAddElement = popupAdd.querySelector('.form');
const buttonFormAddClose = formAddElement.querySelector('.form__close');

// const placeNameInput = formAddElement.querySelector('.form__input_add_name');
// const placeLinkInput = formAddElement.querySelector('.form__input_add_link');

// Переменные для формы увеличенного просмотра картинки
const popupZoomImage = document.querySelector('.popup-image');
const zoomImageForm = popupZoomImage.querySelector('.zoom-img');
const zoomImageImg = zoomImageForm.querySelector('.zoom-img__img');
const zoomImageText = zoomImageForm.querySelector('.zoom-img__text');
const zoomImageClose = zoomImageForm.querySelector('.zoom-img__close');

const popupElement = document.querySelectorAll('.popup');

const formEdit = document.forms.formedit;
const nameInput = formEdit.elements.nameavatar;
const jobInput = formEdit.elements.job;
const buttonFormEditSave = formEdit.elements.editsave;

const formAdd = document.forms.formadd;
const placeNameInput = formAdd.elements.namemesto;
const placeLinkInput = formAdd.elements.link;
const buttonFormAddSave = formAdd.elements.addsave;

// Функция открытия попапа с формой
function openPopup(popup) {
  popup.classList.add('popup_active');
};

// Функция закрытия попапа с формой
function closePopup(popup) {
  popup.classList.remove('popup_active');
};

// Обработка формы Edit
function editProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

// Поиск DOM элемента - список карточек
const listMesto = document.querySelector('.elements__list');

// функция создания по tenmplate карточек и слушателей
function createCard(mestoValue) {
  const mestoTemplate = document.querySelector('#element-mesto').content;
  const mestoElement = mestoTemplate.cloneNode(true);
  const mestoElementImage = mestoElement.querySelector('.element__img');

  // Присваивание аттрибутов (ссылки на изображение и наименования места)
  mestoElementImage.setAttribute("style", "background-image: url(" + mestoValue.link + ")");
  mestoElement.querySelector('.element__text').textContent = mestoValue.name;

  // Слушатель клика на лайке
  mestoElement.querySelector('.element__heart').addEventListener('click', evt => {
    evt.target.classList.toggle('element__heart_like');
  });

  // Слушатель клика на корзине удаления
  mestoElement.querySelector('.element__trash').addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  // Слушатель клика на изображении для просмотра увеличенного изображения
  mestoElementImage.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      zoomImageImg.setAttribute("src", mestoValue.link);
      zoomImageText.textContent = mestoValue.name;
      zoomImageImg.setAttribute("alt", mestoValue.name);
      openPopup(popupZoomImage);
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
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const newMesto = {};
  newMesto.name = placeNameInput.value;
  newMesto.link = placeLinkInput.value;
  addCard(createCard(newMesto));
  closePopup(popupAdd);
  setSubmitButtonState(buttonFormAddSave, false);
};

function setSubmitButtonState(button, isFormValid) {
  if (isFormValid) {
    button.removeAttribute('disabled');
    button.classList.remove('form__save_disabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.add('form__save_disabled');
  }
}

// --------------------------------------------------------
// Объявления слушателей

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

// Слушатель клика на кнопке закрытия формы Edit
buttonFormEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
});

// Слушатель клика отправки формы Edit
formEdit.addEventListener('submit', editProfileSubmitHandler);

// Слушатель клика на кнопке Add
buttonFormAddOpen.addEventListener('click', () => {
  // placeNameInput.value = "";
  // placeLinkInput.value = "";
  formAdd.reset();
  openPopup(popupAdd);
});

// Слушатель клика на кнопке закрытия формы Add
buttonFormAddClose.addEventListener('click', () => {
  closePopup(popupAdd);
});

// Слушатель клика отправки формы Add
formAdd.addEventListener('submit', formAddSubmitHandler);

// Слушатель клика на кнопке закрытия формы Zoom
zoomImageClose.addEventListener('click', () => {
  closePopup(popupZoomImage);
});

// Закрытие попапов при нажатии клавишт Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_active'));
  }
})

// Слушатель инпутов формы Add
formAdd.addEventListener('input', evt => {
  console.log(evt.target.validity.valid);
   const isValid = placeNameInput.value.length > 0 && placeLinkInput.value.length > 0;
   setSubmitButtonState(buttonFormAddSave, isValid);
})

// Слушатель инпутов формы Edit
formEdit.addEventListener('input', evt => {
  const isValid = nameInput.value.length > 0 && jobInput.value.length > 0;
  setSubmitButtonState(buttonFormEditSave, isValid);
})
