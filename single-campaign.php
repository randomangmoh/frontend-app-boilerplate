<?php

require_once(__DIR__ . '/backend/Helpers.php');

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

$helpers = new Helpers($context);

$post_client_id = $context['post']->get_field('client');

// echo '<pre>';
$can_access = $helpers->can_access_campaign($post_client_id);
// var_dump($can_access);
// die();

if(!$context['logged_in']) return Timber::render( ['pages/login.twig'], $context );
if(!$can_access) {
    echo 'Cannot access';
    return;
}

return Timber::render( ['pages/campaign.twig'], $context );
