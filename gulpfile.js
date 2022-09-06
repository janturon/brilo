const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var ts = require('gulp-typescript');
const concat = require('gulp-concat');

// --- build functions

const buildCSS = _ => gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./web/css'));

const TSconf = {
    "target": "esnext",
    "lib": ["dom", "es2021"],
};

const buildJS = _ => gulp.src('./assets/ts/*.ts')
    .pipe(ts(TSconf))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./web/js'));


// --- exports

exports.default = gulp.series(buildCSS, buildJS);
exports.css = buildCSS;
exports.js = buildJS;

exports.watch = _ => {
    gulp.watch('./assets/scss/*.scss', buildCSS);
    gulp.watch('./assets/ts/*.ts', buildJS);
}
