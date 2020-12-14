// Переменные для формы Edit
let popupEdit = document.querySelector('.popup_form_edit');
let buttonFormEditOpen = document.querySelector('.profile__button-edit');
let buttonFormEditClose = document.querySelector('.form__close_edit');
let formEditElement = document.querySelector('.form_edit')


let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form__input_edit_name');
let jobInput = document.querySelector('.form__input_edit_job');

// Открытие/закрытие попапа с формой
function openClosePopup(formName) {
  formName.classList.toggle('popup_active');
};

// Обработка формы Edit
function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openClosePopup(popupEdit);
};

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openClosePopup(popupEdit);
}, false);

// Слушатель клика на кнопке закрытия формы Edit
buttonFormEditClose.addEventListener('click', function () {
  openClosePopup(popupEdit);
}, false);

// Слушатель клика на кнопке Сохранить формы Edit
formEditElement.addEventListener('submit', formEditSubmitHandler);

