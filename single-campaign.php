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

$templates = $context['logged_in'] ? ['pages/campaign.twig'] : ['pages/login.twig'];

$user_id = $context['user']->id;
$associated_clients = get_field('associated_clients', 'user_' . $user_id, false);
Timber::render( $templates, $context );
