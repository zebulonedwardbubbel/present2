import gulp from 'gulp';
import { scripts } from './webpack';
import { templating } from './templating';
import { watch, server } from './server';
import { stylesBuild } from './styles';
import { images } from './images';
import del from 'del';

export const paths = {
    templates: {
        src: 'src/templates/*.njk',
        dev: 'src/',
        dist: './'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dev: 'src/styles/',
        dist: './styles'
    },
    js: {
        src: 'src/**/*.js'
    },
    img: {
        src: 'src/img/**/*.{gif,png,jpg}',
        dist: './'
    },
    fonts: {
        src: 'src/fonts/**/*.{woff,woff2}',
        dist: '/fonts'
    }
};

export const clean = () => del(['dist']);

function copyFonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dist));
}

export const dev = gulp.series(server, watch);

export const build = gulp.series(clean, gulp.parallel(templating, stylesBuild, scripts, images, copyFonts));

export default dev;
