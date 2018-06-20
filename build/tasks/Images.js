// Lib
import Gulp from 'gulp';
import Image from 'gulp-image';
import Size from 'gulp-size';
import Newer from 'gulp-newer';
import Connect from 'gulp-connect';

// Config
import Config from '../Config';

/**
 * Build Images
 * @uses {gulp, gulp-image, gulp-size, gulp-newer}
 *
 * Build the source imagery for the project.
 */
export default () => {

    return Gulp.src(Config.images.src_dir + Config.images.src_files)
        .pipe(Newer(Config.images.dist_dir))
        .pipe(Image())
        .pipe(Gulp.dest(Config.images.dist_dir))
        .pipe(Size())
        .pipe(Connect.reload())


};
