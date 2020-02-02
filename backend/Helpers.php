<?php

/**
 * NestBloom site functionality.
 * @class ADNATheme
 */
class Helpers
{

    /**
     * @constructor
     */
    public function __construct($context)
    {

        $this->context = $context;

    }


    /**
     * Filter campaigns based on user allowed clients
     *
     * @param  [type] $client_ids [description]
     * @return [type]             [description]
     */
    public function filter_campaigns($client_ids = null, $paged = 0, $is_admin)
    {

        if($is_admin) {

            return $campaigns = new Timber\PostQuery([
                'post_type' => 'campaign',
                'posts_per_page' => 10,
                'paged' => $paged
            ]);

        }

        if($client_ids) {

            $meta_queries = [
                'relation' => 'OR'
            ];

            foreach ($client_ids as $value) {

                $meta_queries[] = [
                    'key' => 'client',
                    'value' => "{$value}",
                    'compare' => 'LIKE'
                ];

            }

            // All Campaigns
            return $campaigns = new Timber\PostQuery([
                'post_type' => 'campaign',
                'posts_per_page' => 10,
                'paged' => $paged,
                'meta_query' => $meta_queries
            ]);

        }

    }


    /**
     * Get associated clients with user
     *
     * @return Array
     */
    public function check_user_clients()
    {

        return $this->context['current_user']->get_field('associated_clients');

    }


    /**
     * Check if user can access requested campaign
     *
     * @param  Array $campaign_client
     * @return Boolean
     */
    public function can_access_campaign($campaign_client)
    {

        $user_clients = $this->check_user_clients();

        foreach ($user_clients as $client) {

            if($campaign_client[0] == $client) return true;

        }

        return false;

    }


    /**
     * Search for object in groups based on group and subgroup
     *
     * @param  Array   $array
     * @param  Integer $index
     * @param  String  $value
     * @return Object
     */
    public static function search_group($array, $index, $value)
    {
        foreach($array as $arrayInf) {
            if($arrayInf->{$index} == $value) {
                return $arrayInf;
            }
        }

        return null;
    }


    /**
     * Parse the query string or set it on the campaign page
     * This sets the current group and allows us to get the current questions
     *
     * @param  Object $context
     * @return Object
     */
    public static function parse_querystring($context)
    {

        $groups = [];
        parse_str($_SERVER['QUERY_STRING'], $groups);

        if(array_key_exists('group_name', $groups) && array_key_exists('group_item', $groups) && array_key_exists('type', $groups)) {

            return [
                'type' => strtolower($groups['type']),
                'group_name' => strtolower($groups['group_name']),
                'group_item' => strtolower($groups['group_item'])
            ];

        } else {

            $default_group = $context['post']->get_field('groups')[0];
            $default_group_name = $default_group['name'];
            $default_group_value = $default_group['sub_group'][0]['label'];
            $default_group_type = $default_group['type'];

            $group = [
                'type' => strtolower($default_group_type),
                'group_name' => strtolower($default_group_name),
                'group_item' => strtolower($default_group_value)
            ];

            http_build_query($group);

            return $group;

        }

    }


    public static function get_questions($current_group, $group_data)
    {

        foreach($group_data as $group) {

            if((strtolower($group['name']) == $current_group['group_name']) && (strtolower($group['type']) == $current_group['type'])) {

                foreach ($group['sub_group'] as $sub_group) {

                    if(strtolower($sub_group['label']) == $current_group['group_item']) {
                        return $sub_group['campaign'];
                    }

                }

            }

        }

    }

}
