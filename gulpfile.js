const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('minify-html', function () {
  return gulp.src('page/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'));
});

gulp.task('minify-css', () => {
  return gulp.src('page/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('minify-img', () =>
  gulp.src('page/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'))
);

gulp.task('build', ['minify-img', 'minify-html', 'minify-css']);