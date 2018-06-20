// Lib
import { log, colors } from 'gulp-util';

/**
 * Build process utilities
 */


/**
 * Log start
 *
 * Log the start of a build task
 * @param {String} task - Task name
 * @return void
 */
export const logStart = (task) => log(colors.yellow.bold(task) + colors.yellow(' task running...'));


/**
 * Log Complete
 *
 * Completed log of the task
 * @param {String} task - Task name
 * @return void
 */
export const logComplete = (task) => log(colors.green.bold(task) + colors.green(' task has completed...'));
