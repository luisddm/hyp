(function() {

    "use strict";

    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        compass = require('gulp-compass'),
        minifyCss = require('gulp-minify-css'),
        browserSync = require('browser-sync'),
        uglify = require('gulp-uglify'),
        swig = require('gulp-swig'),
        concat = require('gulp-concat'),
        uncss = require('gulp-uncss'),
        glob = require('glob'),
        changed = require('gulp-changed'),
        del = require('del'),
        plumber = require('gulp-plumber'),
        autoprefixer = require('gulp-autoprefixer');


    // Convierto SCSS a CSS, minimizo, concateno y copio el archivo style.css a build
    gulp.task('scss', function () {
        gulp.src('scss/style.scss')
            .pipe(plumber())
            .pipe(sass({
                includePaths: [
                    'scss',
                    'bower_components/bootstrap-sass-official/assets/stylesheets',
                    'bower_components/fontawesome/scss'
                ]
            }))
            .pipe(autoprefixer())
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('build/css'));
    });

    // Elimino los estilos CSS que no se usan (OJO, esto tarda mucho en ejecutarse)
    gulp.task('uncss', function() {
      gulp.src('build/css/style.css')
      .pipe(uncss({
        html: glob.sync('build/*.html')
      }))
      .pipe(gulp.dest('build/css'));
    });

    // Minimizo el javascript, lo concateno en app.js y lo copio a build
    gulp.task('javascript', function () {
        gulp.src([
            "bower_components/jquery/dist/jquery.js",
            "bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js",
            "bower_components/spinjs/spin.js",
            "bower_components/spinjs/jquery.spin.js",
            "bower_components/jquery-validation/dist/jquery.validate.min.js",
            "js/*.js"
        ])
            .pipe(uglify())
            .pipe(concat('app.js'))
            .pipe(gulp.dest('build/js'));
    });

    // Construyo los HTML a partir de las plantillas Swig y las copio a build
    gulp.task('templates', function () {
        gulp.src('templates/*.html')
            .pipe(swig({
                load_json: true,
                json_path: 'templates',
                defaults: {
                    cache: false
                }
            }))
            .pipe(gulp.dest('build'));
    });

    // Copio las imágenes a build
    gulp.task('images', function () {
        gulp.src('img/**')
            .pipe(changed('build/img/**'))
            .pipe(gulp.dest('build/img'));
    });

    // Mantengo un servidor httpd que hace que el navegador se recargue cuando detecta cambios
    gulp.task('browser-sync', function () {
        browserSync.init(["build/css/*.css", "build/js/*.js", "build/*.html", "build/img/**"], {
            server: {
                baseDir: "build"
            }
        });
    });

    // Elimino el contenido de la carpeta build
    gulp.task('clean', function () {
        del(['build/**']);
    });

    // Tarea por defecto para desarrollo
    gulp.task('default', ['scss', 'javascript', 'templates', 'images', 'browser-sync'], function () {
        gulp.watch("scss/*.scss", ['scss']);
        gulp.watch("js/*.js", ['javascript']);
        gulp.watch("templates/**", ['templates']);
    });

    // Tarea para generar el codigo en build que se enviará al FTP
    gulp.task('build', ['clean', 'scss-uncss', 'javascript', 'templates', 'images']);

})();
