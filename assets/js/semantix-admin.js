// WordPress Semantix Plugin - Admin JavaScript
(function($) {
    'use strict';

    // Main plugin object
    window.SemantixPlugin = {
        init: function() {
            this.bindEvents();
            this.initializeComponents();
        },

        bindEvents: function() {
            $(document).ready(() => {
                this.renderDashboard();
                this.renderEntityExplorer();
                this.renderTopicClusters();
            });
        },

        initializeComponents: function() {
            // Initialize React components for each page
            if (document.getElementById('semantix-dashboard-root')) {
                this.renderDashboard();
            }
            if (document.getElementById('semantix-entity-explorer-root')) {
                this.renderEntityExplorer();
            }
            if (document.getElementById('semantix-topic-clusters-root')) {
                this.renderTopicClusters();
            }
        },

        renderDashboard: function() {
            const dashboardRoot = document.getElementById('semantix-dashboard-root');
            if (!dashboardRoot) return;

            // Create WordPress-specific dashboard
            const dashboardHTML = `
                <div class="semantix-dashboard">
                    <div class="semantix-header">
                        <h1>Semantix SEO Analyzer</h1>
                        <p>Analyze your WordPress content with advanced semantic SEO tools</p>
                    </div>
                    
                    <div class="semantix-stats-grid">
                        <div class="stat-card">
                            <h3>Total Posts</h3>
                            <div class="stat-number">${semantixData.totalPosts}</div>
                            <p>Published posts</p>
                        </div>
                        <div class="stat-card">
                            <h3>Total Pages</h3>
                            <div class="stat-number">${semantixData.totalPages}</div>
                            <p>Published pages</p>
                        </div>
                        <div class="stat-card">
                            <h3>Site Analysis</h3>
                            <div class="stat-number">85%</div>
                            <p>Semantic score</p>
                        </div>
                        <div class="stat-card">
                            <h3>Entities Found</h3>
                            <div class="stat-number">247</div>
                            <p>Across all content</p>
                        </div>
                    </div>

                    <div class="semantix-tools-grid">
                        <div class="tool-card" data-tool="entity-explorer">
                            <div class="tool-icon">🔍</div>
                            <h3>Entity Explorer</h3>
                            <p>Discover semantic entities in your WordPress content</p>
                            <button class="tool-launch-btn">Launch Tool</button>
                        </div>
                        <div class="tool-card" data-tool="topic-clusters">
                            <div class="tool-icon">🧩</div>
                            <h3>Topic Cluster Generator</h3>
                            <p>Generate topic clusters from your existing content</p>
                            <button class="tool-launch-btn">Launch Tool</button>
                        </div>
                        <div class="tool-card" data-tool="content-analysis">
                            <div class="tool-icon">📊</div>
                            <h3>Content Analysis</h3>
                            <p>Analyze individual posts and pages for SEO optimization</p>
                            <button class="tool-launch-btn">Launch Tool</button>
                        </div>
                        <div class="tool-card" data-tool="semantic-gaps">
                            <div class="tool-icon">⚡</div>
                            <h3>Semantic Gap Analyzer</h3>
                            <p>Find content gaps in your semantic coverage</p>
                            <button class="tool-launch-btn">Launch Tool</button>
                        </div>
                    </div>

                    <div class="semantix-recent-activity">
                        <h2>Recent Analysis</h2>
                        <div class="activity-list">
                            <div class="activity-item">
                                <div class="activity-icon">✅</div>
                                <div class="activity-content">
                                    <h4>Content analyzed</h4>
                                    <p>"How to Start a Blog" - 2 minutes ago</p>
                                </div>
                                <div class="activity-score">Score: 92%</div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon">🔍</div>
                                <div class="activity-content">
                                    <h4>Entities extracted</h4>
                                    <p>"WordPress Tutorial" - 15 minutes ago</p>
                                </div>
                                <div class="activity-score">15 entities</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            dashboardRoot.innerHTML = dashboardHTML;
            this.bindDashboardEvents();
        },

        renderEntityExplorer: function() {
            const explorerRoot = document.getElementById('semantix-entity-explorer-root');
            if (!explorerRoot) return;

            const explorerHTML = `
                <div class="semantix-entity-explorer">
                    <div class="explorer-header">
                        <h1>Entity Explorer</h1>
                        <p>Discover and analyze semantic entities in your WordPress content</p>
                    </div>

                    <div class="explorer-search">
                        <input type="text" id="entity-search" placeholder="Search entities... (autocomplete enabled)" />
                        <button id="search-btn">🔍</button>
                    </div>

                    <div class="explorer-filters">
                        <select id="type-filter">
                            <option value="">All Types</option>
                            <option value="post">Posts</option>
                            <option value="page">Pages</option>
                            <option value="product">Products</option>
                        </select>
                        <select id="status-filter">
                            <option value="">All Status</option>
                            <option value="publish">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                        <input type="date" id="date-filter" />
                    </div>

                    <div class="explorer-content">
                        <div class="entities-list">
                            <div id="entities-container">
                                <div class="loading">Loading entities...</div>
                            </div>
                        </div>
                        
                        <div class="explorer-sidebar">
                            <div class="tag-cloud">
                                <h3>Tag Cloud</h3>
                                <div id="tag-cloud-container"></div>
                            </div>
                            
                            <div class="recent-entities">
                                <h3>Recently Viewed</h3>
                                <div id="recent-entities-container"></div>
                            </div>
                            
                            <div class="stats-overview">
                                <h3>Statistics</h3>
                                <div class="stat-item">
                                    <span>Entity Coverage</span>
                                    <div class="progress-bar">
                                        <div class="progress" style="width: 85%"></div>
                                    </div>
                                    <span>85%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            explorerRoot.innerHTML = explorerHTML;
            this.loadEntities();
            this.bindExplorerEvents();
        },

        renderTopicClusters: function() {
            const clustersRoot = document.getElementById('semantix-topic-clusters-root');
            if (!clustersRoot) return;

            const clustersHTML = `
                <div class="semantix-topic-clusters">
                    <div class="clusters-header">
                        <h1>Topic Cluster Generator</h1>
                        <p>Generate semantic topic clusters from your WordPress content</p>
                    </div>

                    <div class="clusters-input">
                        <div class="input-section">
                            <h3>Enter Your Core Topic</h3>
                            <input type="text" id="core-topic" placeholder="e.g., WordPress SEO" />
                            
                            <div class="settings">
                                <label>
                                    Target Region:
                                    <select id="target-region">
                                        <option value="US">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="CA">Canada</option>
                                    </select>
                                </label>
                                
                                <label>
                                    Content Format:
                                    <select id="content-format">
                                        <option value="blog">Blog Post</option>
                                        <option value="page">Page</option>
                                        <option value="product">Product</option>
                                    </select>
                                </label>
                                
                                <label>
                                    Cluster Depth:
                                    <select id="cluster-depth">
                                        <option value="1">1 Level</option>
                                        <option value="2">2 Levels</option>
                                        <option value="3">3 Levels</option>
                                    </select>
                                </label>
                            </div>
                            
                            <button id="generate-clusters" class="generate-btn">Generate Clusters</button>
                        </div>
                    </div>

                    <div class="clusters-output">
                        <div class="view-controls">
                            <button id="tree-view" class="active">Tree View</button>
                            <button id="list-view">List View</button>
                        </div>
                        
                        <div id="clusters-container">
                            <div class="empty-state">
                                <h3>No clusters generated yet</h3>
                                <p>Enter a core topic and click "Generate Clusters" to see the visualization</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            clustersRoot.innerHTML = clustersHTML;
            this.bindClustersEvents();
        },

        bindDashboardEvents: function() {
            $('.tool-card').on('click', function() {
                const tool = $(this).data('tool');
                window.location.href = `admin.php?page=semantix-${tool}`;
            });
        },

        bindExplorerEvents: function() {
            $('#entity-search').on('input', this.debounce(() => {
                this.loadEntities();
            }, 300));

            $('#type-filter, #status-filter').on('change', () => {
                this.loadEntities();
            });
        },

        bindClustersEvents: function() {
            $('#generate-clusters').on('click', () => {
                this.generateClusters();
            });

            $('#tree-view, #list-view').on('click', function() {
                $('.view-controls button').removeClass('active');
                $(this).addClass('active');
                // Switch view logic here
            });
        },

        loadEntities: function() {
            const search = $('#entity-search').val();
            const type = $('#type-filter').val();
            const status = $('#status-filter').val();

            $.ajax({
                url: semantixData.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'semantix_get_entities',
                    nonce: semantixData.nonce,
                    search: search,
                    type: type,
                    status: status
                },
                success: (response) => {
                    if (response.success) {
                        this.renderEntities(response.data);
                    }
                }
            });
        },

        renderEntities: function(entities) {
            const container = $('#entities-container');
            let html = '';

            entities.forEach(entity => {
                html += `
                    <div class="entity-card">
                        <div class="entity-icon">${this.getEntityIcon(entity.icon)}</div>
                        <div class="entity-content">
                            <h4>${entity.title}</h4>
                            <div class="entity-meta">
                                <span class="entity-type">${entity.type}</span>
                                <span class="entity-status">${entity.status}</span>
                            </div>
                            <p>${entity.description}</p>
                            <small>${entity.lastModified}</small>
                        </div>
                        <div class="entity-actions">
                            <button class="action-btn view-btn" data-id="${entity.id}">View</button>
                            <button class="action-btn edit-btn" data-id="${entity.id}">Edit</button>
                            <button class="action-btn delete-btn" data-id="${entity.id}">Delete</button>
                        </div>
                    </div>
                `;
            });

            container.html(html);
        },

        generateClusters: function() {
            const coreTopic = $('#core-topic').val();
            const region = $('#target-region').val();
            const format = $('#content-format').val();
            const depth = $('#cluster-depth').val();

            if (!coreTopic) {
                alert('Please enter a core topic');
                return;
            }

            $('#generate-clusters').text('Generating...').prop('disabled', true);

            $.ajax({
                url: semantixData.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'semantix_generate_clusters',
                    nonce: semantixData.nonce,
                    core_topic: coreTopic,
                    region: region,
                    format: format,
                    depth: depth
                },
                success: (response) => {
                    if (response.success) {
                        this.renderClusters(response.data);
                    }
                    $('#generate-clusters').text('Generate Clusters').prop('disabled', false);
                }
            });
        },

        renderClusters: function(clusters) {
            const container = $('#clusters-container');
            
            // Simple tree visualization
            let html = '<div class="cluster-tree">';
            html += this.renderClusterNode(clusters, 0);
            html += '</div>';
            
            container.html(html);
        },

        renderClusterNode: function(node, level) {
            const indent = level * 30;
            let html = `
                <div class="cluster-node" style="margin-left: ${indent}px; background-color: ${node.color}">
                    <h4>${node.title}</h4>
                    ${node.searchVolume ? `<span class="volume">${node.searchVolume} searches/mo</span>` : ''}
                    ${node.intent ? `<span class="intent">${node.intent}</span>` : ''}
                </div>
            `;

            if (node.children && node.children.length > 0) {
                node.children.forEach(child => {
                    html += this.renderClusterNode(child, level + 1);
                });
            }

            return html;
        },

        getEntityIcon: function(iconName) {
            const icons = {
                'FileText': '📄',
                'ShoppingCart': '🛒',
                'User': '👤',
                'Calendar': '📅'
            };
            return icons[iconName] || '📄';
        },

        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    // Initialize when DOM is ready
    $(document).ready(() => {
        SemantixPlugin.init();
    });

})(jQuery);