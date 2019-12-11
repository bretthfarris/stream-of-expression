"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var minifyCSS = require('gulp-clean-css');
var minifyJS = require('gulp-minify');


// Process JS files and return the stream.
gulp.task('js', function () {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js/min'));
});

// Compile SASS to CSS.
gulp.task('sass', function(done){
  
  return gulp.src('public/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'))
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css/min'));
});

gulp.task('nodemon', function(cb){
  var running = false;
  return nodemon({
      script: 'server.js',
      watch: ['server.js', 'routes/', 'public/css/', 'models/', 'public/js/', 'views/*.ejs', 'views/layouts/*.ejs', 'views/partials/*.ejs'],
      ext: 'js, css, ejs'
    }).on('start', function(){
    if(!running) {
      running = true;
      cb();
    }
  });
});

gulp.task('init-js', function(done){
  // Copy dependency JS files to the min directory
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/popper.js/dist/popper.min.js'
  ]).pipe(debug()).pipe(gulp.dest('./public/js/min'));
  gulp.src(['./public/js/*.js']).pipe(minifyJS()).pipe(gulp.dest('./public/js/min'));
  done();
});

gulp.task('init-css', function(done){
  // Copy dependency JS files to the min directory
  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]).pipe(debug()).pipe(gulp.dest('./public/css/min'));
  gulp.src('public/css/*.css').pipe(minifyCSS({compatibility: 'ie8'})).pipe(gulp.dest('public/css/min'));
  done();
});

// First, run all your tasks
gulp.task('default', gulp.series('init-js', 'init-css', 'sass', 'js', 'nodemon', function(){
  // Then watch for changes
  gulp.watch("public/scss/*.scss", gulp.series('sass'));
}));