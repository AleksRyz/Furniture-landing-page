// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;  // путь к папке с результатом
const srcFolder = `./src`;    // путь к папке с исходниками


// пути
export const path = {
   //выгрузка результата
   build: {
      js: `${buildFolder}/js/`,
      css: `${buildFolder}/css/`,
      html: `${buildFolder}/`,
      images: `${buildFolder}/img/`,
      fonts: `${buildFolder}/fonts/`,
      files: `${buildFolder}/files/`  // все папки из папки src хотим перенести в папку files
   },
   //исходник
   src: {
      js: `${srcFolder}/js/app.js`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,  //  '**' - любая вложенность '*' - любое название
      svg: `${srcFolder}/img/**/*.svg`,
      scss: `${srcFolder}/scss/style.scss`,
      html: `${srcFolder}/*.html`,
      files: `${srcFolder}/files/**/*.*`,   // нас интересуют любые папки и файлы внутри files
      svgicons: `${srcFolder}/svgicons/*.svg`,
   },
   // наблюдать
   watch: {
      js: `${srcFolder}/js/**/*.js`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*.html`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`, 
      files: `${srcFolder}/files/**/*.*`,  // наблюдатель за файлами
   },
   clean: buildFolder,
   buildFolder: buildFolder,
   srcFolder: srcFolder,
   rootFolder: rootFolder,
   ftp: `test`
}