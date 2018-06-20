// Lib
import Gulp from 'gulp';
import Bro from 'gulp-bro';
import Babelify from 'babelify';
import Sourcemaps from 'gulp-sourcemaps';
import Uglify from 'gulp-uglify';
import Size from 'gulp-size';
import Connect from 'gulp-connect';


// Config
import Config from '../Config';

/**
 * Build Scripts
 * @uses {gulp, gulp-bro, babelify, gulp-sourcemaps, gulp-uglify, gulp-size, gulp-connect}
 *
 * Build the JavaScript for the project.
 */
export default () => {

    // New build process
    return Gulp.src(Config.scripts.src_dir + Config.scripts.src_entry)
        .pipe(Bro({
            transform: [ Babelify.configure({ presets: ['es2015', 'stage-0'] }) ]
        }))
        .pipe(Sourcemaps.init({ loadMaps: false }))
        .pipe(Uglify())
        .pipe(Sourcemaps.write('./'))
        .pipe(Size({ title: Config.scripts.dist_name, showFiles: true }))
        .pipe(Gulp.dest(Config.scripts.dist_dir))
        .pipe(Connect.reload());

};


/**
 * OLD Build process. Leaving it here as reference for now
 * @todo - Remove when we're happy with current build process.
 *
 * Libs not used currently
 *
 * import Browserify from 'browserify';
 * import Buffer from 'vinyl-buffer';
 * import Source from 'vinyl-source-stream';
 *
 * Bundle not used currently
 *
 * let bundler = Browserify({
 *     entries: Config.scripts.src_dir + Config.scripts.src_entry,
 *     debug: true,
 *     transform: [Babelify]
 * });
 *
 * return bundler.bundle()
 *     .on('error', function (err) { console.error(err); })
 *     .pipe(Source(Config.scripts.dist_name))
 *     .pipe(Buffer())
 *     .pipe(Sourcemaps.init({ loadMaps: true }))
 *     .pipe(Uglify())
 *     .pipe(Sourcemaps.write('./'))
 *     .pipe(Size({ title: Config.scripts.dist_name, showFiles: true }))
 *     .pipe(Gulp.dest(Config.scripts.dist_dir))
 *     .pipe(Connect.reload());
 *
 */
