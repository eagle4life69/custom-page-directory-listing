=== Page Directory Listing ===
Contributors: eagle4life69  
Tags: shortcode, page list, parent page, alphabetical, tabs  
Requires at least: 5.0  
Tested up to: 6.5  
Stable tag: 1.5.0  
License: GPLv2 or later  
License URI: https://www.gnu.org/licenses/gpl-2.0.html  
Plugin URI: https://github.com/eagle4life69/custom-page-directory-listing/

Displays child pages of a specified parent page, grouped alphabetically by last name using a tabbed interface.

== Description ==

This plugin displays a list of child pages under a specified parent page. The pages are grouped by the first letter of their last name (parsed from the title) and can be browsed using clickable alphabetical tabs.

Useful for directories of people, places, or topics organized by name.

== Installation ==

1. Upload the `custom-page-directory-listing` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Use the shortcode `[page_directory parent_id=123]` in any page or post. Replace `123` with the parent page ID.

== Frequently Asked Questions ==

= How are last names determined? =
The last word in each page's title is treated as the last name and used for sorting/grouping.

= Can I change the styling? =
Yes. Override or edit the CSS in `assets/style.css`.

== Screenshots ==

1. Example of tabbed alphabetical directory layout.

== Changelog ==

= 1.5.1 =
* Fixed PHP crash due to escaped variable names
* Cleaned up sorting logic and ensured compatibility with suffix parsing

= 1.5.0 =
* Improved last name sorting logic
* Now intelligently ignores suffixes (Jr., Sr., II, III, IV) when sorting and grouping
* Ensures pages are grouped and ordered more accurately by last name

= 1.4.0 =
* Added live search input above tabs
* Introduced dynamic “Results” tab that shows only matching pages
* Matching results are sorted alphabetically
* Added smooth fade transitions between tabs
* Styled search input and enhanced Results tab appearance

= 1.3.0 =
* Internal update for search field prep (deprecated by 1.4.0)

= 1.2.0 =
* Tabs now highlight active selection
* Moved JavaScript to external file (`assets/script.js`)
* Default tab (first alphabetically) auto-opens on load
* All page links now open in a new tab with `target="_blank"`
* Updated plugin headers for better WordPress compatibility

= 1.1.0 =
* Initial release with tabbed grouping and shortcode functionality
