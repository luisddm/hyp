(function() {

    "use strict";

    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var compass = require('gulp-compass');
    var minifyCss = require('gulp-minify-css');
    var browserSync = require('browser-sync');
    var uglify = require('gulp-uglify');
    var swig = require('gulp-swig');
    var concat = require('gulp-concat');
    var uncss = require('gulp-uncss');
    var glob = require('glob');
    var changed = require('gulp-changed');
    var del = require('del');

    // Convierto SCSS a CSS, minimizo, concateno y copio el archivo style.css a build
    gulp.task('scss', function () {
        gulp.src('scss/*.scss')
            .pipe(sass())
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('build/css'));
    });

    // Hago lo anterior, pero además elimino los estilos CSS que no se usan (OJO, esto tarda mucho en ejecutarse)
    gulp.task('scss-uncss', function () {
        gulp.src('scss/*.scss')
            .pipe(sass())
            .pipe(uncss({
                html: glob.sync('**/*.html')
            }))
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('build/css'));
    });

    // Minimizo el javascript, lo concateno en app.js y lo copio a build
    gulp.task('javascript', function () {
        gulp.src('js/*.js')
            .pipe(uglify())
            .pipe(concat('app.js'))
            .pipe(gulp.dest('build/js'));
    });

    // Construyo los HTML a partir de las plantillas Swig y las copio a build
    gulp.task('templates', function () {
        gulp.src('*.html')
            .pipe(swig({
                defaults: {
                    cache: false
                }
            }))
            .pipe(gulp.dest('build'));
    });

    // Copio las imágenes a build
    gulp.task('images', function () {
        gulp.src('img/**')
            .pipe(changed('build/img'))
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
        gulp.watch(["*.html", "templates/*.html"], ['templates']);
    });

    // Tarea para generar el codigo en build que se enviará al FTP
    gulp.task('build', ['clean', 'scss-uncss', 'javascript', 'templates', 'images']);

})();