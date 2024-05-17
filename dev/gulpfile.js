import gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';

const paths = {
  styles: {
    src: 'src/assets/app.scss',
    map: "",
    dest: 'src/assets'
  }
}
const sassCompiler = gulpSass(sass);

export function runsass() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write(paths.styles.map))
    .pipe(gulp.dest(paths.styles.dest));
};
export function watchsass() {
  runsass();
  gulp.watch(paths.styles.src, gulp.series('runsass'));
}
export default watchsass;