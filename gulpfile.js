'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util')
var sass = require('gulp-sass')
var livereload = require('gulp-livereload')
var webpack = require("webpack-stream")
var WebpackDevServer = require("webpack-dev-server");

livereload({ start: true })

gulp.task('sass', function () {
  return gulp.src('./assets/sass/main.scss')
    .pipe(sass({
        includePaths: [
            './node_modules/bootstrap-sass/assets/stylesheets'
        ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dest/css'))
    .pipe(livereload())
});

gulp.task("webpack", function(callback) {
    return gulp.src('js/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dest/'))
    .pipe(livereload())
});

gulp.task('watch', function () {

    livereload.listen()
    console.log("livereload listening... ")
    gulp.watch('./assets/sass/**/*.scss', ['sass'])
    gulp.watch('./js/**/*', ['webpack'])

});
