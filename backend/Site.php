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

        add_action('init', [ $this, 'modify_roles' ]);
        add_action('acf/input/admin_enqueue_scripts', [ $this, 'enqueue_acf_scripts' ]);
        add_action('acf/field_group/admin_enqueue_scripts', [ $this, 'enqueue_acf_scripts_group' ]);
        add_action('wp_enqueue_scripts', [ $this, 'enqueue_scripts' ]);

        parent::__construct();

    }


    /**
     * Modify the default user roles
     *
     * @return Void
     */
    public function modify_roles()
    {


        /**
         * Remove Roles
         */
         remove_role('subscriber');
         remove_role('editor');
         remove_role('author');
         remove_role('contributor');

        //
        add_role(
            'client',
            __( 'Client' ),
            [
                'read'         => true,
                'edit_posts'   => false
            ]
        );

    }


    /**
     * Check if Admin.
     * if not, don't allow user to access WP-Admin
     *
     * @return Void
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
     *
     * @return void
     */
    public function enqueue_scripts()
    {

        wp_localize_script( 'js', 'wp', ['theme' => get_stylesheet_directory_uri()]);

        wp_register_style('GliderJS', 'https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.css');
        wp_enqueue_style('GliderJS');

        wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/js/entry.js?v=' . time(), ['jquery', 'acf-input'], null, true);
        wp_enqueue_style( 'styles', get_template_directory_uri() . '/assets/css/styles.css?v='. time(), [], null, false);


    }

    public function enqueue_acf_scripts()
    {

        wp_enqueue_style( 'my-acf-input-css', get_stylesheet_directory_uri() . '/css/my-acf-input.css', false, '1.0.0' );
        wp_enqueue_script( 'my-acf-input-js', get_stylesheet_directory_uri() . '/js/my-acf-input.js', true, '1.0.0' );

    }

    public function enqueue_acf_scripts_group()
    {
        wp_enqueue_style( 'my-acf-field-group-css', get_stylesheet_directory_uri() . '/css/my-acf-field-group.css', false, '1.0.0' );
        wp_enqueue_script( 'my-acf-field-group-js', get_stylesheet_directory_uri() . '/js/my-acf-field-group.js', false, '1.0.0' );
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
        $context['is_admin'] = current_user_can('administrator');
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
