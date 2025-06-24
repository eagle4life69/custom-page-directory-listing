<?php
/*
 Plugin Name: Page Directory Listing
 Description: Displays child pages of a specified parent page, grouped alphabetically by last name using tabs.
 Version: 1.5.1
 Author: Andrew Rhynes
 Author URI: https://github.com/eagle4life69
 GitHub Plugin URI: https://github.com/eagle4life69/custom-page-directory-listing/
 GitHub Branch: main
 License: GPLv2 or later
 License URI: https://www.gnu.org/licenses/gpl-2.0.html
 Text Domain: page-directory-listing
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

    usort($1, function($1, $1) {
        $1 = ['jr', 'sr', 'ii', 'iii', 'iv'];

        function extract_last_name($1, $1) {
            $1 = explode(' ', trim($1));
            $1 = strtolower(end($1));
            if (in_array(trim($1, '.'), $1)) {
                array_pop($1); // remove suffix
                $1 = strtolower(end($1));
            }
            return $1;
        }

        $1 = extract_last_name($1->post_title, $1);
        $1 = extract_last_name($1->post_title, $1);

        return strcmp($1, $1);
    });

    foreach ( $1 as $1 ) {
        $1 = explode( ' ', $1->post_title );
        $1 = strtolower(end( $1 ));
        if (in_array(trim($1, '.'), ['jr', 'sr', 'ii', 'iii', 'iv'])) {
            array_pop($1);
            $1 = strtolower(end( $1 ));
        }
        $initial = strtoupper( $last[0] ?? '#' );
        $grouped[ $initial ][] = $page;
    }

    ksort( $grouped );

    $output = '<input type="text" id="pdl-search" placeholder="Search names..." class="pdl-search" />';

    $output .= '<div class="pdl-tabs">';
    foreach ( $grouped as $letter => $group ) {
        $output .= '<button class="pdl-tab" data-letter="' . esc_attr( $letter ) . '">' . esc_html( $letter ) . '</button> ';
      
    }
    $output .= '</div>';

    $output .= '<div class="pdl-directory">';
    $output .= '<div class="pdl-group" id="pdl-tab-results" style="display:none;"><h3>Results</h3><ul></ul></div>';

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
