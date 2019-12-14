// Lib
import Gulp from 'gulp';

// Utils & Config
import { logStart } from '../Utils';
import Config from '../Config';


/**
 * Watch task
 * @uses {gulp, gulp-util}
 *
 * Watch for file changes with the frontend assets
 */
export default () => {

    logStart('Watch');

    // Watch styles, scripts, views and image changes
    Gulp.watch(Config.styles.src_dir + Config.styles.src_files, Gulp.parallel('styles:build'));
    Gulp.watch(Config.scripts.src_dir + Config.scripts.src_files, Gulp.parallel('scripts:build'));
    Gulp.watch(Config.images.src_dir + Config.images.src_files, Gulp.parallel('images:build'));
    // Gulp.watch(Config.views.src_dir + Config.views.src_files, Gulp.parallel('views:build'));

};
