<?php

// If this file is called directly, abort.
if(!defined('ABSPATH')) {
	exit;
}


$data = '';
$data .= '<div class="ipanorama-page-info">' . PHP_EOL;
$data .= '<p>' . __('This is the <b>LITE version</b> of the plugin.', IPANORAMA_PLUGIN_NAME) . '</p>' . PHP_EOL;
$data .= '<p>' . __('It has only one limitation. You can create and use only <b>one item</b>.', IPANORAMA_PLUGIN_NAME) . '</p>' . PHP_EOL;
$data .= '<div class="ipanorama-page-info-close"><i class="xfa fa-times"></i></div>' . PHP_EOL;
$data .= '</div>' . PHP_EOL;

echo wp_kses_post($data);

?>