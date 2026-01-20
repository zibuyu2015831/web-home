// 主应用入口
document.addEventListener("DOMContentLoaded", function () {
    // 初始化主题管理器（独立于其他模块）
    const themeManager = new ThemeManager();

    // 初始化各个模块
    const newsCarousel = new NewsCarousel("carouselContent");
    const linksManager = new LinksManager();
    const searchManager = new SearchManager();

    // 初始化所有模块
    newsCarousel.init();
    linksManager.init();
    searchManager.init();

    // 侧边栏切换按钮事件
    const toggleBtn = document.getElementById('toggle-sidebar');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            newsCarousel.toggleSidebar();
        });
    }

    // 监听主题变化事件，更新粒子效果
    window.addEventListener('themeChanged', (event) => {
        // 延迟重新初始化粒子，确保主题已完全应用
        setTimeout(() => {
            if (typeof particlesJS !== 'undefined') {
                // 清理现有粒子
                const particlesContainer = document.getElementById('particles-js');
                if (particlesContainer) {
                    particlesContainer.innerHTML = '';
                }
                // 重新初始化
                initParticles();
            }
        }, 300);
    });
});

// 页面加载完成后初始化粒子效果
window.onload = function () {
    initParticles();
};

// 全局点击事件监听，确保点击页面任何位置都能触发粒子效果
document.addEventListener('click', function(event) {
    // 如果点击的是可交互元素（搜索框、按钮、卡片等），跳过触发
    const target = event.target;
    const isInteractiveElement = target.closest('.search-wrapper') ||
                                  target.closest('.link-card') ||
                                  target.closest('.category-tag') ||
                                  target.closest('.sidebar-toggle') ||
                                  target.closest('button') ||
                                  target.closest('input') ||
                                  target.closest('select') ||
                                  target.closest('a');

    if (!isInteractiveElement) {
        // 尝试触发粒子效果
        const particlesCanvas = document.querySelector('#particles-js canvas');
        if (particlesCanvas && typeof particlesJS !== 'undefined') {
            // 创建一个鼠标事件传递给粒子画布
            const rect = particlesCanvas.getBoundingClientRect();
            const clientX = event.clientX - rect.left;
            const clientY = event.clientY - rect.top;

            // particles.js 会自动监听画布点击，这里只需要确保事件能到达画布
            // 如果直接点击的是画布，它会自动处理
            if (event.target !== particlesCanvas) {
                // 创建一个点击事件转发给画布
                const canvasEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    clientX: event.clientX,
                    clientY: event.clientY
                });
                particlesCanvas.dispatchEvent(canvasEvent);
            }
        }
    }
});

