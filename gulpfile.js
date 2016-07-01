'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util')
var sass = require('gulp-sass')
var webpack = require("webpack")
var WebpackDevServer = require("webpack-dev-server");

gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/css'));
});

// create a single instance of the compiler to allow caching
var devCompiler = webpack({});

gulp.task("webpack", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});


gulp.task('watch', function () {

  gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch('./source/**/*', ['webpack']);

});
