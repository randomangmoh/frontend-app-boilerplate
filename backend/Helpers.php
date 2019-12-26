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
    public function filter_campaigns($client_ids = null)
    {

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
            return $campaigns = Timber::get_posts([
                'post_type' => 'campaign',
                'posts_per_page' => -1,
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

}
