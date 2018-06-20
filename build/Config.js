// Globals
const root = process.cwd();
const source = root + '/source';
const dist = root + '/distribution';

/**
 * Build Config
 *
 * Contains all the paths for frontend assets and
 * distribution folders etc.
 */
export default {
    root: root,
    source: source,
    dist: dist,
    styles: {
        src_dir: `${source}/styles/`,
        src_files: '**/**/**/**.scss',
        src_entry: 'styles.scss',
        dist_dir: `${dist}/css/`,
        dist_name: 'styles.css'
    },
    scripts: {
        src_dir: `${source}/scripts/`,
        src_files: '**/**/**.js',
        src_entry: 'entry.js',
        dist_dir: `${dist}/js/`,
        dist_name: 'bundle.js'
    },
    images: {
        src_dir: `${source}/images/`,
        src_files: '**/**/**.{jpg,jpeg,JPG,png,gif}',
        dist_dir: `${dist}/img/`,
    },
    audio: {
        src_dir: `${source}/audio/`,
        src_files: '**/**/**.{mp3,wav}',
        dist_dir: `${dist}/audio/`,
    },
    views: {
        src_dir: `${source}/views/`,
        src_files: `**/**/**.{twig,html}`,
        src_files_compile: `pages/**/**.{twig,html}`,
        dist_dir: `${dist}/`
    },
    server: {
        root: root,
        port: 4000
    }
}
