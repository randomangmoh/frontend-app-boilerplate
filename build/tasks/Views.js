// Lib
import Gulp from 'gulp';
import Twig from 'gulp-twig';
import Size from 'gulp-size';
import Connect from 'gulp-connect';

// Utils & Config
import Config from '../Config';

/**
 * Views Task
 * @uses {gulp, gulp-twig, gulp-size, gulp-connect}
 *
 * Compile all twig files to HTML files.
 */
export default () => {

    return Gulp.src(Config.views.src_dir + Config.views.src_files_compile)
        .pipe(Twig())
        .pipe(Size())
        .pipe(Gulp.dest(Config.views.dist_dir))
        .pipe(Connect.reload());

}
