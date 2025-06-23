<?php
/**
 * Plugin Name: Page Directory Listing
 * Plugin URI: https://github.com/eagle4life69/custom-page-directory-listing/
 * Description: Displays child pages of a specified parent page, grouped alphabetically by last name using tabs.
 * Version: 1.2.0
 * Author: Andrew Rhynes
 * Author URI: https://github.com/eagle4life69
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: page-directory-listing
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function pdl_shortcode_output( $atts ) {
    $atts = shortcode_atts([
        'parent_id' => 0,
    ], $atts, 'page_directory');

    $pages = get_pages([
        'child_of' => $atts['parent_id'],
        'sort_column' => 'post_title',
        'sort_order' => 'asc',
    ]);

    $grouped = [];

    foreach ( $pages as $page ) {
        $parts = explode( ' ', $page->post_title );
        $last = end( $parts );
        $initial = strtoupper( $last[0] ?? '#' );
        $grouped[ $initial ][] = $page;
    }

    ksort( $grouped );

    $output = '<div class="pdl-tabs">';
    foreach ( $grouped as $letter => $group ) {
        $output .= '<button class="pdl-tab" data-letter="' . esc_attr( $letter ) . '">' . esc_html( $letter ) . '</button> ';
    }
    $output .= '</div>';

    $output .= '<div class="pdl-directory">';
    foreach ( $grouped as $letter => $group ) {
        $output .= '<div class="pdl-group" id="pdl-tab-' . esc_attr( $letter ) . '" style="display:none;">';
        $output .= "<h3>$letter</h3><ul>";
        foreach ( $group as $p ) {
            $output .= '<li><a href="' . esc_url( get_permalink( $p->ID ) ) . '" target="_blank" rel="noopener noreferrer">' . esc_html( $p->post_title ) . '</a></li>';
        }
        $output .= '</ul></div>';
    }
    $output .= '</div>';

    return $output;
}
add_shortcode( 'page_directory', 'pdl_shortcode_output' );

function pdl_enqueue_assets() {
    wp_enqueue_style( 'pdl-style', plugin_dir_url( __FILE__ ) . 'assets/style.css' );
    wp_enqueue_script( 'pdl-script', plugin_dir_url( __FILE__ ) . 'assets/script.js', [], false, true );
}
add_action( 'wp_enqueue_scripts', 'pdl_enqueue_assets' );
