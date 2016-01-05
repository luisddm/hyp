(function() {
  'use strict';

  let gulp = require('gulp');
  let sass = require('gulp-sass');
  let cssnano = require('gulp-cssnano');
  let browserSync = require('browser-sync');
  let uglify = require('gulp-uglify');
  let swig = require('gulp-swig');
  let concat = require('gulp-concat');
  let changed = require('gulp-changed');
  let del = require('del');
  let plumber = require('gulp-plumber');
  let autoprefixer = require('gulp-autoprefixer');

  const DIR = {
    sass: 'scss',
    lib: 'node_modules',
  };

  // Convierto SCSS a CSS, minimizo, concateno y copio el archivo style.css a dist
  gulp.task('scss', () => {
    gulp.src('scss/style.scss')
      .pipe(plumber())
      .pipe(sass({
        includePaths: [
          DIR.lib + '/bootstrap-sass/assets/stylesheets',
          DIR.lib + '/font-awesome/scss',
          DIR.sass,
        ],
      }))
      .pipe(autoprefixer())
      .pipe(cssnano({
        keepSpecialComments: 0,
      }))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('dist/css'));
  });

  // Minimizo el javascript, lo concateno en app.js y lo copio a dist
  gulp.task('javascript', () => {
    gulp.src([
        DIR.lib + '/jquery/dist/jquery.js',
        DIR.lib + '/bootstrap-sass/assets/javascripts/bootstrap.js',
        DIR.lib + '/spin.js/spin.js',
        DIR.lib + '/spin.js/jquery.spin.js',
        DIR.lib + '/jquery-validation/dist/jquery.validate.js',
        DIR.lib + '/jquery-touchswipe/jquery.touchSwipe.js',
        'js/*.js',
      ])
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/js'));
  });

  // Construyo los HTML a partir de las plantillas Swig y las copio a dist
  gulp.task('templates', () => {
    gulp.src('templates/*.html')
      .pipe(swig({
        load_json: true,
        json_path: 'templates',
        defaults: {
          cache: false,
        },
      }))
      .pipe(gulp.dest('dist'));
  });

  // Copio las imágenes a dist
  gulp.task('images', () => {
    gulp.src('img/**')
      .pipe(changed('dist/img/**'))
      .pipe(gulp.dest('dist/img'));
  });

  // Copio las fuentes a dist
  gulp.task('fonts', () => {
    gulp.src(DIR.lib + '/font-awesome/fonts/**')
      .pipe(changed('dist/fonts/**'))
      .pipe(gulp.dest('dist/fonts'));
  });

  // Mantengo un servidor httpd que hace que el navegador se recargue cuando detecta cambios
  gulp.task('browser-sync', () => {
    browserSync.init(['dist/css/*.css', 'dist/js/*.js', 'dist/*.html', 'dist/img/**'], {
      server: {
        baseDir: 'dist',
      },
    });
  });

  // Elimino el contenido de la carpeta dist
  gulp.task('clean', () => {
    del(['dist/**']);
  });

  // Tarea por defecto para desarrollo
  gulp.task('default', ['fonts', 'scss', 'javascript', 'templates', 'browser-sync'], () => {
    gulp.watch('scss/*.scss', ['scss']);
    gulp.watch('js/*.js', ['javascript']);
    gulp.watch('templates/**', ['templates']);
  });

  // Tarea para generar el codigo en dist que se enviará al server
  gulp.task('dist', ['clean', 'fonts', 'scss', 'javascript', 'templates', 'images']);
})();
