'use strict';

// Lib
import Gulp from 'gulp';
import { config } from 'dotenv';

// Tasks
import taskDefault from './build/tasks/Default';
import taskBuild from './build/tasks/Build';
import taskWatch from './build/tasks/Watch';
import taskServe from './build/tasks/Serve';
import taskScripts from './build/tasks/Scripts';
import taskStyles from './build/tasks/Styles';
import taskImages from './build/tasks/Images';
import taskAudio from './build/tasks/Audio';
import taskViews from './build/tasks/Views';


/**
 * Gulpfile
 *
 * @important Because of Gulp 4, the order of declaration is very important
 *  If a task uses another, the inherited task MUST be declared first.
 */
Gulp.task('scripts:build', taskScripts);
Gulp.task('styles:build', taskStyles);
Gulp.task('images:build', taskImages);
Gulp.task('audio:build', taskAudio);
Gulp.task('views:build', taskViews);

Gulp.task('watch', taskWatch);
Gulp.task('serve', Gulp.parallel('watch', taskServe));
Gulp.task('build', taskBuild);
Gulp.task('default', taskDefault);

// ENV Config loaded
config();
