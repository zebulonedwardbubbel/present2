import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks-render';
import { paths } from './index';

function templating() {
    return gulp.src(paths.templates.src)
        .pipe(nunjucks({
            path: 'src/templates/'
        }))
        .pipe(gulp.dest(process.env.NODE_ENV === 'production' ? paths.templates.dist : paths.templates.dev));
}

module.exports = {
    templating
};
