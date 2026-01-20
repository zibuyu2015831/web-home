// 新闻侧边栏模块

// 缓存配置常量
const NEWS_CACHE_KEY = 'newsDataCache';
const NEWS_CACHE_DURATION = 10 * 60 * 1000;  // 10 分钟
const NEWS_API_URL = 'https://api.mdnice.com/trendings';

class NewsCarousel {
    constructor(containerId) {
        this.newsListContainer = document.getElementById(containerId);
        this.tabsContainer = document.getElementById('newsTabsContainer');
        this.newsData = {};
        this.currentPlatform = 'all';

        // 平台配置
        this.platformConfig = {
            'zhihu': { name: '知乎', icon: '🔵' },
            'weibo': { name: '微博', icon: '🔴' },
            'toutiao': { name: '头条', icon: '📰' },
            'hupu': { name: '虎扑', icon: '🏀' },
            'bilibili': { name: 'B站', icon: '📺' },
            'csdn': { name: 'CSDN', icon: '💻' },
            'github': { name: 'GitHub', icon: '🐙' },
            'juejin': { name: '掘金', icon: '💎' },
            'douban': { name: '豆瓣', icon: '📚' }
        };
    }

    // 解析更新时间为秒数(用于排序)
    parseUpdateTime(upToNow) {
        const timeStr = upToNow.trim();

        if (timeStr.includes('秒')) {
            return parseInt(timeStr) || 0;
        } else if (timeStr.includes('分钟')) {
            return (parseInt(timeStr) || 0) * 60;
        } else if (timeStr.includes('小时')) {
            return (parseInt(timeStr) || 0) * 3600;
        } else if (timeStr.includes('天')) {
            return (parseInt(timeStr) || 0) * 86400;
        } else if (timeStr.includes('月')) {
            return (parseInt(timeStr) || 0) * 2592000;
        } else if (timeStr.includes('年')) {
            return (parseInt(timeStr) || 0) * 31536000;
        }

        return 999999999;
    }

    // 解析新闻数据并按平台分类
    parseData(data) {
        const realData = data.data;
        const newsDict = {
            all: []
        };

        for (let i = 0; i < realData.length; i++) {
            const platform = realData[i];
            const platformType = platform.type;
            const platformName = platform.name;
            const upToNow = platform.upToNow;

            if (!newsDict[platformType]) {
                newsDict[platformType] = {
                    name: platformName,
                    upToNow: upToNow,
                    items: []
                };
            }

            if (platform.trendingItemList && platform.trendingItemList.length > 0) {
                for (let j = 0; j < platform.trendingItemList.length; j++) {
                    const newsItem = {
                        url: platform.trendingItemList[j].link,
                        title: platform.trendingItemList[j].title,
                        tag: platform.trendingItemList[j].titleTag,
                        platform: platformName,
                        platformType: platformType,
                        upToNow: upToNow,
                        updateTimeSeconds: this.parseUpdateTime(upToNow)
                    };

                    newsDict[platformType].items.push(newsItem);
                    newsDict.all.push(newsItem);
                }
            }
        }

        newsDict.all.sort((a, b) => a.updateTimeSeconds - b.updateTimeSeconds);

        return newsDict;
    }

    // 获取新闻数据 (带缓存机制)
    async fetchCarouselData() {
        try {
            // 检查缓存
            const cached = this.getCachedNews();
            if (cached) {
                console.log('使用缓存的新闻数据');
                return cached;
            }

            // 获取新数据
            console.log('从 API 获取新闻数据');
            const response = await fetch(NEWS_API_URL);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // 验证数据格式
            if (!data || !data.data || !Array.isArray(data.data)) {
                throw new Error('API 返回数据格式无效');
            }

            const parsedData = this.parseData(data);

            // 保存到缓存
            this.cacheNews(parsedData);

            return parsedData;

        } catch (error) {
            console.error("获取新闻数据失败:", error);

            // 尝试使用过期缓存作为降级方案
            const expiredCache = this.getExpiredCache();
            if (expiredCache) {
                console.warn('使用过期缓存数据');
                return expiredCache;
            }

            return { all: [] };
        }
    }

    // 获取有效缓存
    getCachedNews() {
        try {
            const cached = localStorage.getItem(NEWS_CACHE_KEY);
            if (!cached) return null;

            const { data, timestamp } = JSON.parse(cached);
            const age = Date.now() - timestamp;

            if (age < NEWS_CACHE_DURATION) {
                return data;
            }

            return null;
        } catch (error) {
            console.error('读取新闻缓存失败:', error);
            return null;
        }
    }

    // 保存新闻到缓存
    cacheNews(data) {
        try {
            const cacheData = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify(cacheData));
        } catch (error) {
            console.error('保存新闻缓存失败:', error);
        }
    }

    // 获取过期缓存(降级方案)
    getExpiredCache() {
        try {
            const cached = localStorage.getItem(NEWS_CACHE_KEY);
            if (!cached) return null;

            const { data } = JSON.parse(cached);
            return data;
        } catch (error) {
            return null;
        }
    }

    // 生成分类标签
    generateCategoryTabs() {
        if (!this.tabsContainer) return;

        this.tabsContainer.innerHTML = '';
        this.tabsContainer.classList.add('news-tabs');

        // 全部标签
        const allTab = document.createElement('button');
        allTab.className = `news-tab ${this.currentPlatform === 'all' ? 'active' : ''}`;
        allTab.dataset.platform = 'all';
        allTab.innerHTML = `📰 全部`;
        allTab.addEventListener('click', () => this.switchPlatform('all'));
        this.tabsContainer.appendChild(allTab);

        // 其他平台标签
        for (const [type, config] of Object.entries(this.platformConfig)) {
            if (this.newsData[type] && this.newsData[type].items.length > 0) {
                const tab = document.createElement('button');
                tab.className = `news-tab ${type === this.currentPlatform ? 'active' : ''}`;
                tab.dataset.platform = type;
                tab.innerHTML = `${config.icon} ${config.name}`;
                tab.addEventListener('click', () => this.switchPlatform(type));
                this.tabsContainer.appendChild(tab);
            }
        }
    }

    // 切换平台
    switchPlatform(platform) {
        this.currentPlatform = platform;

        // 更新标签状态
        if (this.tabsContainer) {
            this.tabsContainer.querySelectorAll('.news-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.platform === platform);
            });
        }

        this.renderNewsList();
    }

    // 渲染新闻列表
    renderNewsList() {
        if (!this.newsListContainer) return;

        this.newsListContainer.innerHTML = '';

        let items = [];
        let platformInfo = null;

        if (this.currentPlatform === 'all') {
            items = this.newsData.all || [];
        } else if (this.newsData[this.currentPlatform]) {
            items = this.newsData[this.currentPlatform].items || [];
            platformInfo = this.newsData[this.currentPlatform];
        }

        if (items.length === 0) {
            this.newsListContainer.innerHTML = '<div class="no-news">暂无新闻</div>';
            return;
        }

        // 如果是单个平台,显示平台更新时间
        if (platformInfo) {
            const platformHeader = document.createElement('div');
            platformHeader.className = 'platform-header';
            platformHeader.innerHTML = `
        <span class="platform-name">${platformInfo.name}</span>
        <span class="platform-update-time">🕐 ${platformInfo.upToNow}</span>
      `;
            this.newsListContainer.appendChild(platformHeader);
        }

        items.forEach((item) => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';

            const link = document.createElement('a');
            link.href = item.url || '#';
            link.target = '_blank';

            // 新闻标题
            const title = document.createElement('div');
            title.className = 'news-title';
            title.textContent = item.title;

            // 新闻元信息
            const meta = document.createElement('div');
            meta.className = 'news-meta';

            // 显示平台(仅在"全部"视图)
            if (this.currentPlatform === 'all') {
                const platform = document.createElement('span');
                platform.className = 'news-platform';
                const platformIcon = this.platformConfig[item.platformType]?.icon || '📰';
                platform.textContent = `${platformIcon} ${item.platform}`;
                meta.appendChild(platform);
            }

            // 显示更新时间
            const updateTime = document.createElement('span');
            updateTime.className = 'news-update-time';
            updateTime.textContent = `🕐 ${item.upToNow}`;
            meta.appendChild(updateTime);

            // 显示热度标签
            if (item.tag) {
                const tag = document.createElement('span');
                tag.className = 'news-tag';
                tag.textContent = item.tag;
                meta.appendChild(tag);
            }

            link.appendChild(title);
            if (meta.children.length > 0) {
                link.appendChild(meta);
            }

            newsItem.appendChild(link);
            this.newsListContainer.appendChild(newsItem);
        });
    }

    // 初始化
    async init() {
        if (this.newsListContainer) {
            this.newsListContainer.innerHTML = '<div class="loading">加载中...</div>';
        }

        this.newsData = await this.fetchCarouselData();

        // 设置移动端UI
        this.setupMobileUI();

        if (this.newsData.all && this.newsData.all.length > 0) {
            // 生成分类标签
            this.generateCategoryTabs();

            // 渲染新闻列表
            this.renderNewsList();
        } else {
            if (this.newsListContainer) {
                this.newsListContainer.innerHTML = '<div class="no-news">暂无新闻内容</div>';
            }
        }
    }

    // 设置移动端 UI
    // 设置移动端 UI
    setupMobileUI() {
        const sidebar = document.querySelector('.news-sidebar');
        if (!sidebar || window.innerWidth > 768) return;

        // 1. 添加关闭按钮 (如果尚未添加)
        if (!sidebar.querySelector('.mobile-sidebar-close')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-sidebar-close';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.addEventListener('click', () => this.toggleSidebar());
            // 直接添加到 sidebar 容器，确保位于最上层且不随列表刷新消失
            sidebar.appendChild(closeBtn);
        }

        // 2. 添加手势监听 (如果尚未添加)
        if (!sidebar.dataset.swipeInitialized) {
            this.setupMobileGestures(sidebar);
            sidebar.dataset.swipeInitialized = 'true';
        }
    }

    // 设置移动端手势
    setupMobileGestures(sidebar) {
        let startX = 0;
        let startY = 0;

        sidebar.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        sidebar.addEventListener('touchend', (e) => {
            if (!startX) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = endX - startX;
            const diffY = endY - startY;

            // 逻辑: 右滑 (diffX > 50) 且 水平移动明显大于垂直移动 (防止误触发上下滚动)
            if (diffX > 50 && Math.abs(diffX) > Math.abs(diffY)) {
                // 只有当侧边栏打开时才触发关闭 (防止误触)
                if (!sidebar.classList.contains('collapsed')) {
                    this.toggleSidebar();
                }
            }

            startX = 0;
            startY = 0;
        });
    }

    // 切换侧边栏显示/隐藏
    toggleSidebar() {
        const sidebar = document.querySelector('.news-sidebar');
        if (sidebar) {
            const isCollapsed = sidebar.classList.toggle('collapsed');

            // 如果侧边栏打开，添加点击外部关闭的监听
            if (!isCollapsed) {
                this.addClickOutsideListener();
            } else {
                this.removeClickOutsideListener();
            }
        }
    }

    // 添加点击外部关闭的监听器
    addClickOutsideListener() {
        // 延迟添加监听器，避免立即触发点击事件
        setTimeout(() => {
            document.addEventListener('click', this.handleClickOutside);
        }, 100);
    }

    // 移除点击外部关闭的监听器
    removeClickOutsideListener() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    // 处理点击外部事件
    handleClickOutside = (event) => {
        const sidebar = document.querySelector('.news-sidebar');
        const toggleBtn = document.getElementById('toggle-sidebar');

        // 如果点击的不是侧边栏内部，也不是切换按钮，则关闭侧边栏
        if (sidebar && !sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
            sidebar.classList.add('collapsed');
            this.removeClickOutsideListener();

            // 更新切换按钮图标
            const icon = toggleBtn.querySelector('.sidebar-icon');
            if (icon) {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        }
    }
}
