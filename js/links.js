// 链接管理模块

// ============ 安全辅助函数 ============

/**
 * HTML 转义函数 - 防止 XSS 攻击
 * @param {string} text - 需要转义的文本
 * @returns {string} 转义后的安全文本
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * URL 验证函数 - 验证 URL 协议安全性
 * @param {string} url - 需要验证的 URL
 * @param {Array<string>} allowedProtocols - 允许的协议列表
 * @returns {Object} {valid: boolean, url?: string, error?: string}
 */
function validateUrl(url, allowedProtocols = ['http:', 'https:', 'file:']) {
    if (!url || typeof url !== 'string') {
        return { valid: false, error: 'URL 不能为空' };
    }

    try {
        const parsed = new URL(url.trim());

        // 检查协议白名单
        if (!allowedProtocols.includes(parsed.protocol)) {
            return {
                valid: false,
                error: `不允许的协议: ${parsed.protocol}。仅支持 ${allowedProtocols.join(', ')}`
            };
        }

        // 检查主机名 (file: 协议除外)
        if (parsed.protocol !== 'file:' && !parsed.hostname) {
            return { valid: false, error: 'URL 缺少主机名' };
        }

        return { valid: true, url: parsed.href };
    } catch (error) {
        return { valid: false, error: 'URL 格式无效' };
    }
}

/**
 * 图标 URL 验证函数
 * @param {string} url - 图标 URL
 * @returns {Object} {valid: boolean, url?: string, error?: string}
 */
function validateIconUrl(url) {
    if (!url) return { valid: true, url: '' };  // 允许为空

    // 允许相对路径
    if (url.startsWith('./') || url.startsWith('../')) {
        return { valid: true, url };
    }

    // 允许 data: URL (Base64 图片)
    if (url.startsWith('data:image/')) {
        return { valid: true, url };
    }

    // 其他情况必须是 http(s) 或 file:
    return validateUrl(url, ['http:', 'https:', 'file:']);
}

// ============ Modal 类 (通用模态框管理) ============
class Modal {
    constructor(title, contentHtml, onConfirm = null) {
        this.title = title;
        this.contentHtml = contentHtml;
        this.onConfirm = onConfirm;
        this.element = this.createDom();
        this.append();
        this.bindEvents();
    }

    createDom() {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${this.title}</h2>
          <button class="close-btn">&times;</button>
        </div>
        ${this.contentHtml}
      </div>
    `;
        return modal;
    }

    append() {
        document.body.appendChild(this.element);
        // 确保动画效果
        requestAnimationFrame(() => {
            this.element.classList.add('show');
        });
    }

    bindEvents() {
        // 关闭按钮
        this.element.querySelector('.close-btn').addEventListener('click', () => this.close());

        // 取消按钮 (如果有)
        const cancelBtn = this.element.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.close());
        }

        // 点击背景关闭
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.close();
            }
        });

        // 表单提交
        const form = this.element.querySelector('form');
        if (form && this.onConfirm) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.onConfirm(e, this);
            });
        }
    }

    close() {
        this.element.classList.remove('show');
        setTimeout(() => {
            if (this.element.parentNode) {
                document.body.removeChild(this.element);
            }
        }, 300); // 等待过渡动画结束
    }
}


// ============ LinksManager 类 ============

class LinksManager {
    constructor() {
        this.websites = {};
        this.currentCategory = "常用";
        this.categories = [];  // 分类列表
        this.linksContainer = document.getElementById("links-container");
        this.categoryList = document.getElementById("category-list");
        this.sortMode = false;  // 排序模式状态
    }

    // 加载网站数据
    async loadWebsites() {
        try {
            // 直接使用 JavaScript 模块中的数据 (使用高性能深拷贝)
            this.websites = (typeof structuredClone !== 'undefined')
                ? structuredClone(websitesData)  // 现代浏览器使用 structuredClone
                : JSON.parse(JSON.stringify(websitesData));  // 降级方案

            // 初始化分类列表
            this.categories = Object.keys(this.websites);

            // 从 localStorage 加载用户自定义的网站
            const customWebsites = this.loadCustomWebsites();
            this.mergeCustomWebsites(customWebsites);

            // 过滤掉已删除的默认网站
            this.filterDeletedDefaultWebsites();

            // 加载排序信息（网站和分类）
            this.loadOrder();
            this.loadCategoryOrder();

            return true;
        } catch (error) {
            console.error("加载网站数据失败:", error);
            return false;
        }
    }

    // 从 localStorage 加载自定义网站
    loadCustomWebsites() {
        const stored = localStorage.getItem('customWebsites');
        return stored ? JSON.parse(stored) : {};
    }

    // 保存自定义网站到 localStorage (带错误处理)
    saveCustomWebsites() {
        try {
            const customWebsites = {};

            // 提取所有自定义添加的网站(带有 custom 标记的)
            for (const category in this.websites) {
                customWebsites[category] = this.websites[category].filter(site => site.custom);
            }

            const data = JSON.stringify(customWebsites);

            // 检查数据大小 (localStorage 通常限制 5MB)
            const sizeInMB = new Blob([data]).size / (1024 * 1024);
            if (sizeInMB > 4.5) {  // 留出安全边界
                throw new Error(`数据过大 (${sizeInMB.toFixed(2)}MB),超过存储限制`);
            }

            // 尝试保存
            localStorage.setItem('customWebsites', data);

            // 验证保存成功
            const saved = localStorage.getItem('customWebsites');
            if (!saved || saved !== data) {
                throw new Error('数据保存验证失败');
            }

            return true;
        } catch (error) {
            console.error('保存自定义网站失败:', error);

            // 用户友好的错误提示
            let message = '保存失败';
            if (error.name === 'QuotaExceededError') {
                message = '存储空间已满,请删除部分自定义网站后重试';
            } else if (error.message.includes('数据过大')) {
                message = error.message;
            } else {
                message = `保存失败: ${error.message}`;
            }

            this.showToast(message, 5000);
            return false;
        }
    }

    // 合并自定义网站到主数据
    mergeCustomWebsites(customWebsites) {
        for (const category in customWebsites) {
            if (!this.websites[category]) {
                this.websites[category] = [];
            }
            this.websites[category].push(...customWebsites[category]);
        }
    }

    // 保存被删除的默认网站到 localStorage
    saveDeletedDefaultWebsite(category, site) {
        const deletedWebsites = this.loadDeletedDefaultWebsites();

        if (!deletedWebsites[category]) {
            deletedWebsites[category] = [];
        }

        // 添加到删除列表（避免重复）
        const exists = deletedWebsites[category].some(s => s.url === site.url);
        if (!exists) {
            deletedWebsites[category].push({
                name: site.name,
                url: site.url,
                deletedAt: new Date().toISOString()
            });
        }

        localStorage.setItem('deletedDefaultWebsites', JSON.stringify(deletedWebsites));
    }

    // 从 localStorage 加载被删除的默认网站列表
    loadDeletedDefaultWebsites() {
        const stored = localStorage.getItem('deletedDefaultWebsites');
        return stored ? JSON.parse(stored) : {};
    }

    // 过滤掉已删除的默认网站
    filterDeletedDefaultWebsites() {
        const deletedWebsites = this.loadDeletedDefaultWebsites();

        for (const category in deletedWebsites) {
            if (this.websites[category]) {
                // 过滤掉已删除的默认网站
                this.websites[category] = this.websites[category].filter(site => {
                    // 如果是自定义网站，不过滤
                    if (site.custom) return true;

                    // 如果是默认网站，检查是否在删除列表中
                    return !deletedWebsites[category].some(deleted => deleted.url === site.url);
                });
            }
        }
    }

    // 加载排序信息
    loadOrder() {
        const orderData = localStorage.getItem('websitesOrder');
        if (orderData) {
            const orders = JSON.parse(orderData);
            for (const category in orders) {
                if (this.websites[category]) {
                    const orderedSites = [];
                    orders[category].forEach(url => {
                        const site = this.websites[category].find(s => s.url === url);
                        if (site) orderedSites.push(site);
                    });
                    // 添加新增的网站(不在排序列表中的)
                    this.websites[category].forEach(site => {
                        if (!orderedSites.find(s => s.url === site.url)) {
                            orderedSites.push(site);
                        }
                    });
                    this.websites[category] = orderedSites;
                }
            }
        }
    }

    // 保存排序信息
    saveOrder() {
        const orders = {};
        for (const category in this.websites) {
            orders[category] = this.websites[category].map(site => site.url);
        }
        localStorage.setItem('websitesOrder', JSON.stringify(orders));
    }

    // 渲染链接
    renderLinks(category) {
        if (!this.linksContainer) {
            console.error("Links container not found");
            return;
        }

        this.linksContainer.innerHTML = "";
        this.currentCategory = category;

        if (!this.websites[category]) {
            console.error("Category not found:", category);
            return;
        }

        this.websites[category].forEach((site, index) => {
            const linkCard = this.createLinkCard(site, index);
            // 根据当前排序模式设置draggable属性
            linkCard.setAttribute('draggable', this.sortMode ? 'true' : 'false');
            this.linksContainer.appendChild(linkCard);
        });

        // 添加"添加新网站"卡片 - 仅在排序模式下显示
        if (this.sortMode) {
            const addCard = this.createAddCard();
            this.linksContainer.appendChild(addCard);
        }
    }

    // 创建链接卡片
    createLinkCard(site, index) {
        const linkCard = document.createElement("div");
        linkCard.className = "link-card";
        linkCard.setAttribute('draggable', 'false');  // 初始不允许拖拽
        linkCard.dataset.index = index;

        // 绑定拖拽事件（初始不启用）
        this.bindDragEvents(linkCard, index);

        // 为所有网站添加编辑和删除按钮
        if (site.custom) {
            linkCard.classList.add('custom-site');
        }
        const actions = document.createElement("div");
        actions.className = "card-actions";
        actions.innerHTML = `
        <button class="edit-btn" title="编辑"><i class="fas fa-edit"></i></button>
        <button class="delete-btn" title="删除"><i class="fas fa-trash"></i></button>
      `;
        linkCard.appendChild(actions);

        // 绑定编辑和删除事件
        actions.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.editWebsite(this.currentCategory, index);
        });

        actions.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteWebsite(this.currentCategory, index);
        });

        linkCard.addEventListener("click", (e) => {
            // 排序模式下点击编辑，而不是跳转
            if (this.sortMode) {
                // 如果点击的是编辑/删除按钮，不执行卡片点击
                if (e.target.closest('.card-actions')) {
                    return;
                }
                // 弹出编辑对话框
                this.editWebsite(this.currentCategory, index);
                return;
            }
            // 非排序模式下跳转到网站
            window.open(site.url, "_blank");
        });

        const icon = document.createElement("img");
        icon.src = site.icon;
        icon.alt = site.name;
        icon.onerror = function () {
            this.src = "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line></svg>";
        };

        const link = document.createElement("a");
        link.href = site.url;
        link.target = "_blank";
        link.textContent = site.name;
        link.addEventListener('click', (e) => e.stopPropagation());

        const subtitle = document.createElement("div");
        subtitle.className = "site-subtitle";
        subtitle.textContent = site.subtitle;

        linkCard.appendChild(icon);
        linkCard.appendChild(link);
        linkCard.appendChild(subtitle);

        return linkCard;
    }

    // 绑定拖拽事件（添加排序模式判断）
    bindDragEvents(linkCard, index) {
        linkCard.addEventListener('dragstart', (e) => {
            if (!this.sortMode) return;  // 只有排序模式才允许拖拽

            linkCard.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', index);
        });

        linkCard.addEventListener('dragend', (e) => {
            linkCard.classList.remove('dragging');
            document.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
            });
        });

        linkCard.addEventListener('dragover', (e) => {
            if (!this.sortMode) return;  // 只有排序模式才允许拖拽

            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            const draggingCard = document.querySelector('.dragging');
            if (draggingCard && draggingCard !== linkCard) {
                linkCard.classList.add('drag-over');
            }
        });

        linkCard.addEventListener('dragleave', (e) => {
            linkCard.classList.remove('drag-over');
        });

        linkCard.addEventListener('drop', (e) => {
            if (!this.sortMode) return;  // 只有排序模式才允许拖拽

            e.preventDefault();
            linkCard.classList.remove('drag-over');

            const draggingCard = document.querySelector('.dragging');
            if (draggingCard && draggingCard !== linkCard) {
                const fromIndex = parseInt(draggingCard.dataset.index);
                const toIndex = parseInt(linkCard.dataset.index);

                this.reorderWebsites(this.currentCategory, fromIndex, toIndex);
            }
        });
    }

    // 切换排序模式
    toggleSortMode() {
        this.sortMode = !this.sortMode;

        const cards = document.querySelectorAll('.link-card');
        const title = document.querySelector('header h1');  // 标题元素

        if (this.sortMode) {
            // 进入排序模式
            cards.forEach(card => {
                card.setAttribute('draggable', 'true');
            });
            document.body.classList.add('sort-mode');

            // 修改标题文本
            if (title) {
                title.dataset.originalText = title.textContent;
                title.textContent = '思维兵工厂 ✏️ 排序中...';
            }

            // 重新渲染分类以启用拖拽
            this.renderCategories();

            // 重新渲染链接以显示添加卡片
            this.renderLinks(this.currentCategory);

            // 显示排序模式提示
            this.showToast('已进入排序模式，拖拽卡片可调整位置，再次双击标题退出');

            // 第一次进入时标记（用于未来可能的引导功能）
            if (!localStorage.getItem('sortModeHintShown')) {
                localStorage.setItem('sortModeHintShown', 'true');
            }
        } else {
            // 退出排序模式
            cards.forEach(card => {
                card.setAttribute('draggable', 'false');
                card.classList.remove('dragging');
            });
            document.body.classList.remove('sort-mode');

            // 恢复标题文本
            if (title) {
                title.textContent = title.dataset.originalText || '思维兵工厂';
            }

            // 重新渲染分类以禁用拖拽
            this.renderCategories();

            // 重新渲染链接以隐藏添加卡片
            this.renderLinks(this.currentCategory);

            // 显示退出排序模式提示
            this.showToast('已退出排序模式');
        }
    }

    // 显示提示信息
    showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    // 重新排序网站
    reorderWebsites(category, fromIndex, toIndex) {
        const sites = this.websites[category];
        const [movedSite] = sites.splice(fromIndex, 1);
        sites.splice(toIndex, 0, movedSite);

        // 保存排序
        this.saveOrder();

        // 重新渲染
        this.renderLinks(category);
    }

    // 加载分类排序信息
    loadCategoryOrder() {
        const orderData = localStorage.getItem('categoriesOrder');
        if (orderData) {
            const savedOrder = JSON.parse(orderData);
            if (Array.isArray(savedOrder) && savedOrder.length > 0) {
                // 检查保存的顺序是否匹配当前分类
                const currentCategories = Object.keys(this.websites);
                const isValidOrder = savedOrder.every(cat => currentCategories.includes(cat));

                if (isValidOrder) {
                    // 重新排序分类
                    this.reorderCategories(savedOrder);
                }
            }
        }
    }

    // 保存分类排序信息
    saveCategoryOrder() {
        const orders = this.categories;
        localStorage.setItem('categoriesOrder', JSON.stringify(orders));
    }

    // 重新排序分类
    reorderCategories(newOrder) {
        // 检查新顺序是否有效
        if (!Array.isArray(newOrder) || newOrder.length !== this.categories.length) {
            console.warn('无效的分类顺序');
            return;
        }

        this.categories = newOrder;

        // 保存新顺序
        this.saveCategoryOrder();

        // 重新渲染分类
        this.renderCategories();
    }

    // 创建"添加新网站"卡片
    createAddCard() {
        const addCard = document.createElement("div");
        addCard.className = "link-card add-card add-card-static";
        addCard.draggable = false;  // 禁止拖拽
        addCard.innerHTML = `
      <i class="fas fa-plus-circle"></i>
      <a href="javascript:void(0)">添加网站</a>
      <div class="site-subtitle">快速添加新网站</div>
    `;
        addCard.addEventListener("click", () => this.showAddDialog());
        return addCard;
    }

    // 显示添加/编辑对话框 (重构版 - 使用 Modal 类)
    showAddDialog(editData = null) {
        const isEdit = editData !== null;

        // 转义所有用户输入,防止 XSS 攻击
        const safeName = escapeHtml(editData?.name || '');
        const safeUrl = escapeHtml(editData?.url || '');
        const safeSubtitle = escapeHtml(editData?.subtitle || '');
        const safeIcon = escapeHtml(editData?.icon || '');

        const formHtml = `
            <form id="add-website-form">
                <div class="form-group">
                    <label for="site-name">网站名称 *</label>
                    <input type="text" id="site-name" required value="${safeName}">
                </div>
                <div class="form-group">
                    <label for="site-url">网站URL *</label>
                    <input type="url" id="site-url" required value="${safeUrl}">
                </div>
                <div class="form-group">
                    <label for="site-subtitle">副标题</label>
                    <input type="text" id="site-subtitle" value="${safeSubtitle}">
                </div>
                <div class="form-group">
                    <label for="site-icon">图标URL</label>
                    <input type="text" id="site-icon" placeholder="留空将自动获取favicon" value="${safeIcon}">
                </div>
                <div class="form-group">
                    <label for="site-category">分类 *</label>
                    <select id="site-category" required>
                    ${Object.keys(this.websites).map(cat =>
            `<option value="${escapeHtml(cat)}" ${editData?.category === cat ? 'selected' : ''}>${escapeHtml(cat)}</option>`
        ).join('')}
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel">取消</button>
                    <button type="submit" class="btn-submit">${isEdit ? '保存' : '添加'}</button>
                </div>
            </form>
        `;

        new Modal(
            isEdit ? '编辑网站' : '添加新网站',
            formHtml,
            (e, modal) => {
                const name = document.getElementById('site-name').value.trim();
                const url = document.getElementById('site-url').value.trim();
                const subtitle = document.getElementById('site-subtitle').value.trim();
                const icon = document.getElementById('site-icon').value.trim();
                const category = document.getElementById('site-category').value;

                // 验证 URL
                const urlValidation = validateUrl(url);
                if (!urlValidation.valid) {
                    alert(`URL 验证失败: ${urlValidation.error}`);
                    return;
                }

                // 验证图标 URL
                const iconValidation = validateIconUrl(icon);
                if (!iconValidation.valid) {
                    alert(`图标 URL 验证失败: ${iconValidation.error}`);
                    return;
                }

                const formData = {
                    name: name,
                    url: urlValidation.url,
                    subtitle: subtitle,
                    icon: iconValidation.url || this.getFaviconUrl(urlValidation.url),
                    category: category,
                    custom: true
                };

                if (isEdit) {
                    this.updateWebsite(editData.category, editData.index, formData);
                } else {
                    this.addWebsite(formData);
                }

                modal.close();
            }
        );
    }

    // 获取网站的 favicon URL
    getFaviconUrl(url) {
        try {
            const urlObj = new URL(url);
            return `${urlObj.origin}/favicon.ico`;
        } catch {
            return './icon/default.ico';
        }
    }

    // 添加网站
    addWebsite(siteData) {
        const category = siteData.category;

        if (!this.websites[category]) {
            this.websites[category] = [];
        }

        this.websites[category].push(siteData);
        this.saveCustomWebsites();
        this.saveOrder();
        this.renderLinks(category);
    }

    // 编辑网站
    editWebsite(category, index) {
        const site = this.websites[category][index];
        this.showAddDialog({
            ...site,
            category,
            index
        });
    }

    // 更新网站
    updateWebsite(oldCategory, index, newData) {
        // 从旧分类中删除
        this.websites[oldCategory].splice(index, 1);

        // 添加到新分类
        const newCategory = newData.category;
        if (!this.websites[newCategory]) {
            this.websites[newCategory] = [];
        }
        this.websites[newCategory].push(newData);

        this.saveCustomWebsites();
        this.saveOrder();
        this.renderLinks(newCategory);
    }

    // 删除网站
    deleteWebsite(category, index) {
        if (confirm('确定要删除这个网站吗?')) {
            const site = this.websites[category][index];

            // 如果是默认网站（非自定义），记录到删除列表
            if (!site.custom) {
                this.saveDeletedDefaultWebsite(category, site);
            }

            // 从当前数据中删除
            this.websites[category].splice(index, 1);

            // 保存数据
            this.saveCustomWebsites();
            this.saveOrder();
            this.renderLinks(category);
        }
    }

    // 显示添加分类对话框
    showAddCategoryDialog() {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>添加新分类</h2>
          <button class="close-btn">&times;</button>
        </div>
        <form id="add-category-form">
          <div class="form-group">
            <label for="category-name">分类名称 *</label>
            <input type="text" id="category-name" required placeholder="请输入分类名称">
          </div>
          <div class="form-actions">
            <button type="button" class="btn-cancel">取消</button>
            <button type="submit" class="btn-submit">添加</button>
          </div>
        </form>
      </div>
    `;

        document.body.appendChild(modal);

        // 关闭按钮事件
        modal.querySelector('.close-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.btn-cancel').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // 表单提交事件
        modal.querySelector('#add-category-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const categoryName = document.getElementById('category-name').value.trim();

            // 验证分类名
            if (!categoryName) {
                alert('分类名称不能为空');
                return;
            }

            if (this.websites[categoryName]) {
                alert('该分类已存在，请使用其他名称');
                return;
            }

            this.addCategory(categoryName);
            document.body.removeChild(modal);
        });
    }

    // 添加新分类
    addCategory(categoryName) {
        // 添加到 websites 对象
        this.websites[categoryName] = [];

        // 添加到 categories 数组
        this.categories.push(categoryName);

        // 保存到 localStorage
        const customCategories = JSON.parse(localStorage.getItem('customCategories') || '{}');
        customCategories[categoryName] = true;
        localStorage.setItem('customCategories', JSON.stringify(customCategories));

        // 保存分类顺序
        this.saveCategoryOrder();

        // 显示成功提示
        this.showToast(`分类 "${categoryName}" 添加成功`);

        // 重新渲染分类
        this.renderCategories();
    }

    // 显示重命名分类对话框 (重构版 - 使用 Modal 类)
    showRenameCategoryDialog(oldName) {
        const formHtml = `
            <form id="rename-category-form">
                <div class="form-group">
                    <label for="category-new-name">新分类名称 *</label>
                    <input type="text" id="category-new-name" required value="${oldName}" placeholder="请输入新分类名称">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel">取消</button>
                    <button type="submit" class="btn-submit">保存</button>
                </div>
            </form>
        `;

        new Modal(
            '重命名分类',
            formHtml,
            (e, modal) => {
                const newName = document.getElementById('category-new-name').value.trim();

                // 验证新名称
                if (!newName) {
                    alert('分类名称不能为空');
                    return;
                }

                if (newName === oldName) {
                    alert('新名称与原名称相同');
                    return;
                }

                if (this.websites[newName]) {
                    alert('该分类已存在，请使用其他名称');
                    return;
                }

                this.renameCategory(oldName, newName);
                modal.close();
            }
        );
    }

    // 重命名分类
    renameCategory(oldName, newName) {
        // 如果当前正在显示该分类，先更新当前分类
        if (this.currentCategory === oldName) {
            this.currentCategory = newName;
        }

        // 更新 websites 对象的键名
        this.websites[newName] = this.websites[oldName];
        delete this.websites[oldName];

        // 更新 categories 数组
        const index = this.categories.indexOf(oldName);
        if (index !== -1) {
            this.categories[index] = newName;
        }

        // 更新 localStorage
        const customCategories = JSON.parse(localStorage.getItem('customCategories') || '{}');
        if (customCategories[oldName]) {
            customCategories[newName] = true;
            delete customCategories[oldName];
            localStorage.setItem('customCategories', JSON.stringify(customCategories));
        }

        // 保存网站排序（因为分类名变了）
        this.saveOrder();

        // 保存分类顺序
        this.saveCategoryOrder();

        // 显示成功提示
        this.showToast(`分类已重命名为 "${newName}"`);

        // 重新渲染
        this.renderCategories();
        this.renderLinks(this.currentCategory);
    }

    // 渲染分类标签
    renderCategories() {
        if (!this.categoryList) return;

        // 清空当前分类列表
        this.categoryList.innerHTML = '';

        // 获取图标映射
        const categoryIcons = {
            '常用': 'fa-star',
            '工作': 'fa-blog',
            'AI': 'fa-robot',
            'AI官网': 'fa-robot',
            '云服务': 'fa-cloud',
            '工具汇集': 'fa-tools',
            '墙外世界': 'fa-person-walking',
            '阅读': 'fa-book'
        };

        // 渲染分类标签
        this.categories.forEach((category, index) => {
            const tag = document.createElement('div');
            tag.className = 'category-tag';
            tag.draggable = this.sortMode;  // 根据排序模式设置draggable
            tag.dataset.category = category;
            tag.dataset.index = index;

            // 添加图标
            const iconClass = categoryIcons[category] || 'fa-folder';
            tag.innerHTML = `<i class="fas ${iconClass}"></i> ${category}`;

            // 设置初始active状态
            if (category === this.currentCategory) {
                tag.classList.add('active');
            }

            // 绑定拖拽事件（仅在排序模式下启用）
            this.bindCategoryDragEvents(tag, index);

            // 绑定重命名事件（仅在排序模式下启用）
            if (this.sortMode) {
                tag.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showRenameCategoryDialog(category);
                });
                // 添加重命名提示
                tag.title = '点击重命名，拖拽可调整顺序';
            }

            this.categoryList.appendChild(tag);
        });

        // 在排序模式下显示"添加分类"按钮
        if (this.sortMode) {
            const addCategoryBtn = document.createElement('div');
            addCategoryBtn.className = 'category-tag add-category-btn';
            addCategoryBtn.innerHTML = '<i class="fas fa-plus"></i> 添加分类';
            addCategoryBtn.title = '添加新分类';
            addCategoryBtn.addEventListener('click', () => {
                this.showAddCategoryDialog();
            });
            this.categoryList.appendChild(addCategoryBtn);
        }

        // 调试：输出分类标签信息
        if (this.sortMode) {
            console.log('分类已渲染为可拖拽模式:', this.categories.length, '个分类');
        }
    }

    // 绑定分类标签拖拽事件
    bindCategoryDragEvents(tagElement, index) {
        tagElement.addEventListener('dragstart', (e) => {
            if (!this.sortMode) {
                console.log('非排序模式，阻止拖拽');
                e.preventDefault();
                return;
            }

            const categoryName = tagElement.dataset.category;
            console.log('拖拽开始:', categoryName);
            tagElement.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', index);
        });

        tagElement.addEventListener('dragend', (e) => {
            tagElement.classList.remove('dragging');
            document.querySelectorAll('.category-tag.drag-over').forEach(el => {
                el.classList.remove('drag-over');
            });
        });

        tagElement.addEventListener('dragover', (e) => {
            if (!this.sortMode) return;  // 只有排序模式才允许拖拽

            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            const draggingTag = document.querySelector('.category-tag.dragging');
            if (draggingTag && draggingTag !== tagElement) {
                tagElement.classList.add('drag-over');
            }
        });

        tagElement.addEventListener('dragleave', (e) => {
            tagElement.classList.remove('drag-over');
        });

        tagElement.addEventListener('drop', (e) => {
            if (!this.sortMode) return;  // 只有排序模式才允许拖拽

            e.preventDefault();
            tagElement.classList.remove('drag-over');

            const draggingTag = document.querySelector('.category-tag.dragging');
            if (draggingTag && draggingTag !== tagElement) {
                const fromIndex = parseInt(draggingTag.dataset.index);
                const toIndex = parseInt(tagElement.dataset.index);

                if (fromIndex !== toIndex) {
                    this.reorderCategoriesByIndex(fromIndex, toIndex);
                }
            }
        });
    }

    // 按索引重新排序分类
    reorderCategoriesByIndex(fromIndex, toIndex) {
        const categoryNames = [...this.categories];
        const [movedCategory] = categoryNames.splice(fromIndex, 1);
        categoryNames.splice(toIndex, 0, movedCategory);

        // 更新分类顺序并保存
        this.reorderCategories(categoryNames);
    }

    // 初始化分类切换事件（兼容原有逻辑）
    initCategorySwitch() {
        if (!this.categoryList) return;

        // 使用事件委托处理分类切换
        this.categoryList.addEventListener('click', (e) => {
            const categoryTag = e.target.closest('.category-tag');
            if (categoryTag) {
                // 排序模式下点击不切换分类
                if (this.sortMode) {
                    e.preventDefault();
                    return;
                }

                // 移除所有active类
                this.categoryList.querySelectorAll('.category-tag').forEach(tag =>
                    tag.classList.remove('active')
                );

                // 给点击的分类添加active类
                categoryTag.classList.add('active');

                // 更新当前分类
                this.currentCategory = categoryTag.dataset.category;

                // 渲染对应分类的链接
                this.renderLinks(categoryTag.dataset.category);
            }
        });
    }


    // 初始化
    async init() {
        const success = await this.loadWebsites();
        if (success) {
            // 渲染分类标签
            this.renderCategories();

            // 渲染链接
            this.renderLinks(this.currentCategory);

            // 初始化分类切换事件（兼容原有逻辑）
            this.initCategorySwitch();

            // 将实例挂载到 window，供 theme.js 调用
            window.linksManager = this;
        }
    }
}
