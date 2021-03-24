(()=>{"use strict";function e(e,t,n){e.innerText=t,"disabled"===n?e.setAttribute("disabled","disabled"):e.removeAttribute("disabled")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var n=function(){function e(t,n,r,o,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userID=a,this._name=t.name,this._link=t.link,this._cardID=t._id,this._ownerID=t.owner._id,this._cardSelector=n,this._handleCardClick=r,this._handleDeleteCard=o,this._handleLikeClick=i,this._likes=Array.from(t.likes).map((function(e){return e._id}))}var n,r;return n=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._elementHeart.addEventListener("click",(function(){e._handleLikeClick(e._element,e._cardID)})),this._elementTrash&&this._elementTrash.addEventListener("click",(function(){e._handleDeleteCard(e._element,e._cardID)})),this._elementImage.addEventListener("click",(function(t){t.target===t.currentTarget&&e._handleCardClick(e._name,e._link)}))}},{key:"generateMesto",value:function(){return this._element=this._getTemplate(),this._elementTrash=this._element.querySelector(".element__trash"),this._elementImage=this._element.querySelector(".element__img"),this._elementHeart=this._element.querySelector(".element__heart"),this._ownerID!==this._userID&&this._elementTrash.remove(),this._setEventListeners(),this._elementImage.style.backgroundImage="url("+this._link+")",this._elementImage.alt=this._name,this._element.querySelector(".element__text").textContent=this._name,this._likes.length>0&&(this._element.querySelector(".element__counter-like").textContent=this._likes.length.toString(),this._likes.includes(this._userID)&&this._elementHeart.classList.add("element__heart_like")),this._element}}])&&t(n.prototype,r),e}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}var t,n;return t=e,(n=[{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled","disabled")):(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"enableValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))}))}}])&&r(t.prototype,n),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userNameSelector=document.querySelector(t),this._userInfoSelector=document.querySelector(n),this._userAvatarSelector=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userNameSelector.textContent,info:this._userInfoSelector.textContent,avatar:this._userAvatarSelector.src}}},{key:"setUserInfo",value:function(e,t){e&&(this._userNameSelector.textContent=e),t&&(this._userInfoSelector.textContent=t)}},{key:"setUserAvatar",value:function(e){e&&(this._userAvatarSelector.src=e)}}])&&i(t.prototype,n),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._itemSelector=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._itemSelector.prepend(e)}},{key:"addCardsToDom",value:function(e){var t=this;e.forEach((function(e){t.addItem(t._renderer(e))}))}}])&&c(t.prototype,n),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._popupCloseButton=document.querySelector(t).querySelector(".popup__close"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"open",value:function(){this._popupElement.classList.add("popup_active"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_active"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popupCloseButton.addEventListener("click",(function(){e.close()})),this._popupElement.addEventListener("click",(function(t){t.target===t.currentTarget&&e.close()}))}}])&&s(t.prototype,n),e}();function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return m(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._previewImg=t._popupElement.querySelector(".zoom-img__img"),t._previewText=t._popupElement.querySelector(".zoom-img__text"),t}return t=a,(n=[{key:"open",value:function(e,t){p(d(a.prototype),"open",this).call(this),this._previewImg.src=t,this._previewImg.alt=e,this._previewText.textContent=e}}])&&h(t.prototype,n),a}(l);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e,t,n){return(g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function S(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e)).submitHandler=t,n._formElement=n._popupElement.querySelector(".form"),n._inputList=Array.from(n._formElement.querySelectorAll(".form__input")),n}return t=a,(n=[{key:"setEventListeners",value:function(){var e=this;g(k(a.prototype),"setEventListeners",this).call(this),this._popupElement.addEventListener("submit",(function(){return e.submitHandler(e._getInputValues())}))}},{key:"close",value:function(){g(k(a.prototype),"close",this).call(this),this._formElement.reset()}},{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){return e[t.name]=t.value})),e}}])&&b(t.prototype,n),a}(l);function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(e,t,n){return(j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function I(e,t){return!t||"object"!==C(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e)).submitHandler=t,n}return t=a,(n=[{key:"open",value:function(e,t){j(P(a.prototype),"open",this).call(this),this.cardElement=e,this.cardID=t}},{key:"setEventListeners",value:function(){var e=this;j(P(a.prototype),"setEventListeners",this).call(this),this._popupElement.addEventListener("submit",(function(){return e.submitHandler(e.cardElement,e.cardID)}))}}])&&O(t.prototype,n),a}(l);function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var R=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t,this._config=n}var t,n;return t=e,(n=[{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._config}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"getInitialUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._config}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"setUserInfo",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._config,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"setUserAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._config,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._config,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteCards",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e._id),{method:"DELETE",headers:this._config}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"setCardLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:this._config}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteCardLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:this._config}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}}])&&T(t.prototype,n),e}(),U={},x={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__error_active"},A=document.querySelector(".popup-add").querySelector(".form"),B=document.querySelector(".popup-edit").querySelector(".form"),D=document.querySelector(".popup-avatar").querySelector(".form");Array.from(document.querySelectorAll(x.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}));var t=new o(x,e);t.enableValidation(),U[e.name]=t}));var V=U[A.name],H=U[B.name],N=U[D.name],z=new R("https://mesto.nomoreparties.co/v1/cohort-21",{authorization:"be1a7eff-1608-42e4-ab79-a96e12a8c4b6","Content-Type":"application/json"});function J(e){return new n(e,".element-mesto",ne,se,oe,"3e2a74326fac3d4d7e8ff79b").generateMesto()}var M=new u({renderer:J},".elements__list"),G=new w(".popup-add",(function(t){e(K,"Создание...","disabled"),z.addCard({name:t.add_name_mesto,link:t.add_name_link}).then((function(e){M.addItem(J(e))})).catch((function(){return console.log("Ошибка при создании карточки")})).finally((function(){e(K,"Создать","enabled"),G.close()}))}));G.setEventListeners();var F=document.querySelector(".profile__button-add"),K=document.querySelector(".popup-add").querySelector(".form__submit");F.addEventListener("click",(function(){G.open(),V.resetValidation()}));var Q=document.querySelector(".profile__button-edit"),W=document.forms.form__edit,X=W.elements.edit_name_avatar,Y=W.elements.edit_job,Z=W.elements.form_submit,$=new w(".popup-edit",(function(t){e(Z,"Сохранение...","disabled"),z.setUserInfo({name:t.edit_name_avatar,about:t.edit_job}).then((function(e){ee.setUserInfo(e.name,e.about)})).catch((function(){return console.log("Ошибка при сохранении профиля пользователя")})).finally((function(){e(Z,"Сохранить.","enabled"),$.close()}))}));$.setEventListeners();var ee=new a(".profile__name",".profile__job",".profile__avatar");Q.addEventListener("click",(function(){var e=ee.getUserInfo();X.value=e.name,Y.value=e.info,$.open(),H.resetValidation()}));var te=new y(".popup-image");function ne(e,t){te.open(e,t)}function re(e,t){var n=Array.from(e.likes);0===n.length?t.textContent="":t.textContent=n.length.toString()}function oe(e,t){var n=e.querySelector(".element__heart"),r=e.querySelector(".element__counter-like");n.classList.contains("element__heart_like")?z.deleteCardLike({_id:t}).then((function(e){n.classList.remove("element__heart_like"),re(e,r)})).catch((function(){return console.log("Ошибка при установке лайка")})):z.setCardLike({_id:t}).then((function(e){n.classList.add("element__heart_like"),re(e,r)})).catch((function(){return console.log("Ошибка при удалении лайка")}))}te.setEventListeners();var ie=document.querySelector(".popup-avatar").querySelector(".form__submit"),ae=new w(".popup-avatar",(function(t){e(ie,"Сохранение...","disabled"),z.setUserAvatar({avatar:t.avatar_mesto}).then((function(e){ee.setUserAvatar(e.avatar)})).catch((function(){return console.log("Ошибка при сохранении аватара")})).finally((function(){e(ie,"Сохранить","enabled"),ae.close()}))}));ae.setEventListeners(),document.querySelector(".profile__avatar-cover").addEventListener("click",(function(){ae.open(),N.resetValidation()}));var ce=document.querySelector(".popup-delete").querySelector(".form__submit"),ue=new q(".popup-delete",(function(t,n){e(ce,"Удаление...","disabled"),z.deleteCards({_id:n}).then((function(){t.remove()})).catch((function(){return console.log("Ошибка при удалении карточки")})).finally((function(){e(ce,"Да","enabled"),ue.close()}))}));function se(e,t){ue.open(e,t)}ue.setEventListeners(),Promise.all([z.getInitialUserInfo(),z.getInitialCards()]).then((function(e){ee.setUserInfo(e[0].name,e[0].about),ee.setUserAvatar(e[0].avatar);var t=e[1].reverse();M.addCardsToDom(t)})).catch((function(){return console.log("Ошибка загрузки данных с сервера")}))})();