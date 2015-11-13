(function() {

  'use strict';

  var gulp = require('gulp'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    minifyCss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    swig = require('gulp-swig'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer');

  var dir = {
    sass: 'scss',
    lib: 'node_modules',
  };

  // Convierto SCSS a CSS, minimizo, concateno y copio el archivo style.css a dist
  gulp.task('scss', function() {
    gulp.src('scss/style.scss')
      .pipe(plumber())
      .pipe(sass({
        includePaths: [
          dir.lib + '/bootstrap-sass/assets/stylesheets',
          dir.lib + '/font-awesome/scss',
          dir.sass
        ]
      }))
      .pipe(autoprefixer())
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(concat('style.css'))
      //.pipe(purify(['js/**/*.js', 'templates/**/*.html']))
      .pipe(gulp.dest('dist/css'));
  });

  // Minimizo el javascript, lo concateno en app.js y lo copio a dist
  gulp.task('javascript', function() {
    gulp.src([
        dir.lib + '/jquery/dist/jquery.js',
        dir.lib + '/bootstrap-sass/assets/javascripts/bootstrap.js',
        dir.lib + '/spin.js/spin.js',
        dir.lib + '/spin.js/jquery.spin.js',
        dir.lib + '/jquery-validation/dist/jquery.validate.js',
        dir.lib + '/jquery-touchswipe/jquery.touchSwipe.js',
        'js/*.js'
      ])
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/js'));
  });

  // Construyo los HTML a partir de las plantillas Swig y las copio a dist
  gulp.task('templates', function() {
    gulp.src('templates/*.html')
      .pipe(swig({
        load_json: true,
        json_path: 'templates',
        defaults: {
          cache: false
        }
      }))
      .pipe(gulp.dest('dist'));
  });

  // Copio las imágenes a dist
  gulp.task('images', function() {
    gulp.src('img/**')
      .pipe(changed('dist/img/**'))
      .pipe(gulp.dest('dist/img'));
  });

  // Copio las fuentes a dist
  gulp.task('fonts', function() {
    gulp.src(dir.lib + '/font-awesome/fonts/**')
      .pipe(changed('dist/fonts/**'))
      .pipe(gulp.dest('dist/fonts'));
  });

  // Mantengo un servidor httpd que hace que el navegador se recargue cuando detecta cambios
  gulp.task('browser-sync', function() {
    browserSync.init(['dist/css/*.css', 'dist/js/*.js', 'dist/*.html', 'dist/img/**'], {
      server: {
        baseDir: 'dist'
      }
    });
  });

  // Elimino el contenido de la carpeta dist
  gulp.task('clean', function() {
    del(['dist/**']);
  });

  // Tarea por defecto para desarrollo
  gulp.task('default', ['fonts', 'scss', 'javascript', 'templates', 'browser-sync'], function() {
    gulp.watch('scss/*.scss', ['scss']);
    gulp.watch('js/*.js', ['javascript']);
    gulp.watch('templates/**', ['templates']);
  });

  // Tarea para generar el codigo en dist que se enviará al server
  gulp.task('dist', ['clean', 'fonts', 'scss', 'javascript', 'templates', 'images']);

})();
