<?php

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

        // Theme Support
        add_theme_support('post-formats');
        add_theme_support('post-thumbnails');
        add_theme_support('menus');
        add_theme_support('html5', [ 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ]);

        // Filters
        add_filter('timber_context', [ $this, 'add_to_context' ]);
        add_filter('get_twig', [ $this, 'add_to_twig' ]);

        // Actions
        add_action('init', [ $this, 'register_post_types' ]);
        add_action('init', [ $this, 'register_taxonomies' ]);
        add_action('wp_enqueue_scripts', [ $this, 'enqueue_scripts' ]);

        parent::__construct();

    }

    public function register_post_types() {}
    public function register_taxonomies() {}


    /**
     * Enqueue frontend scripts (Styles and JS).
     * @return void
     */
    public function enqueue_scripts()
    {

        wp_enqueue_style( 'styles', get_template_directory_uri() . '/distribution/css/styles.css?v='. time(), [], null, false );
        wp_enqueue_script( 'js', get_template_directory_uri() . '/distribution/js/entry.js?v='. time(), [], null, true );
        wp_localize_script( 'js', 'wp', ['theme' => get_stylesheet_directory_uri()]);

    }


    /**
     * Add global variables to twig context for every page
     * @param object $context
     */
    public function add_to_context($context)
    {

        $context['global_options'] = get_fields('options');
        $context['assets'] = $context['theme']->link . '/distribution';
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
