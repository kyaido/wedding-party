var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var webserver    = require('gulp-webserver');

var AUTOPREFIXER_BROWSERS = [
  'last 2 version', 'Explorer >= 9', 'Android >= 4.0'
];

/* sass task */
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(gulp.dest('dist/css/'));
});


/* webserver task */
gulp.task('webserver', function() {
  gulp.src('./dist/')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 9000,
      livereload: true,
      directoryListing: false,
      open: 'http://localhost:9000'
    }));
});


/* watch task */
gulp.task('watch', function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
});


/* default task */
gulp.task('default', ['webserver', 'watch']);