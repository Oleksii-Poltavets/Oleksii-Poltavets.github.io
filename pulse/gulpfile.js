const gulp = require('gulp');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('server', function () {

  browserSync({
    server: {
      baseDir: "src"
    }
  });

  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function () {
  return gulp.src('src/sass/**/*.+(sass|scss)')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({
      suffix: '.min',
      prefix: ''
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));