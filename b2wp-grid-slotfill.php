<?php
/**
 * Plugin Name:       Grid Slotfill
 * Description:       Example Grid SlotFill -- works with B2WP Grid
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       b2wp-grid-slotfill
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
// function create_block_b2wp_grid_slotfill_block_init() {
// register_block_type( __DIR__ . '/build' );
// }
// add_action( 'init', 'create_block_b2wp_grid_slotfill_block_init' );

define( 'B2WP_SLOTFILLS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'B2WP_SLOTFILLS_PLUGIN_URL', plugins_url( '', __FILE__ ) );

function enqueue_slotfills() {

	$assets_path = B2WP_SLOTFILLS_PLUGIN_PATH . 'build/index.asset.php';

	$assets = require $assets_path;

	wp_enqueue_script(
		'b2wp-slotfills',
		B2WP_SLOTFILLS_PLUGIN_URL . '/build/index.js',
		$assets['dependencies'],
		$assets['version'],
		true
	);

}

add_action( 'enqueue_block_editor_assets', 'enqueue_slotfills' );
