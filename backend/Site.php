<?php

// Post Type Registration
require_once(__DIR__ . '/PostTypes.php');

// Set Timber Up
$timber = new \Timber\Timber();
$timber::$dirname = ['templates', 'frontend/views'];


/**
 * NestBloom site functionality.
 * @class ADNATheme
 */
class ADNATheme extends TimberSite
{

    /**
     * @constructor
     */
    public function __construct()
    {

        // Admin Actions
        add_action('wp_dashboard_setup', [$this, 'remove_dashboard_widgets']);
        add_action('admin_init', [ $this, 'admin_check' ]);
        add_action('admin_menu', [ $this, 'admin_menu' ]);
        add_action('admin_enqueue_scripts', [$this, 'customize']);

        // Theme Support
        add_theme_support('post-formats');
        add_theme_support('post-thumbnails');
        add_theme_support('menus');
        add_theme_support('html5', [ 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ]);

        // Filters
        add_filter('timber_context', [ $this, 'add_to_context' ]);
        add_filter('get_twig', [ $this, 'add_to_twig' ]);

        add_action('init', [ $this, 'register_post_types' ]);
        add_action('init', [ $this, 'register_taxonomies' ]);
        add_action('wp_enqueue_scripts', [ $this, 'enqueue_scripts' ]);

        parent::__construct();

    }

    /**
     * Check if Admin.
     * if not, don't allow user to access WP-Admin
     *
     * @return void
     */
    public function admin_check()
    {

        $redirect = home_url( '/' );
        if (!current_user_can('administrator'))
        exit( wp_redirect( $redirect ) );

    }


    /**
     * Customize the admin panel style and functionality
     *
     * @return void
     */
    public function customize_admin()
    {

        wp_register_style( 'admin_css', get_template_directory_uri() . '/style-admin.css', false, '1.0.0' );

    }


    /**
     * Admin menu functionality
     *
     * @return void
     */
    public function admin_menu()
    {

        // Remove Posts Page
        remove_menu_page('edit.php');

        // Remove Comments Page
        remove_menu_page( 'edit-comments.php' );

        // Remove support of comments
        remove_post_type_support( 'post', 'comments' );
        remove_post_type_support( 'page', 'comments' );

    }

    public function register_post_types() {}
    public function register_taxonomies() {}

    public function remove_dashboard_widgets()
    {

    	if (!current_user_can('manage_options')) {
    		remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
    		remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
    		remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal');
    		remove_meta_box('dashboard_plugins', 'dashboard', 'normal');
    		remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
    		remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side');
    		remove_meta_box('dashboard_primary', 'dashboard', 'side');
    		remove_meta_box('dashboard_secondary', 'dashboard', 'side');
    	}

    }


    /**
     * Enqueue frontend scripts (Styles and JS).
     * @return void
     */
    public function enqueue_scripts()
    {

        wp_localize_script( 'js', 'wp', ['theme' => get_stylesheet_directory_uri()]);

        wp_enqueue_style( 'styles', get_template_directory_uri() . '/assets/css/styles.css?v='. time(), [], null, false );
        wp_enqueue_script( 'js', get_template_directory_uri() . '/assets/js/entry.js?v='. time(), [], null, true );
        wp_enqueue_script( 'js', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js'. time(), [], null, true );

    }


    /**
     * Add global variables to twig context for every page
     * @param object $context
     */
    public function add_to_context($context)
    {

        $context['global_options'] = get_fields('options');
        $context['logged_in'] = is_user_logged_in();
        $context['current_user'] = new Timber\User();
        $context['assets'] = $context['theme']->link . '/assets';
        $context['navigation'] = new TimberMenu('Main Menu');
        $context['footer_nav'] = new TimberMenu('Footer Menu');

        $context['site'] = $this;

        return $context;

    }


    /**
     * Add custom functions to twig.
     * @param class $twig
     */
    public function add_to_twig($twig)
    {

        $twig->addExtension(new Twig_Extension_StringLoader());
        return $twig;

    }

}

new ADNATheme();
