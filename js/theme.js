// 主题管理模块
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        // 1. 加载保存的主题或检测系统偏好
        this.loadTheme();

        // 2. 为主题标题添加点击事件
        this.bindTitleClick();

        // 3. 监听系统主题变化
        this.watchSystemTheme();
    }

    // 加载主题
    loadTheme() {
        // 优先从localStorage读取
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // 检测系统偏好
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    // 设置主题
    setTheme(theme) {
        if (theme !== 'light' && theme !== 'dark') return;

        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme }
        }));

        console.log(`主题已切换到: ${theme === 'light' ? '浅色' : '深色'}`);
    }

    // 切换主题
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);

        // 添加点击反馈动画
        if (typeof particlesJS !== 'undefined') {
            // 触发一次粒子炸开效果作为切换反馈
            const event = new MouseEvent('click', {
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight / 2
            });
            const canvas = document.querySelector('#particles-js canvas');
            if (canvas) {
                canvas.dispatchEvent(event);
            }
        }
    }

    // 绑定标题点击事件（单击切换主题，双击切换排序模式）
    bindTitleClick() {
        const headerTitle = document.querySelector('.header h1');
        if (!headerTitle) {
            console.warn('未找到标题元素，无法绑定主题切换功能');
            return;
        }

        let lastClickTime = 0;
        let clickTimer = null;

        // 添加点击事件
        headerTitle.style.cursor = 'pointer';
        headerTitle.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastClickTime;

            // 如果点击间隔小于300ms，认为是双击
            if (timeDiff < 300 && timeDiff > 0) {
                // 双击 - 切换排序模式
                e.preventDefault();
                e.stopPropagation();

                if (clickTimer) {
                    clearTimeout(clickTimer);
                    clickTimer = null;
                }

                // 调用 LinksManager 的 toggleSortMode
                if (window.linksManager) {
                    window.linksManager.toggleSortMode();
                }
            } else {
                // 单击 - 切换主题（原有功能）
                if (clickTimer) {
                    clearTimeout(clickTimer);
                }

                clickTimer = setTimeout(() => {
                    this.toggleTheme();
                    clickTimer = null;
                }, 300);
            }

            lastClickTime = currentTime;
        });

        // 添加title提示
        headerTitle.title = '单击切换主题，双击进入/退出排序模式';
    }

    // 监听系统主题变化
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // 现代浏览器API
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', (e) => {
                // 如果用户没有手动设置过主题，则跟随系统
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        // 旧版浏览器兼容
        else if (mediaQuery.addListener) {
            mediaQuery.addListener((e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    // 获取当前主题
    getCurrentTheme() {
        return this.currentTheme;
    }

    // 重置为系统主题
    resetToSystemTheme() {
        localStorage.removeItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
    }
}

// 获取当前主题（全局函数，供其他模块使用）
window.getCurrentTheme = function() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme || 'light';
};

// 主题切换动画
function addThemeTransition() {
    const body = document.body;

    // 添加过渡类
    body.classList.add('theme-transition');

    // 动画结束后移除类
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 500);
}

// 监听主题变化事件（粒子效果可以根据主题更新）
window.addEventListener('themeChanged', (event) => {
    const { theme } = event.detail;
    addThemeTransition();

    // 重新加载粒子效果
    if (typeof reloadParticles === 'function') {
        reloadParticles();
    }

    console.log('主题已更改为:', theme);
});

// 导出（如果需要模块系统）
// export default ThemeManager;
