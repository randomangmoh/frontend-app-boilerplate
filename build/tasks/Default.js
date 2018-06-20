// Lib
import Gulp from 'gulp';

// Utils
import { logStart, logComplete } from '../Utils';

/**
 * Default Gulp Task.
 * @uses {gulp, gulp-util}
 *
 * Lists out all tasks when you run it so a new
 * developer can have an quick overview of what can be executed.
 *
 * @uses {gulp}
 */
export default (done) => {

    logStart('Default');

    return Gulp.series('build')(() => {

        logComplete('Default');
        done();

    });

};
