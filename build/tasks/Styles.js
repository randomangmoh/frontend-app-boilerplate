// Lib
import Gulp from 'gulp';
import Sass from 'gulp-sass';
import Sourcemaps from 'gulp-sourcemaps';
import Connect from 'gulp-connect';
import Size from 'gulp-size';

// Config
import Config from '../Config';


/**
 * Build Styles
 * @uses {gulp, gulp-sass, gulp-sourcemaps, gulp-connect}
 *
 * Build the Stylesheets for the project.
 */
export default () => {

    return Gulp.src(Config.styles.src_dir + Config.styles.src_entry)
        .pipe(Sass({ outputStyle: 'compressed' }).on('error', Sass.logError))
        .pipe(Gulp.dest(Config.styles.dist_dir))
        .pipe(Size())
        .pipe(Connect.reload());

};
