<?php
/**
* Single Campaign file
*
* @package  ADNA
*/

// Bring in the helpers
require_once(__DIR__ . '/backend/Helpers.php');

// Get context and post data from Timber
$context = Timber::get_context();
$context['post'] = new Timber\Post();

// Instantiate our helpers
$helpers = new Helpers($context);

// Get the client ID
$post_client_id = $context['post']->get_field('client');

// Check if user can access this campaign
$can_access = $helpers->can_access_campaign($post_client_id);

// Check if logged in and can access. If not, redirect where necessary
if(!$context['logged_in']) return Timber::render( ['pages/login.twig'], $context );
if(!$can_access) return;

// Set the current group and add to context
$current_group = $helpers->parse_querystring($context);
$context['current_group'] = $current_group;


// Set current questions
$context['current_questions'] = $helpers->get_questions($current_group, $context['post']->get_field('groups'));

// Render template
return Timber::render( ['pages/campaign.twig'], $context );
