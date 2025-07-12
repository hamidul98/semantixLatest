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
        
        // REST API endpoints
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        
        // Activation and deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
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
    }
    
    public function enqueue_admin_scripts($hook) {
        // Only load on our plugin page
        if (strpos($hook, 'semantix') === false) {
            return;
        }
        
        // Enqueue React build files
        wp_enqueue_script(
            'semantix-react-app',
            SEMANTIX_PLUGIN_URL . 'build/static/js/main.js',
            array(),
            SEMANTIX_VERSION,
            true
        );
        
        wp_enqueue_style(
            'semantix-react-app',
            SEMANTIX_PLUGIN_URL . 'build/static/css/main.css',
            array(),
            SEMANTIX_VERSION
        );
        
        // Localize script with WordPress data
        wp_localize_script('semantix-react-app', 'semantixData', array(
            'apiUrl' => rest_url('semantix/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'siteUrl' => get_site_url(),
            'siteName' => get_bloginfo('name'),
            'adminUrl' => admin_url(),
            'pluginUrl' => SEMANTIX_PLUGIN_URL,
        ));
    }
    
    public function admin_page() {
        echo '<div id="semantix-root"></div>';
    }
    
    public function register_rest_routes() {
        register_rest_route('semantix/v1', '/projects', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_projects'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
        
        register_rest_route('semantix/v1', '/projects', array(
            'methods' => 'POST',
            'callback' => array($this, 'create_project'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
        
        register_rest_route('semantix/v1', '/activities', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_activities'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
        
        register_rest_route('semantix/v1', '/entities', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_entities'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
        
        register_rest_route('semantix/v1', '/clusters', array(
            'methods' => 'POST',
            'callback' => array($this, 'generate_clusters'),
            'permission_callback' => array($this, 'check_permissions'),
        ));
    }
    
    public function check_permissions() {
        return current_user_can('manage_options');
    }
    
    public function get_projects($request) {
        // Mock data for now
        $projects = array(
            array(
                'id' => 1,
                'name' => 'optimizora.com',
                'url' => 'https://optimizora.com',
                'description' => 'Welcome to Optimizora',
                'status' => 'active',
                'created_at' => '2025-01-15',
                'stats' => array(
                    'semantic_score' => 85,
                    'entity_coverage' => 'High',
                    'optimization_score' => 85
                )
            ),
            array(
                'id' => 2,
                'name' => 'example.com',
                'url' => 'https://example.com',
                'description' => 'Example website project',
                'status' => 'active',
                'created_at' => '2025-01-10',
                'stats' => array(
                    'semantic_score' => 72,
                    'entity_coverage' => 'Medium',
                    'optimization_score' => 72
                )
            )
        );
        
        return rest_ensure_response($projects);
    }
    
    public function create_project($request) {
        $params = $request->get_json_params();
        
        // Validate required fields
        if (empty($params['name']) || empty($params['url'])) {
            return new WP_Error('missing_fields', 'Name and URL are required', array('status' => 400));
        }
        
        // Mock creation - in real implementation, save to database
        $project = array(
            'id' => rand(1000, 9999),
            'name' => sanitize_text_field($params['name']),
            'url' => esc_url_raw($params['url']),
            'description' => sanitize_textarea_field($params['description'] ?? ''),
            'status' => 'active',
            'created_at' => current_time('Y-m-d'),
            'stats' => array(
                'semantic_score' => 0,
                'entity_coverage' => 'Not analyzed',
                'optimization_score' => 0
            )
        );
        
        return rest_ensure_response($project);
    }
    
    public function get_activities($request) {
        // Mock activity data
        $activities = array(
            array(
                'id' => 1,
                'action' => 'Entity analysis completed',
                'project' => 'optimizora.com',
                'timestamp' => '2 minutes ago',
                'status' => 'completed',
                'details' => 'Found 45 semantic entities'
            ),
            array(
                'id' => 2,
                'action' => 'Content brief generated',
                'project' => 'optimizora.com',
                'timestamp' => '15 minutes ago',
                'status' => 'ready',
                'details' => '2,500 word comprehensive brief'
            ),
            array(
                'id' => 3,
                'action' => 'Keyword cluster analysis',
                'project' => 'optimizora.com',
                'timestamp' => '1 hour ago',
                'status' => 'processing',
                'details' => 'Processing 150 keywords'
            )
        );
        
        return rest_ensure_response($activities);
    }
    
    public function get_entities($request) {
        // Mock entity data
        $entities = array(
            array(
                'id' => 1,
                'title' => 'Digital Marketing Strategy',
                'type' => 'Content',
                'status' => 'Active',
                'description' => 'Comprehensive guide to digital marketing tactics',
                'lastModified' => 'Last modified 2 days ago',
                'icon' => 'FileText',
                'color' => 'bg-blue-100 text-blue-600',
                'searchVolume' => 12000,
                'intent' => 'Informational'
            ),
            array(
                'id' => 2,
                'title' => 'SEO Optimization',
                'type' => 'Tool',
                'status' => 'Active',
                'description' => 'Advanced SEO analysis and optimization',
                'lastModified' => 'Last modified 1 week ago',
                'icon' => 'Search',
                'color' => 'bg-green-100 text-green-600',
                'searchVolume' => 8500,
                'intent' => 'Commercial'
            )
        );
        
        return rest_ensure_response($entities);
    }
    
    public function generate_clusters($request) {
        $params = $request->get_json_params();
        $core_topic = sanitize_text_field($params['core_topic'] ?? '');
        
        if (empty($core_topic)) {
            return new WP_Error('missing_topic', 'Core topic is required', array('status' => 400));
        }
        
        // Mock cluster generation
        $clusters = array(
            'id' => 'core',
            'title' => $core_topic,
            'level' => 0,
            'color' => '#FFD93D',
            'expanded' => true,
            'x' => 400,
            'y' => 100,
            'children' => array(
                array(
                    'id' => 'cluster-1',
                    'title' => $core_topic . ' Strategy',
                    'level' => 1,
                    'color' => '#A0F0D0',
                    'expanded' => true,
                    'x' => 200,
                    'y' => 250,
                    'searchVolume' => 12000,
                    'intent' => 'Informational',
                    'children' => array()
                ),
                array(
                    'id' => 'cluster-2',
                    'title' => $core_topic . ' Tools',
                    'level' => 1,
                    'color' => '#B8D1FF',
                    'expanded' => true,
                    'x' => 600,
                    'y' => 250,
                    'searchVolume' => 8500,
                    'intent' => 'Commercial',
                    'children' => array()
                )
            )
        );
        
        return rest_ensure_response($clusters);
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
    }
    
    private function create_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'semantix_projects';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            url varchar(255) NOT NULL,
            description text,
            status varchar(50) DEFAULT 'active',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

// Initialize the plugin
new SemantixSEOAnalyzer();