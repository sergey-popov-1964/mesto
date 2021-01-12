// Переменные для формы Edit
const buttonFormEditOpen = document.querySelector('.profile__button-edit');
const popupEdit = document.querySelector('.popup-edit');
const formEditElement = popupEdit.querySelector('.form')
const buttonFormEditClose = formEditElement.querySelector('.form__close');


let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
const nameInput = formEditElement.querySelector('.form__input_edit_name');
const jobInput = formEditElement.querySelector('.form__input_edit_job');

// Переменные для формы Add
const buttonFormAddOpen = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup-add');
const formAddElement = popupAdd.querySelector('.form');
const buttonFormAddClose = formAddElement.querySelector('.form__close');

let placeNameInput = formAddElement.querySelector('.form__input_add_name');
let placeLinkInput = formAddElement.querySelector('.form__input_add_link');

// Переменные для формы увеличенного просмотра картинки
const popupZoomImage = document.querySelector('.popup-image');
const zoomImageForm = popupZoomImage.querySelector('.zoom-img');
const zoomImageImg = zoomImageForm.querySelector('.zoom-img__img');
const zoomImageText = zoomImageForm.querySelector('.zoom-img__text');
const zoomImageClose = zoomImageForm.querySelector('.zoom-img__close');

// Функция открытия попапа с формой
function openForm(nameForm) {
  nameForm.closest('.popup').classList.add('popup_active');
};

// Функция закрытия попапа с формой
function closeForm(nameForm) {
  nameForm.closest('.popup').classList.remove('popup_active');
};

// Обработка формы Edit
function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeForm(formEditElement);
};

// Поиск DOM элемента - список карточек
const listMesto = document.querySelector('.elements__list');

// Объявление массива карточек для начальной загрузки
const initialCards = [{
    name: 'Санкт-Петербург',
    link: 'https://cdn.pixabay.com/photo/2017/06/12/16/21/russia-2396022_1280.jpg'
  },
  {
    name: 'Казань',
    link: 'https://cdn.pixabay.com/photo/2018/03/15/10/54/kazan-3227834_1280.jpg'
  },
  {
    name: 'Владимир',
    link: 'https://cdn.pixabay.com/photo/2018/06/14/13/11/architecture-3474841_1280.jpg'
  },
  {
    name: 'Псков',
    link: 'https://cdn.pixabay.com/photo/2017/09/04/08/46/pskov-2713252_1280.jpg'
  },
  {
    name: 'Новгород',
    link: 'https://cdn.pixabay.com/photo/2018/03/23/16/44/architecture-3254225_1280.jpg'
  },
  {
    name: 'Волгоград',
    link: 'https://cdn.pixabay.com/photo/2020/05/04/04/07/monument-5127638_1280.jpg'
  }
];

// функция для добавления в DOM по tenmplate карточек и слушателей
function addMesto(mestoValue) {
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
    if (evt.target == evt.currentTarget) {
      zoomImageImg.setAttribute("src", mestoValue.link);
      zoomImageText.textContent = mestoValue.name;
      openForm(zoomImageForm);
    }
  });

  // Добавление template в DOM
  listMesto.prepend(mestoElement);
}

// Начальная загрузка карточек в DOM
initialCards.forEach(addMesto);

// Обработка формы Add
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  let newMesto = [];
  newMesto.name = placeNameInput.value;
  newMesto.link = placeLinkInput.value;
  addMesto(newMesto);
  closeForm(formAddElement);
};

// --------------------------------------------------------
// Объявления слушателей

// Слушатель клика на кнопке Edit
buttonFormEditOpen.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openForm(formEditElement)
});

// Слушатель клика на кнопке закрытия формы Edit
buttonFormEditClose.addEventListener('click', () => {
  closeForm(formEditElement)
});

// Слушатель клика отправки формы Edit
formEditElement.addEventListener('submit', formEditSubmitHandler);

// Слушатель клика на кнопке Add
buttonFormAddOpen.addEventListener('click', () => {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  openForm(formAddElement)
});

// Слушатель клика на кнопке закрытия формы Add
buttonFormAddClose.addEventListener('click', () => {
  closeForm(formAddElement)
});

// Слушатель клика отправки формы Add
formAddElement.addEventListener('submit', formAddSubmitHandler);

// Слушатель клика на кнопке закрытия формы Zoom
zoomImageClose.addEventListener('click', () => {
  closeForm(zoomImageForm)
});
