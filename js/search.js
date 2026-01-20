// 搜索功能模块
class SearchManager {
    constructor() {
        this.searchEngine = document.getElementById("search-engine");
        this.searchInput = document.getElementById("search-input");
        this.searchButton = document.querySelector(".search-wrapper button");
    }

    // 执行搜索
    performSearch() {
        if (this.searchEngine && this.searchInput && this.searchInput.value) {
            window.open(
                this.searchEngine.value + encodeURIComponent(this.searchInput.value),
                "_blank"
            );
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

