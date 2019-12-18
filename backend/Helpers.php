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

        // Admin Actions
        // add_action('admin_menu', [ $this, 'admin_menu' ]);

    }


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

            // return $meta_queries;


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
     * @return array
     */
    public function check_user_clients()
    {

        return $this->context['current_user']->get_field('associated_clients');

    }

}
