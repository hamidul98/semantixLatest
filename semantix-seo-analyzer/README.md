# Semantix SEO Analyzer WordPress Plugin

A comprehensive WordPress plugin for semantic SEO analysis with a modern React-based dashboard.

## Features

- **Dashboard**: Overview of all projects with activity feed
- **Entity Explorer**: Discover and analyze semantic entities
- **Topic Cluster Generator**: Generate topic clusters for content planning
- **Project Management**: Add and manage multiple website projects
- **WordPress Integration**: Full WordPress REST API integration
- **Modern UI**: React-based interface with Tailwind CSS styling

## Installation

1. Upload the `semantix-seo-analyzer` folder to your `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Navigate to 'Semantix SEO' in your WordPress admin menu

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WordPress development environment

### Building the React App

1. Navigate to the plugin directory:
   ```bash
   cd wp-content/plugins/semantix-seo-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the React app:
   ```bash
   npm run build
   ```

4. For development with hot reload:
   ```bash
   npm start
   ```

### Plugin Structure

```
semantix-seo-analyzer/
├── semantix-seo-analyzer.php    # Main plugin file
├── src/                         # React source files
│   ├── components/             # React components
│   ├── utils/                  # Utility functions
│   └── index.js               # React entry point
├── build/                      # Built React files (generated)
├── public/                     # Public assets
└── package.json               # Node.js dependencies
```

## WordPress Integration

The plugin integrates with WordPress through:

- **REST API Endpoints**: Custom endpoints for data management
- **Admin Menu**: WordPress admin integration
- **Nonce Security**: WordPress security implementation
- **User Permissions**: WordPress capability checks

### Available REST Endpoints

- `GET /wp-json/semantix/v1/projects` - Get all projects
- `POST /wp-json/semantix/v1/projects` - Create new project
- `GET /wp-json/semantix/v1/activities` - Get recent activities
- `GET /wp-json/semantix/v1/entities` - Get entities
- `POST /wp-json/semantix/v1/clusters` - Generate topic clusters

## Customization

### Adding New Components

1. Create component in `src/components/`
2. Add route in `src/App.js`
3. Update sidebar navigation in `src/components/Sidebar.js`

### Styling

The plugin uses Tailwind CSS for styling. Customize styles by:

1. Modifying component classes
2. Extending Tailwind config in `tailwind.config.js`
3. Adding custom CSS in `src/index.css`

### API Integration

Extend API functionality by:

1. Adding new endpoints in the main PHP file
2. Creating corresponding API calls in `src/utils/api.js`
3. Implementing data handling in components

## Security

- All API requests use WordPress nonces
- User capability checks on all endpoints
- Input sanitization and validation
- SQL injection prevention

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

GPL v2 or later

## Support

For support and documentation, visit the plugin's admin page in your WordPress dashboard.