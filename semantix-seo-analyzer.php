<?php
/**
 * Plugin Name: Semantix SEO Analyzer
 * Plugin URI: https://semantix.com
 * Description: Advanced semantic SEO analysis and content optimization tools for WordPress
 * Version: 1.0.0
 * Author: Semantix Team
 * License: GPL v2 or later
 * Text Domain: semantix-seo
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SEMANTIX_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SEMANTIX_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('SEMANTIX_VERSION', '1.0.0');

class SemantixSEOAnalyzer {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_ajax_semantix_get_posts', array($this, 'ajax_get_posts'));
        add_action('wp_ajax_semantix_analyze_content', array($this, 'ajax_analyze_content'));
        add_action('wp_ajax_semantix_generate_clusters', array($this, 'ajax_generate_clusters'));
        add_action('wp_ajax_semantix_get_entities', array($this, 'ajax_get_entities'));
        
        // Activation and deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        // Initialize plugin
        load_plugin_textdomain('semantix-seo', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Semantix SEO Analyzer',
            'Semantix SEO',
            'manage_options',
            'semantix-seo',
            array($this, 'admin_page'),
            'dashicons-analytics',
            30
        );
        
        // Add submenus
        add_submenu_page(
            'semantix-seo',
            'Dashboard',
            'Dashboard',
            'manage_options',
            'semantix-seo',
            array($this, 'admin_page')
        );
        
        add_submenu_page(
            'semantix-seo',
            'Entity Explorer',
            'Entity Explorer',
            'manage_options',
            'semantix-entity-explorer',
            array($this, 'entity_explorer_page')
        );
        
        add_submenu_page(
            'semantix-seo',
            'Topic Clusters',
            'Topic Clusters',
            'manage_options',
            'semantix-topic-clusters',
            array($this, 'topic_clusters_page')
        );
        
        add_submenu_page(
            'semantix-seo',
            'Content Analysis',
            'Content Analysis',
            'manage_options',
            'semantix-content-analysis',
            array($this, 'content_analysis_page')
        );
        
        add_submenu_page(
            'semantix-seo',
            'Settings',
            'Settings',
            'manage_options',
            'semantix-settings',
            array($this, 'settings_page')
        );
    }
    
    public function enqueue_admin_scripts($hook) {
        // Only load on our plugin pages
        if (strpos($hook, 'semantix') === false) {
            return;
        }
        
        // Enqueue React and our compiled JS
        wp_enqueue_script(
            'semantix-admin-js',
            SEMANTIX_PLUGIN_URL . 'assets/js/semantix-admin.js',
            array('wp-element', 'wp-api-fetch'),
            SEMANTIX_VERSION,
            true
        );
        
        // Enqueue CSS
        wp_enqueue_style(
            'semantix-admin-css',
            SEMANTIX_PLUGIN_URL . 'assets/css/semantix-admin.css',
            array(),
            SEMANTIX_VERSION
        );
        
        // Localize script with WordPress data
        wp_localize_script('semantix-admin-js', 'semantixData', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('semantix_nonce'),
            'siteUrl' => get_site_url(),
            'siteName' => get_bloginfo('name'),
            'postTypes' => $this->get_post_types(),
            'totalPosts' => wp_count_posts()->publish,
            'totalPages' => wp_count_posts('page')->publish,
        ));
    }
    
    public function admin_page() {
        echo '<div id="semantix-dashboard-root"></div>';
    }
    
    public function entity_explorer_page() {
        echo '<div id="semantix-entity-explorer-root"></div>';
    }
    
    public function topic_clusters_page() {
        echo '<div id="semantix-topic-clusters-root"></div>';
    }
    
    public function content_analysis_page() {
        echo '<div id="semantix-content-analysis-root"></div>';
    }
    
    public function settings_page() {
        echo '<div id="semantix-settings-root"></div>';
    }
    
    // AJAX Handlers
    public function ajax_get_posts() {
        check_ajax_referer('semantix_nonce', 'nonce');
        
        $post_type = sanitize_text_field($_POST['post_type'] ?? 'post');
        $posts_per_page = intval($_POST['posts_per_page'] ?? 10);
        $paged = intval($_POST['paged'] ?? 1);
        
        $args = array(
            'post_type' => $post_type,
            'post_status' => 'publish',
            'posts_per_page' => $posts_per_page,
            'paged' => $paged,
            'meta_query' => array(
                'relation' => 'OR',
                array(
                    'key' => '_semantix_analyzed',
                    'compare' => 'NOT EXISTS'
                ),
                array(
                    'key' => '_semantix_analyzed',
                    'value' => '1',
                    'compare' => '='
                )
            )
        );
        
        $query = new WP_Query($args);
        $posts = array();
        
        foreach ($query->posts as $post) {
            $posts[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'content' => wp_strip_all_tags($post->post_content),
                'excerpt' => get_the_excerpt($post->ID),
                'url' => get_permalink($post->ID),
                'date' => $post->post_date,
                'author' => get_the_author_meta('display_name', $post->post_author),
                'categories' => wp_get_post_categories($post->ID, array('fields' => 'names')),
                'tags' => wp_get_post_tags($post->ID, array('fields' => 'names')),
                'word_count' => str_word_count(wp_strip_all_tags($post->post_content)),
                'semantic_score' => get_post_meta($post->ID, '_semantix_score', true) ?: 0,
                'entities' => get_post_meta($post->ID, '_semantix_entities', true) ?: array(),
            );
        }
        
        wp_send_json_success(array(
            'posts' => $posts,
            'total' => $query->found_posts,
            'pages' => $query->max_num_pages
        ));
    }
    
    public function ajax_analyze_content() {
        check_ajax_referer('semantix_nonce', 'nonce');
        
        $post_id = intval($_POST['post_id']);
        $content = sanitize_textarea_field($_POST['content']);
        
        // Simulate semantic analysis
        $entities = $this->extract_entities($content);
        $semantic_score = $this->calculate_semantic_score($content, $entities);
        $topics = $this->extract_topics($content);
        
        // Save analysis results
        update_post_meta($post_id, '_semantix_analyzed', '1');
        update_post_meta($post_id, '_semantix_score', $semantic_score);
        update_post_meta($post_id, '_semantix_entities', $entities);
        update_post_meta($post_id, '_semantix_topics', $topics);
        update_post_meta($post_id, '_semantix_analyzed_date', current_time('mysql'));
        
        wp_send_json_success(array(
            'score' => $semantic_score,
            'entities' => $entities,
            'topics' => $topics,
            'recommendations' => $this->generate_recommendations($content, $entities)
        ));
    }
    
    public function ajax_generate_clusters() {
        check_ajax_referer('semantix_nonce', 'nonce');
        
        $core_topic = sanitize_text_field($_POST['core_topic']);
        $depth = intval($_POST['depth'] ?? 2);
        $region = sanitize_text_field($_POST['region'] ?? 'US');
        
        // Generate topic clusters based on site content
        $clusters = $this->generate_topic_clusters($core_topic, $depth);
        
        wp_send_json_success($clusters);
    }
    
    public function ajax_get_entities() {
        check_ajax_referer('semantix_nonce', 'nonce');
        
        $search = sanitize_text_field($_POST['search'] ?? '');
        $type = sanitize_text_field($_POST['type'] ?? '');
        $status = sanitize_text_field($_POST['status'] ?? '');
        
        $entities = $this->get_site_entities($search, $type, $status);
        
        wp_send_json_success($entities);
    }
    
    // Helper Methods
    private function get_post_types() {
        $post_types = get_post_types(array('public' => true), 'objects');
        $types = array();
        
        foreach ($post_types as $post_type) {
            $types[] = array(
                'name' => $post_type->name,
                'label' => $post_type->label,
                'count' => wp_count_posts($post_type->name)->publish
            );
        }
        
        return $types;
    }
    
    private function extract_entities($content) {
        // Simple entity extraction (in production, use NLP libraries)
        $entities = array();
        
        // Extract potential entities using basic patterns
        $words = str_word_count($content, 1);
        $word_freq = array_count_values(array_map('strtolower', $words));
        
        // Get most frequent words as potential entities
        arsort($word_freq);
        $top_words = array_slice($word_freq, 0, 20);
        
        foreach ($top_words as $word => $freq) {
            if (strlen($word) > 3 && $freq > 2) {
                $entities[] = array(
                    'text' => $word,
                    'type' => $this->classify_entity_type($word),
                    'frequency' => $freq,
                    'confidence' => min(($freq / 10) * 100, 100)
                );
            }
        }
        
        return $entities;
    }
    
    private function classify_entity_type($word) {
        // Simple classification logic
        $business_terms = array('marketing', 'business', 'strategy', 'sales', 'customer');
        $tech_terms = array('software', 'technology', 'digital', 'online', 'website');
        
        if (in_array(strtolower($word), $business_terms)) {
            return 'Business';
        } elseif (in_array(strtolower($word), $tech_terms)) {
            return 'Technology';
        } else {
            return 'General';
        }
    }
    
    private function calculate_semantic_score($content, $entities) {
        $score = 0;
        
        // Basic scoring algorithm
        $word_count = str_word_count($content);
        $entity_count = count($entities);
        
        // Score based on content length
        if ($word_count > 300) $score += 20;
        if ($word_count > 600) $score += 20;
        if ($word_count > 1000) $score += 10;
        
        // Score based on entity diversity
        $score += min($entity_count * 2, 30);
        
        // Score based on entity confidence
        $avg_confidence = 0;
        if ($entity_count > 0) {
            $total_confidence = array_sum(array_column($entities, 'confidence'));
            $avg_confidence = $total_confidence / $entity_count;
            $score += ($avg_confidence / 100) * 20;
        }
        
        return min($score, 100);
    }
    
    private function extract_topics($content) {
        // Extract main topics from content
        $topics = array();
        
        // Simple topic extraction based on headings and frequent terms
        preg_match_all('/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i', $content, $headings);
        
        foreach ($headings[1] as $heading) {
            $clean_heading = wp_strip_all_tags($heading);
            if (strlen($clean_heading) > 5) {
                $topics[] = array(
                    'title' => $clean_heading,
                    'type' => 'heading',
                    'relevance' => 0.8
                );
            }
        }
        
        return $topics;
    }
    
    private function generate_recommendations($content, $entities) {
        $recommendations = array();
        
        $word_count = str_word_count($content);
        $entity_count = count($entities);
        
        if ($word_count < 300) {
            $recommendations[] = array(
                'type' => 'warning',
                'title' => 'Content Length',
                'message' => 'Consider expanding your content. Aim for at least 300 words for better SEO.'
            );
        }
        
        if ($entity_count < 5) {
            $recommendations[] = array(
                'type' => 'info',
                'title' => 'Entity Coverage',
                'message' => 'Add more relevant entities and topics to improve semantic richness.'
            );
        }
        
        if (!preg_match('/<h[1-6]/i', $content)) {
            $recommendations[] = array(
                'type' => 'warning',
                'title' => 'Heading Structure',
                'message' => 'Add headings (H1, H2, H3) to improve content structure and readability.'
            );
        }
        
        return $recommendations;
    }
    
    private function generate_topic_clusters($core_topic, $depth) {
        // Generate clusters based on site content and the core topic
        $site_posts = get_posts(array(
            'numberposts' => 100,
            'post_status' => 'publish'
        ));
        
        $clusters = array(
            'id' => 'core',
            'title' => $core_topic,
            'level' => 0,
            'color' => '#FFD93D',
            'expanded' => true,
            'x' => 400,
            'y' => 100,
            'children' => array()
        );
        
        // Generate first level clusters based on categories
        $categories = get_categories(array('hide_empty' => true));
        $x_positions = array(200, 400, 600);
        $colors = array('#A0F0D0', '#B8D1FF', '#F8C8DC');
        
        foreach (array_slice($categories, 0, 3) as $index => $category) {
            $cluster = array(
                'id' => 'cat-' . $category->term_id,
                'title' => $category->name,
                'level' => 1,
                'color' => $colors[$index],
                'expanded' => true,
                'x' => $x_positions[$index],
                'y' => 250,
                'searchVolume' => rand(1000, 20000),
                'intent' => 'Informational',
                'children' => array()
            );
            
            // Add second level if depth allows
            if ($depth > 1) {
                $posts_in_cat = get_posts(array(
                    'category' => $category->term_id,
                    'numberposts' => 2
                ));
                
                foreach ($posts_in_cat as $post_index => $post) {
                    $cluster['children'][] = array(
                        'id' => 'post-' . $post->ID,
                        'title' => wp_trim_words($post->post_title, 4),
                        'level' => 2,
                        'color' => $this->lighten_color($colors[$index]),
                        'expanded' => false,
                        'x' => $x_positions[$index] + ($post_index * 100) - 50,
                        'y' => 350,
                        'searchVolume' => rand(500, 5000),
                        'intent' => rand(0, 1) ? 'Informational' : 'Commercial',
                        'children' => array()
                    );
                }
            }
            
            $clusters['children'][] = $cluster;
        }
        
        return $clusters;
    }
    
    private function lighten_color($color) {
        // Simple color lightening function
        $color_map = array(
            '#A0F0D0' => '#C8F5E8',
            '#B8D1FF' => '#D4E4FF',
            '#F8C8DC' => '#FBE0EC'
        );
        
        return $color_map[$color] ?? '#E5E7EB';
    }
    
    private function get_site_entities($search = '', $type = '', $status = '') {
        // Get entities from analyzed posts
        global $wpdb;
        
        $query = "
            SELECT p.ID, p.post_title, p.post_type, p.post_status, p.post_date,
                   pm1.meta_value as entities,
                   pm2.meta_value as score
            FROM {$wpdb->posts} p
            LEFT JOIN {$wpdb->postmeta} pm1 ON p.ID = pm1.post_id AND pm1.meta_key = '_semantix_entities'
            LEFT JOIN {$wpdb->postmeta} pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_semantix_score'
            WHERE p.post_status = 'publish'
        ";
        
        if ($search) {
            $query .= $wpdb->prepare(" AND p.post_title LIKE %s", '%' . $search . '%');
        }
        
        if ($type) {
            $query .= $wpdb->prepare(" AND p.post_type = %s", $type);
        }
        
        $query .= " ORDER BY p.post_date DESC LIMIT 50";
        
        $results = $wpdb->get_results($query);
        $entities = array();
        
        foreach ($results as $result) {
            $post_entities = maybe_unserialize($result->entities) ?: array();
            
            $entities[] = array(
                'id' => $result->ID,
                'title' => $result->post_title,
                'type' => ucfirst($result->post_type),
                'status' => ucfirst($result->post_status),
                'description' => 'WordPress ' . $result->post_type . ' with ' . count($post_entities) . ' entities',
                'lastModified' => human_time_diff(strtotime($result->post_date)) . ' ago',
                'icon' => $this->get_post_type_icon($result->post_type),
                'color' => $this->get_post_type_color($result->post_type),
                'searchVolume' => rand(100, 10000),
                'intent' => 'Informational',
                'entities' => $post_entities,
                'score' => intval($result->score ?: 0)
            );
        }
        
        return $entities;
    }
    
    private function get_post_type_icon($post_type) {
        $icons = array(
            'post' => 'FileText',
            'page' => 'FileText',
            'product' => 'ShoppingCart',
            'event' => 'Calendar'
        );
        
        return $icons[$post_type] ?? 'FileText';
    }
    
    private function get_post_type_color($post_type) {
        $colors = array(
            'post' => 'bg-blue-100 text-blue-600',
            'page' => 'bg-green-100 text-green-600',
            'product' => 'bg-purple-100 text-purple-600',
            'event' => 'bg-orange-100 text-orange-600'
        );
        
        return $colors[$post_type] ?? 'bg-gray-100 text-gray-600';
    }
    
    public function activate() {
        // Create database tables if needed
        $this->create_tables();
        
        // Set default options
        add_option('semantix_version', SEMANTIX_VERSION);
        add_option('semantix_activation_date', current_time('mysql'));
    }
    
    public function deactivate() {
        // Clean up if needed
        wp_clear_scheduled_hook('semantix_daily_analysis');
    }
    
    private function create_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'semantix_analysis';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            post_id bigint(20) NOT NULL,
            analysis_data longtext NOT NULL,
            analysis_date datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY post_id (post_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

// Initialize the plugin
new SemantixSEOAnalyzer();