<?php
/**
 * Plugin Name: Page Directory Listing
 * Description: Displays child pages of a specified parent page, grouped alphabetically by last name.
 * Version: 1.0.0
 * Author: Andrew Rhynes
 * GitHub Plugin URI: https://github.com/eagle4life69/custom-page-directory-listing/
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

    $output = '<div class="pdl-directory">';
    foreach ( $grouped as $letter => $group ) {
        $output .= "<h3>$letter</h3><ul>";
        foreach ( $group as $p ) {
            $output .= '<li><a href="' . esc_url( get_permalink( $p->ID ) ) . '">' . esc_html( $p->post_title ) . '</a></li>';
        }
        $output .= '</ul>';
    }
    $output .= '</div>';

    return $output;
}
add_shortcode( 'page_directory', 'pdl_shortcode_output' );

function pdl_enqueue_styles() {
    wp_enqueue_style( 'pdl-style', plugin_dir_url( __FILE__ ) . 'assets/style.css' );
}
add_action( 'wp_enqueue_scripts', 'pdl_enqueue_styles' );
