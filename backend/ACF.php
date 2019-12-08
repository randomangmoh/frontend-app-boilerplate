<?php

/**
 * Enable ACF options page if we can
 */
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}
