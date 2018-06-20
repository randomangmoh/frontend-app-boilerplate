// Lib
import Gulp from 'gulp';
import Newer from 'gulp-newer';
import Size from 'gulp-size';
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

    return Gulp.src(Config.audio.src_dir + Config.audio.src_files)
        .pipe(Newer(Config.audio.dist_dir))
        .pipe(Gulp.dest(Config.audio.dist_dir))
        .pipe(Size())
        .pipe(Connect.reload())


};
