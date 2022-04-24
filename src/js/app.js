import * as flsFunctions from "./modules/functions.js";



// Webp
flsFunctions.isWebp();
//Применение класса "ibg" для адаптива картинок. берет путь картинки и назначает его фоном родительского блока
flsFunctions.ibg();


// обработчик нажатий для работы на тачскрине
//функция срабатывает, когда весь контент на странице загрузится
window.onload = function () {
   document.addEventListener("click", documentActions);

   //функция срабатывает только на тачскрине при ширине экрана более 768px
   function documentActions(e) {
      const targetElement = e.target; //получаем элемент, который вызывает событие

      //===============================<выпадающее меню header>===============================
      // если экран мобильный
      if (flsFunctions.isMobile.any()) {
         // если это класс стрелки для подменю
         if (targetElement.classList.contains('menu__arrow')) {
            //добавляем или удаляем _hover для нажатого элемента
            if (!targetElement.closest('.menu__item._hover')) {
               closeSubMenu(); //закрытие всех открытых подменю
            }
            targetElement.closest('.menu__item').classList.toggle('_hover');  // если устройство мобильное , добавляем класс _hover ( для выпадающего меню)
         }
         //закрытие подменю при клике на пустое пространство
         else if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
            closeSubMenu();//закрытие подменю
         }

         //функция закрытия подменю
         function closeSubMenu() {
            const classHover = document.querySelector('.menu__item._hover');
            if (classHover) {
               classHover.classList.remove('_hover');
            }
         }
      }
      //===============================</выпадающее меню header>==================================

      // ==============================<появление формы поиска>====================================
      if (targetElement.classList.contains('search-form__icon')) {
         document.querySelector('.search__form').classList.toggle('_active');
      } else if (!targetElement.closest('.search__form') && document.querySelector('.search__form._active')) {
         document.querySelector('.search__form').classList.remove('_active');
      }
      // ==============================</появление формы поиска>====================================
   }
   // ==============================<header>=====================================
   // при прокрутке стилизовать header надвисанием
   const headerElement = document.querySelector('.header');

//добавление класса _scroll при прокрутке header
   const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
         headerElement.classList.remove('_scroll');
      } else {
         headerElement.classList.add('_scroll')
      }
   };

   const headerObserver = new IntersectionObserver(callback);
   headerObserver.observe(headerElement);
   // ==============================</header>====================================

}

//==================================<меню бургер>=======================================
const menuBody = document.querySelector('.menu__body');  // тело меню
const iconMenu = document.querySelector('.menu-burger'); // кнопка бургера
if (iconMenu) {

   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}
//==================================</меню бургер>=======================================




//==================================<slider>=======================================
// import Swiper from "swiper";
import Swiper, { Navigation, Pagination, Parallax } from 'swiper';

//запуск Встроенной функции навигации JavaScript Swiper
Swiper.use([Navigation, Pagination, Parallax]);


//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
   for (let index = 0; index < sliders.length; index++) {
      let slider = sliders[index];
      if (!slider.classList.contains('swiper-bild')) {
         let slider_items = slider.children;
         if (slider_items) {
            for (let index = 0; index < slider_items.length; index++) {
               let el = slider_items[index];
               el.classList.add('swiper-slide');
            }
         }
         let slider_content = slider.innerHTML;
         let slider_wrapper = document.createElement('div');
         slider_wrapper.classList.add('swiper-wrapper');
         slider_wrapper.innerHTML = slider_content;
         slider.innerHTML = '';
         slider.appendChild(slider_wrapper);
         slider.classList.add('swiper-bild');

         if (slider.classList.contains('_swiper-scroll')) {
            let sliderScroll = document.createElement('div');
            sliderScroll.classList.add('swiper-scrollbar');
            slider.appendChild(sliderScroll);
         }
      }
   }
}



// slider-main__body
if (document.querySelector('.slider-main__body')) {
   new Swiper('.slider-main__body', {
      modules: [Navigation, Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 1,    // количество  слайдов
      spaceBetween: 32,   //отступ между слайдами
      watchOverflow: true,
      speed: 800,    // скорость
      loop: true,    //  бесконечный слайдер
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,   // паралакс
      // Dotts
      pagination: {
         el: '.controls-slider-main__dotts',
         clickable: true,

      },
      // Arrows
      navigation: {
         nextEl: '.slider-main .slider-arrow__next',
         prevEl: '.slider-main .slider-arrow__prev',
      }
   });

}
//==================================</slider>=======================================

//==================================<vanilla-tilt>=======================================
import { VanillaTilt } from "./modules/vanilla-tilt.js";

VanillaTilt.init(document.querySelectorAll(".slider-main__content"), {
   max: 25,
   speed: 400,
   glare: true,
   "max-glare": 1,
});
//==================================</vanilla-tilt>=======================================
