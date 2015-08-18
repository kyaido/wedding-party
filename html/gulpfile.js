var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var minifyCss    = require('gulp-minify-css');
var plumber      = require('gulp-plumber');
var webserver    = require('gulp-webserver');
var source       = require('vinyl-source-stream');
var browserify   = require('browserify');
var buffer       = require('vinyl-buffer');
var uglify       = require('gulp-uglify');

var AUTOPREFIXER_BROWSERS = [
  'last 2 version', 'Explorer >= 9', 'Android >= 2.3'
];

/* sass task */
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      // outputStyle: 'compressed'
    }))
    .pipe(minifyCss({advanced: false}))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('dist/css/'));
});


/* js task */
gulp.task('js', function() {
  return browserify({
    entries: ['src/js/main.js']
  })
  .bundle()
  .pipe(plumber())
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});


/* webserver task */
gulp.task('webserver', function() {
  gulp.src('./dist/')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8000,
      livereload: true,
      directoryListing: false,
      open: 'http://localhost:8000'
    }));
});


/* watch task */
gulp.task('watch', function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch(['src/js/**/*.js'], ['js']);
});


/* default task */
gulp.task('default', ['webserver', 'watch']);