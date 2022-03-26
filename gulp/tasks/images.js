import webp from "gulp-webp";
import imagemin from "gulp-imagemin";



export const images = () => {
   return app.gulp.src(app.path.src.images)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <%=error.message %>"
         }))
      )
      .pipe(app.plugins.newer(app.path.build.images)) // проверка картинок в папке с результатом на обновления, для обработке только тех что изменились или тех которых там нет
      .pipe(
         app.plugins.if(
            app.isBuild,
            webp()) // создаем изображение webp
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            app.gulp.dest(app.path.build.images) // выгрузка webp в папку с результатом
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            app.gulp.src(app.path.src.images) // опять получаем доступ к изображениям в папке с исходниками
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            app.plugins.newer(app.path.build.images) // опять проверка картинок в папке с результатом на обновления
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            //сжатие картинок
            imagemin({
               progressive: true,
               svgoPlugins: [{ removeViewBox: false }],
               interplased: true,
               optimizationLevel: 3   // 0 to 7
            })
         )
      )
      .pipe(app.gulp.dest(app.path.build.images)) // выгрузка  в папку с результатом
      .pipe(app.gulp.src(app.path.src.svg)) //  получаем доступ к изображениям svg в папке с исходниками
      .pipe(app.gulp.dest(app.path.build.images)) // выгрузка  в папку с результатом
      .pipe(app.plugins.browsersync.stream());
}