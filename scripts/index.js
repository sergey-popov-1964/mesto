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
  const newMesto = {};
  newMesto.name = placeNameInput.value;
  newMesto.link = placeLinkInput.value;
  addCard(createCard(newMesto));
  closePopup(popupAdd);
};

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', () => {
  clearErrorMessage(formEdit)
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
  clearErrorMessage(formAdd)
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

// Закрытие попапов при клике на оверлей
popupElement.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    }
  });
});

// Закрытие попапов при нажатии клавишт Esc
document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_active'));
  }
})


