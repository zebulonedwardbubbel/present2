import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import { paths } from './index';

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dev))
        .pipe(browserSync.stream());
}

function stylesBuild() {
    const postcssPlugins = [
        autoprefixer({
            browsers: ['last 2 version']
        }),
        cssnano()
    ];
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dist));
}

module.exports = {
    styles,
    stylesBuild
};
