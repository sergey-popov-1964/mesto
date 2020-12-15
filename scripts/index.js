// Переменные для формы Edit
let popupEdit = document.querySelector('.popup');
let buttonFormEditOpen = document.querySelector('.profile__button-edit');
let buttonFormEditClose = document.querySelector('.form-edit__close');
let formEditElement = document.querySelector('.form-edit')

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.form-edit__name');
let jobInput = document.querySelector('.form-edit__job');

// Функция открытия попапа с формой
function openFormEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupEdit.classList.add('popup_active');
};

// Функция закрытия попапа с формой
function closeFormEdit() {
  popupEdit.classList.remove('popup_active');
};

// Обработка формы Edit
function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeFormEdit();
};

// --------------------------------------------------------
// Объявления слушателей

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', openFormEdit);

// Слушатель клика на кнопке закрытия формы Edit
buttonFormEditClose.addEventListener('click', closeFormEdit);

// Слушатель клика отправки формы Edit
formEditElement.addEventListener('submit', formEditSubmitHandler);
