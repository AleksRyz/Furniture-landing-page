import * as flsFunctions from "./modules/functions.js";

// Webp
flsFunctions.isWebp();



// обработчик нажатий для работы на тачскрине
//функция срабатывает, когда весь контент на странице загрузится
window.onload = function () {
   document.addEventListener("click", documentActions);

   //функция срабатывает только на тачскрине при ширине экрана более 768px
   function documentActions(e) {
      const targetElement = e.target; //получаем элемент, который вызывает событие

      //===============================<выпадающее меню header>===============================
      // если экран мобильный
      if ( flsFunctions.isMobile.any()) {
         // если это класс стрелки для подменю
         if (targetElement.classList.contains('menu__arrow')) {
            //добавляем или удаляем _hover для нажатого элемента
            if (!targetElement.closest('.menu__item._hover')){
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
            if(classHover){
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
}

//==================================<меню бургер>=======================================
const menuBody = document.querySelector('.menu__body');  // тело меню
const iconMenu = document.querySelector('.menu-burger'); // кнопка бургера
if (iconMenu) {
	
	iconMenu.addEventListener("click", function(e){
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}
//==================================</меню бургер>=======================================


