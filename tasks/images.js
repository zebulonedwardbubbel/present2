import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import giflossy from 'imagemin-giflossy';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import zopfli from 'imagemin-zopfli';
import changed from 'gulp-changed';
import { paths } from './index';

export function images() {
    return gulp.src([paths.img.src])
        .pipe(changed(paths.img.dist))
        .pipe(imagemin([
            // png
            pngquant({
                speed: 1,
                quality: 98
            }),
            zopfli({
                more: true
            }),
            giflossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 2
            }),
            // svg
            // imagemin.svgo({
            //     plugins: [{
            //         removeViewBox: false
            //     }]
            // }),
            imagemin.jpegtran({
                progressive: true
            }),
            mozjpeg({
                quality: 85
            })
        ],
        {
            verbose: true
        }))
        .pipe(gulp.dest(paths.img.dist));
}
