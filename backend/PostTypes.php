<?php

/**
 * Campaign Post Type
 * @var [type]
 */
register_post_type('campaign', [

    'labels' => [
        'name' => _x('Campaigns', 'post type general name'),
        'singular_name' => _x('Campaign','post type singular name'),
        'add_new'            => _x( 'Add New', 'Campaign' ),
        'add_new_item'       => __( 'Add New Campaign' ),
        'edit_item'          => __( 'Edit Campaign' ),
        'new_item'           => __( 'New Campaign' ),
        'all_items'          => __( 'All Campaigns' ),
        'view_item'          => __( 'View Campaign' ),
        'search_items'       => __( 'Search Campaigns' ),
        'not_found'          => __( 'No campaigns found' ),
        'not_found_in_trash' => __( 'No campaigns found in the Trash' ),
        'parent_item_colon'  => '',
        'menu_name'          => __('Campaigns')
    ],
    'description' => 'List of the campaigns',
    'public'        => true,
    'menu_icon'     => 'dashicons-analytics',
    'menu_position' => 5,
    'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'comments' ),
    'has_archive'   => true,

]);

/**
 * Client Post Type
 * @var [type]
 */
register_post_type('client', [

    'labels' => [
        'name' => _x('Clients', 'post type general name'),
        'singular_name' => _x('Client','post type singular name'),
        'add_new'            => _x( 'Add New', 'Client' ),
        'add_new_item'       => __( 'Add New Client' ),
        'edit_item'          => __( 'Edit Client' ),
        'new_item'           => __( 'New Client' ),
        'all_items'          => __( 'All Client' ),
        'view_item'          => __( 'View Client' ),
        'search_items'       => __( 'Search Client' ),
        'not_found'          => __( 'No clients found' ),
        'not_found_in_trash' => __( 'No clients found in the Trash' ),
        'parent_item_colon'  => '',
        'menu_name'          => __('Clients')
    ],
    'description'   => 'List of the clients',
    'public'        => true,
    'menu_icon'     => 'dashicons-businessman',
    'menu_position' => 5,
    'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'comments' ),
    'has_archive'   => true,

]);
