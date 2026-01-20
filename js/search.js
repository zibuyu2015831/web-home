// 搜索功能模块
class SearchManager {
    constructor() {
        this.searchEngine = document.getElementById("search-engine");
        this.searchInput = document.getElementById("search-input");
        this.searchButton = document.querySelector(".search-wrapper button");
    }

    /**
     * 执行搜索
     * 添加输入验证和用户友好提示
     */
    performSearch() {
        if (!this.searchEngine || !this.searchInput) {
            console.error('搜索组件未正确初始化');
            return;
        }

        const query = this.searchInput.value.trim();

        // 验证输入
        if (!query) {
            this.showSearchHint('请输入搜索关键词');
            this.searchInput.focus();
            return;
        }

        // 执行搜索
        window.open(
            this.searchEngine.value + encodeURIComponent(query),
            "_blank"
        );
    }

    /**
     * 显示搜索提示
     * @param {string} message - 提示信息
     */
    showSearchHint(message) {
        // 创建临时提示元素
        const hint = document.createElement('div');
        hint.className = 'search-hint';
        hint.textContent = message;
        hint.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 5px;
            padding: 8px 12px;
            background: var(--color-accent);
            color: white;
            border-radius: 4px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

        const wrapper = document.getElementById('search-wrapper');
        if (wrapper) {
            wrapper.style.position = 'relative';
            wrapper.appendChild(hint);

            // 2秒后自动移除
            setTimeout(() => {
                hint.style.opacity = '0';
                hint.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    if (wrapper.contains(hint)) {
                        wrapper.removeChild(hint);
                    }
                }, 300);
            }, 2000);
        }
    }

    // 切换搜索引擎（通过滚轮）
    switchEngine(delta) {
        if (!this.searchEngine) return;

        const options = Array.from(this.searchEngine.options);
        const currentIndex = this.searchEngine.selectedIndex;
        let newIndex = currentIndex;

        // 向下滚动（delta > 0）选择下一个，向上滚动（delta < 0）选择上一个
        if (delta > 0) {
            newIndex = (currentIndex + 1) % options.length;
        } else {
            newIndex = (currentIndex - 1 + options.length) % options.length;
        }

        this.searchEngine.selectedIndex = newIndex;
    }

    // 初始化
    init() {
        // 搜索按钮点击事件
        if (this.searchButton) {
            this.searchButton.addEventListener("click", () => this.performSearch());
        }

        // 键盘回车事件
        if (this.searchInput) {
            this.searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    this.performSearch();
                }
            });
        }

        // 鼠标滚轮切换搜索引擎
        const wheelHandler = (e) => {
            // 只有当鼠标在搜索框或选择框上时才切换
            if (this.searchInput && this.searchEngine &&
                (e.target === this.searchInput || e.target === this.searchEngine)) {
                // 阻止默认滚动行为
                e.preventDefault();
                e.stopPropagation();

                // 根据滚轮方向切换搜索引擎
                this.switchEngine(e.deltaY);
            }
        };

        // 为搜索框和选择框添加滚轮事件
        if (this.searchInput) {
            this.searchInput.addEventListener("wheel", wheelHandler, { passive: false });
        }
        if (this.searchEngine) {
            this.searchEngine.addEventListener("wheel", wheelHandler, { passive: false });
        }
    }
}

