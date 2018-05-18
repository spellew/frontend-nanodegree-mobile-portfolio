var gulp = require('gulp'),
  gutil = require('gulp-util'),
  critical = require('critical').stream,
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  htmlmin = require('gulp-html-minifier'),
  imageResize = require('gulp-image-resize'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create(),
  ngrok = require('ngrok'),
  sequence = require('run-sequence'),
  port = 8080,
  site = null;

gulp.task('scripts', function () {
  gulp.src('js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('dist'));
  gulp.src('views/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('dist/views'));
});

gulp.task('styles', function () {
  gulp.src('css/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist'));
  gulp.src('views/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist/views'));
});

gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(critical({
      base: 'dist/',
      inline: true,
      css: ['dist/styles.min.css']
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist'));
  gulp.src('views/*.html')
    .pipe(critical({
      base: 'dist/',
      inline: true,
      css: ['dist/views/styles.min.css']
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist/views'));
});

gulp.task('images', (function () {
  gulp.src('img/*')
    .pipe(imageResize({
      width: 100,
    }))
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(imagemin())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist/img'));
  gulp.src('views/images/*')
    .pipe(imagemin())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist/views/images'));
}));

gulp.task('browser-sync', function () {
  browserSync.init({
    port: port,
    open: false,
    server: {
      baseDir: "./dist/"
    }
  });
});

gulp.task('ngrok-url', (cb) => {
  return ngrok.connect(port)
    .then((url) => {
      site = url;
      gutil.log(gutil.colors.blue('[Secure Url]'), site);
    })
    .catch((err) => {
      console.log('Error: ', err);
      return err;
    });
});

gulp.task('watch', function () {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('css/*.css', ['styles']);
  gulp.watch('*.html', ['images']);
});

gulp.task('run-server', function (cb) {
  return sequence(
    'default',
    'browser-sync',
    'ngrok-url'
  );
});

gulp.task('default', ['scripts', 'styles', 'html', 'images']);