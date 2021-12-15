<?php

/**
 * Plugin Name:       iPanorama 360 (PRO)
 * Plugin URI:        http://avirtum.com
 * Description:       iPanorama 360 is the WordPress plugin out there that lets you create excellent virtual tours for clients from directly inside the WordPress admin in seconds. The plugin supports markers for providing information about any part of the scene or for navigation to other rooms/areas. With powerful tooltip system, you can enrich a view with text, images, video, and other online media resources. Use this plugin to create interactive virtual tours, maps, presentations.
 * Version:           1.6.14
 * Author:            Avirtum
 * Author URI:        http://avirtum.com/
 * License:           GPLv3
 * Text Domain:       ipanorama
 * Domain Path:       /languages
 */



// If this file is called directly, abort.
if(!defined('ABSPATH')) {
	exit;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('IPANORAMA_PLUGIN_NAME', 'ipanorama');
define('IPANORAMA_PLUGIN_VERSION', '1.6.14');
define('IPANORAMA_DB_VERSION', '1.1.0');
define('IPANORAMA_SHORTCODE_NAME', 'ipano');

/**
 * The code that runs during plugin activation
 */
function ipanorama_activate() {
	require_once( plugin_dir_path( __FILE__ ) . 'includes/activator.php' );
	$activator = new iPanorama_Activator();
	$activator->activate();
}
register_activation_hook( __FILE__, 'ipanorama_activate' );

/**
 * The code that runs during plugin deactivation
 */
function ipanorama_deactivate() {
	require_once(plugin_dir_path(__FILE__) . 'includes/deactivator.php' );
	$deactivator = new iPanorama_Deactivator();
	$deactivator->deactivate();
}
register_deactivation_hook( __FILE__, 'ipanorama_deactivate' );

/**
 * The code that runs after plugins loaded
 */
function ipanorama_check_db() {
	require_once(plugin_dir_path(__FILE__) . 'includes/activator.php' );
	
	$activator = new iPanorama_Activator();
	$activator->check_db();
}
add_action('plugins_loaded', 'ipanorama_check_db');


/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 */
require_once(plugin_dir_path(__FILE__) . 'includes/plugin.php' );


function ipanorama_run() {
	$pluginBasename = plugin_basename(__FILE__);
	
	$plugin = new iPanorama_App($pluginBasename);
	$plugin->run();
}
add_action('init', 'ipanorama_run');