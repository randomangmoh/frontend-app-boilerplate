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

global $paged;

$context = Timber::get_context();
$context['post'] = new Timber\Post();

$helpers = new Helpers($context);
$client_ids = $helpers->check_user_clients();
$context['campaigns'] = $helpers->filter_campaigns($client_ids, $paged);
$context['pagination'] = $context['campaigns']->pagination();

$templates = $context['logged_in'] ? ['pages/campaign-list.twig'] : ['pages/login.twig'];

Timber::render( $templates, $context );
