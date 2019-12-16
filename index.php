<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context = Timber::get_context();
$context['post'] = new Timber\Post();

$templates = $context['logged_in'] ? ['pages/campaign-list.twig'] : ['pages/login.twig'];

if($context['logged_in']) {

    $user_id = $context['user']->id || null;
    $associated_clients = get_field('associated_clients', 'user_' . $user_id, false);

    $context['campaigns'] = Timber::get_posts([
        'post_type'         => 'campaign',
        'posts_per_page'    => -1,
    ]);

}

Timber::render( $templates, $context );
