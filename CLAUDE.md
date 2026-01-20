# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**思维兵工厂 (Mind Arsenal)** - A pure static responsive website navigation portal written in Chinese. This is a personal bookmark management system that replaces traditional browser bookmarks with a centralized, visually appealing web interface.

**Key Characteristics:**
- Pure static HTML/CSS/JavaScript (no build process, no frameworks)
- Chinese-focused with extensive AI tool categorization
- GitHub Actions deployment to GitHub Pages on master branch pushes
- localStorage-based user customization persistence

## Architecture

### Frontend Stack
- Pure HTML/CSS/JavaScript (no frameworks)
- Font Awesome icons via CDN
- Particles.js for background effects
- Modular JavaScript architecture with ES6 classes

### Key Files Structure
```
index.html              # Main entry point
data/websites.js        # Website data (22KB) - primary data source
data/websites.json      # JSON backup of website data
js/app.js              # Main application entry, initializes modules
js/links.js            # LinksManager class - drag-and-drop link management (14KB)
js/news.js             # NewsCarousel class - multi-platform news aggregation (9KB)
js/search.js           # SearchManager class - multi-engine search functionality
js/config.js           # Particle effects configuration
css/theme.css          # Main theme styles with CSS custom properties
css/components.css     # Component-specific styles
icon/                  # 140+ website favicons (PNG format)
.github/workflows/     # GitHub Actions for automatic deployment
```

### Module Architecture
The application uses a modular class-based architecture initialized in `js/app.js`:
- **LinksManager** (`js/links.js`) - Core link management with drag-and-drop, localStorage persistence, modal forms for add/edit/delete
- **NewsCarousel** (`js/news.js`) - Aggregates trending topics from 9 Chinese platforms via API
- **SearchManager** (`js/search.js`) - Multi-engine search with dropdown selection and mouse wheel switching support
- **ThemeManager** (`js/theme.js`) - Theme switching via header click with system preference detection
- All modules communicate through DOM events and shared localStorage

## Development Commands

### Local Development
**思维兵工厂是一个纯静态网站**，无需启动任何服务器即可运行。

```bash
# 推荐方式：直接打开文件（完整功能支持）
# 直接在浏览器中打开 index.html 文件
# 或在文件管理器中双击 index.html
```

**注意**：由于是纯HTML/CSS/JS实现，直接打开 `index.html` 文件即可完整使用所有功能，包括编辑模式、拖拽排序、本地存储等。

### Testing Changes
```bash
# No formal test suite - manual testing required
# Test responsive design by resizing browser
# Test localStorage functionality in browser dev tools
# Test drag-and-drop in Application tab
# Test news loading in Network tab (check api.mdnice.com requests)
```

### Deployment
```bash
# Automatic deployment via GitHub Actions on push to master branch
# Manual deployment: Push to master branch triggers GitHub Pages deployment
# No build commands needed - pure static files

# Check deployment status:
git push origin master
# Then check GitHub Actions tab for deployment status
```

## Common Development Tasks

### Adding/Modifying Websites
1. Edit `data/websites.js` - add site objects to appropriate category arrays
2. Add 32x32 PNG favicon to `icon/` directory (follow existing naming convention: `website-name.png`)
3. Follow exact data structure:
```javascript
{
    "name": "Website Name",
    "subtitle": "Description",
    "url": "https://example.com",
    "icon": "./icon/website-favicon.png"
}
```
4. Test favicon loading - fallback to SVG if missing
5. Update `data/websites.json` backup file if making significant changes

**Icon Naming Convention**: Use lowercase, hyphens for spaces, e.g., `github-copilot.png`, `baidu-wenku.png`

### Modifying News Sources
Edit `js/news.js` - modify the `platforms` array and corresponding API endpoints. Current sources: 知乎, 微博, 头条, 虎扑, B站, CSDN, GitHub, 掘金, 豆瓣.

### Customizing Categories
Categories are defined in `data/websites.js` as object keys: 常用, 工作, AI官网, 云服务, 工具汇集, 墙外世界, 阅读. Modify these keys to change categories.

### Debugging localStorage Issues
```javascript
// View stored data in browser console
console.log('Website order:', localStorage.getItem('websitesOrder'));
console.log('Custom websites:', localStorage.getItem('customWebsites'));
console.log('Deleted websites:', localStorage.getItem('deletedDefaultWebsites'));
console.log('News cache:', localStorage.getItem('newsCache'));
console.log('Theme preference:', localStorage.getItem('theme'));

// Clear specific keys if needed
localStorage.removeItem('websitesOrder');
localStorage.removeItem('customWebsites');

// Clear all localStorage (use with caution)
localStorage.clear();

// Test data structure validity
try {
    const order = JSON.parse(localStorage.getItem('websitesOrder'));
    console.log('Valid website order:', Array.isArray(order));
} catch (e) {
    console.error('Invalid websitesOrder data');
}
```

## Key Technical Details

### Data Management Strategy
- **Primary Storage**: JavaScript object in `data/websites.js` (677 lines)
- **User Customizations**: localStorage keys: `websitesOrder`, `customWebsites`, `deletedDefaultWebsites`
- **Drag-and-Drop Order**: Persisted in `websitesOrder` as array of website names
- **Custom Sites**: Stored in `customWebsites` with `"custom": true` flag
- **Backup**: JSON format in `data/websites.json` for data portability
- **News Cache**: `newsCache` stores fetched news with timestamp for rate limiting

### Critical localStorage Keys (Never Change These)
- `websitesOrder`: Array of website names determining display order
- `customWebsites`: Array of user-added websites
- `deletedDefaultWebsites`: Array of default websites user has removed
- `theme`: User's theme preference ('light', 'dark', or 'auto')
- `newsCache`: Cached news data with timestamp
- `lastNewsFetch`: Timestamp for news API rate limiting

### Search Engine Integration
Search engines in `js/search.js` (lines 15-21): Baidu, Sogou, Bing, MetaSo (秘塔), Google. Each engine has specific URL format and encoding requirements.

**Mouse Wheel Switching**: SearchManager supports mouse wheel scrolling on the search input or select element to cycle through search engines. Implementation in `js/search.js` lines 53-73 with `switchEngine()` method handling circular navigation.

### News API Integration
News fetched from `https://api.mdnice.com/trendings` with platform-specific parameters. Rate limiting handled by caching last fetch time in localStorage.

**Supported Platforms**: 知乎(zhihu), 微博(weibo), 头条(toutiao), 虎扑(hupu), B站(bilibili), CSDN(csdn), GitHub(github), 掘金(juejin), 豆瓣(douban)

### Responsive Design Implementation
- **CSS Custom Properties**: Defined in `css/theme.css` for consistent theming
- **Sidebar Toggle**: Animated with CSS transforms, state managed in `js/app.js`
- **Grid Layout**: CSS Grid for link cards, adapts to screen size
- **Touch Events**: Touch-friendly drag-and-drop with visual feedback
- **Search UX**: Mouse wheel support for switching search engines and enhanced focus states for better visibility across themes

### Performance Considerations
- **Icon Loading**: Favicons with SVG fallback in `js/links.js` (lines 180-190)
- **News Loading**: Asynchronous with loading states
- **DOM Efficiency**: Event delegation for dynamic content
- **No Framework**: Direct DOM manipulation for performance
- **Particle Effects**: Configurable via `js/config.js` with theme-specific settings

## Important Implementation Notes

- **Chinese-focused**: All UI text, news sources, and default websites are Chinese
- **AI-heavy**: Extensive AI tool categorization in "AI官网" category
- **localStorage Keys**: Never change these keys - user data depends on them
- **Icon Format**: Use 32x32 PNG files, follow existing naming patterns
- **URL Validation**: Basic validation in modal forms, assumes HTTPS
- **GitHub Pages**: Configured for custom domain, automatic deployment on push

### Theme Switching Implementation
Theme switching is triggered by clicking the "思维兵工厂" header title (`js/theme.js` line 56-72). No visual change to the title style - cursor changes to pointer on hover with title tooltip. System preference detection with localStorage persistence for user preference.

### Search Box Styling
Search wrapper uses enhanced focus states with 1px accent-colored border and glow effects. Dark theme has additional box-shadow and transform effects for better visibility (`css/theme.css` lines 95-100). Select dropdown styling handles both light and dark themes with proper contrast ratios.

### Module Communication Pattern
Modules communicate through:
- Shared localStorage keys for data persistence
- DOM events for UI updates
- Direct method calls between instantiated classes
- Global event listeners for theme changes and responsive behavior

### Error Handling Strategy
- **News API failures**: Graceful fallback with error message in carousel
- **Icon loading failures**: Automatic SVG fallback generation
- **localStorage failures**: Silent failure with console warnings
- **Drag-and-drop errors**: Visual feedback with error states
- **Network issues**: Retry logic for news fetching with exponential backoff

## Common Issues and Solutions

### Favicon Not Loading
Check icon path in `data/websites.js` - must match filename in `icon/` directory exactly. Fallback SVG will display if file missing.

### localStorage Corruption
Clear browser data or use `localStorage.clear()` in console if websites disappear.

**Symptoms**: Websites disappear, drag-and-drop stops working, theme resets
**Solution**:
```javascript
// Backup important data first
const backup = localStorage.getItem('customWebsites');
// Clear corrupted data
localStorage.clear();
// Restore backup if needed
if (backup) localStorage.setItem('customWebsites', backup);
```

### Drag-and-Drop Not Working
**Symptoms**: Links can't be dragged, visual feedback not working, order not saving
**Common Causes**:
- JavaScript errors in console
- Invalid `websitesOrder` in localStorage
- CSS conflicts with drag states
- Touch event conflicts on mobile

**Debugging Steps**:
```javascript
// Check for valid websitesOrder
const order = localStorage.getItem('websitesOrder');
console.log('Current order:', order);
console.log('Is valid array:', Array.isArray(JSON.parse(order)));

// Check for console errors
git add . && git commit -m "Debug drag-and-drop" && git push
// Then check browser console on live site
```

### News Not Loading
**Symptoms**: News carousel shows loading spinner indefinitely or displays error message
**Common Causes**:
- API rate limiting (especially after frequent refreshes)
- Network connectivity issues
- CORS restrictions when running locally
- API endpoint changes

**Solutions**:
```javascript
// Check if rate limited
const lastFetch = localStorage.getItem('lastNewsFetch');
const now = Date.now();
if (now - lastFetch < 60000) {
    console.log('Rate limited - wait 60 seconds between requests');
}

// Manual API test
fetch('https://api.mdnice.com/trendings?platform=zhihu')
    .then(r => r.json())
    .then(data => console.log('API working:', data))
    .catch(err => console.error('API error:', err));

// Clear news cache to force refresh
localStorage.removeItem('newsCache');
localStorage.removeItem('lastNewsFetch');
```

### GitHub Pages Deployment Issues
**Symptoms**: Changes not appearing after push, 404 errors, broken assets
**Debugging**:
```bash
# Check GitHub Actions status
git push origin master
# Visit GitHub repository → Actions tab to see deployment status

# Verify file paths are correct (relative to repository root)
# Check that icon files are committed and pushed
git status
# Ensure no large files (>100MB) that might break deployment
```