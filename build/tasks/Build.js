// Lib
import Gulp from 'gulp';

// Utils
import { logStart, logComplete } from '../Utils';

/**
 * Build Task
 * @uses {gulp, gulp-util}
 *
 * For automatically building parts of the project
 */
export default (done) => {

    logStart('Build');

    // return Gulp.series('styles:build', 'scripts:build', 'images:build', 'audio:build', 'views:build')(() => {

    return Gulp.series('styles:build', 'scripts:build', 'images:build')(() => {

        logComplete('Build');
        done();

    });
}
