'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    swig = require('gulp-swig');


gulp.task('js', function () {
    gulp.src('js/*.js')
        .pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('zapp.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(swig())
        .pipe(minifyHTML())
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('img', function () {
    gulp.src('img/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: 'build'
        }
    });
});

gulp.task('default', ['js', 'img', 'html', 'css', 'browser-sync'], function() {
    gulp.watch(['css/*.css'], ['css']);
    gulp.watch("*.html", ['html', browserSync.reload]);
    gulp.watch('js/*.js', ['js', browserSync.reload]);
});