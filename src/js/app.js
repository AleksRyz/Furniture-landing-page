import * as flsFunctions from "./modules/functions.js";
import { loadProucts } from "./modules/loadProucts.js";
import { VanillaTilt } from "./modules/vanilla-tilt.js";
// import Swiper from "swiper";
import Swiper, { Navigation, Pagination, Parallax } from 'swiper';


// Webp
flsFunctions.isWebp();
//Применение класса "ibg" для адаптива картинок. берет путь картинки и назначает его фоном родительского блока
flsFunctions.ibg();


//функция срабатывает, когда весь контент на странице загрузится
window.onload = function () {

   document.addEventListener("click", documentActions);
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

      // ==============================<иконка появление формы поиска>====================================
      if (targetElement.classList.contains('search-form__icon')) {
         document.querySelector('.search__form').classList.toggle('_active');
      } else if (!targetElement.closest('.search__form') && document.querySelector('.search__form._active')) {
         document.querySelector('.search__form').classList.remove('_active');
      }
      // ==============================</иконка появление формы поиска>====================================

      // ==============================<кнопка больше товаров>====================================
      if (targetElement.classList.contains('products__more')) {
         getProducts(targetElement);
      }

      async function getProducts(button) {
         if (!button.classList.contains('_hold')) {
            button.classList.add('_hold');
            const file = "json/products.json";
            let response = await fetch(file, {
               method: "GET"
            });
            if (response.ok) {
               let result = await response.json();
               loadProucts(result);
               button.classList.remove('_hold');
               button.remove();
            } else {
               alert("ошибка")
            }
         }
      }
      // ==============================</кнопка больше товаров>====================================

      // ==============================<кнопка добавить товар + анимация добавления>====================================
      if (targetElement.classList.contains('actions-product__button')) {
         const productId = targetElement.closest('.item-product').dataset.pid;
         addToCart(targetElement, productId);
         e.preventDefault();
      }
      // ==============================</кнопка добавить товар>====================================

      // ==============================<кнопка открыть корзину>====================================
      if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
         if (document.querySelector('.cart-list').children.length > 0) {
            document.querySelector('.cart-header').classList.toggle('_active');
         }
         e.preventDefault();
      } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
         document.querySelector('.cart-header').classList.remove('_active');
      }
      // ==============================</кнопка открыть корзину>====================================

      // ==============================</кнопка удаление из корзины>====================================
      if (targetElement.classList.contains('cart-list__delete')){
         const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
         updateCart(targetElement, productId, false);
         e.preventDefault();

      }
      // ==============================<кнопка удаление из корзины>====================================

 


   }

   // добавить товар
   function addToCart(productButton, productId) {

      if (!productButton.classList.contains('_hold')) {

         productButton.classList.add('_hold');
         productButton.classList.add('_fly');

         const cart = document.querySelector('.cart-header__icon');
         const product = document.querySelector(`[data-pid="${productId}"]`);
         const productImage = product.querySelector('.item-product__image');

         //клон картинки
         const productImageFly = productImage.cloneNode(true);
         // получение размеров и координат картинки

         const productImageFlyWidth = productImage.offsetWidth;
         const productImageFlyHeight = productImage.offsetHeight;
         const productImageFlyTop = productImage.getBoundingClientRect().top;
         const productImageFlyLeft = productImage.getBoundingClientRect().left;

         productImageFly.setAttribute('class', '_flyImage ibg');
         productImageFly.style.cssText =
            `
         left: ${productImageFlyLeft}px;
         top: ${productImageFlyTop}px;
         width: ${productImageFlyWidth}px;
         height: ${productImageFlyHeight}px;
         `;

         document.body.append(productImageFly);
         const cartFlyTop = cart.getBoundingClientRect().top;
         const cartFlyLeft = cart.getBoundingClientRect().left;

         productImageFly.style.cssText =
            `
         left: ${cartFlyLeft}px;
         top: ${cartFlyTop}px;
         width: 0;
         height: 0;
         opacity: 0;
         `;
         flsFunctions.ibg();

         //отлавливаем событие долета картинки в корзину
         productImageFly.addEventListener('transitionend', function () {
            if (productButton.classList.contains('_fly')) {
               productImageFly.remove(); // удаляем клон
               updateCart(productButton, productId);
               productButton.classList.remove('_fly')
            }
         });
      }
   }

   // добавление и удаление товаров из корзины
   function updateCart(productButton, productId, productAdd = true) {
      const cart = document.querySelector('.cart-header');
      const cartIcon = cart.querySelector('.cart-header__icon');
      const cartQuantity = cartIcon.querySelector('span');
      const cartProduct = document.querySelector(`[data-cart-pid = "${productId}"]`);
      const cartList = document.querySelector('.cart-list');

      // Добавляем товар
      if (productAdd) {
         if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
         } else {
            cartIcon.insertAdjacentHTML('beforeend', '<span>1</span>');
         }
      
      if (!cartProduct) {
         const product = document.querySelector(`[data-pid='${productId}']`);
         const cartProductImage = product.querySelector('.item-product__image').innerHTML;
         const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
         const cartProductContent = `
         <a href="" class="cart-list__image ibg">${cartProductImage}</a>
         <div class="cart-list__body">
            <a href="" class="cart-list__title">${cartProductTitle}</a>
            <div class="cart-list__quantity">Quantity: <span>1</span></div>
            <a href="" class="cart-list__delete">Delete</a>
         </div>
         `;
         cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`)
      } else {
         const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
         cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
      }
      // после всех действий
      productButton.classList.remove('_hold');
      flsFunctions.ibg();
   } else {
      const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
      cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
      if (!parseInt(cartProductQuantity.innerHTML)){
         cartProduct.remove();
      }

      const cartQuantityValue = --cartQuantity.innerHTML;

      if(cartQuantityValue){
         cartQuantity.innerHTML = cartQuantityValue;
      } else {
         cartQuantity.remove();
         cart.classList.remove('_active');
      }
   }
   }

   // ==============================<надвисание header при прокрутке>=====================================
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
   // ==============================</надвисание header при прокрутке>====================================


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
   VanillaTilt.init(document.querySelectorAll(".slider-main__content"), {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 1,
   });
   //==================================</vanilla-tilt>=======================================

}








