"use strict";
// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// Реализация делегирования на div.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const listEl = document.querySelector(".gallery");

function renderGallary() {
  return galleryItems
    .map((el) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${el.original}">
          <img
            class="gallery__image"
            src='${el.preview}'
            data-source="${el.original}"
            alt="${el.description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

listEl.insertAdjacentHTML("afterbegin", renderGallary(galleryItems));

listEl.addEventListener("click", openModal);

let openImgInstance = null;

function openModal(event) {
  event.preventDefault();
  const currentImg = event.target;
  if (currentImg.nodeName !== "IMG") {
    return;
  }
  openImgInstance = basicLightbox.create(`
    <img src="${currentImg.dataset.source}">
`);
  openImgInstance.show();

  const onEscPressKey = (event) => {
    if (event.code === "Escape") {
      openImgInstance.close();
    }
  };

  document.addEventListener("keydown", onEscPressKey);
}
