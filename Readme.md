# 思维兵工厂 🚀

> 一个纯静态的响应式网址导航页面，采用原生HTML/CSS/JavaScript开发，无需后端服务器即可运行。，支持自定义分类和拖拽排序

![alt text](assets\Readme\image.png)


## 🌟 核心特性

- ✅ **纯静态部署**：无需服务器，可部署到GitHub Pages、云存储等
- ✅ **双主题支持**：支持浅色/深色主题切换
- ✅ **拖拽排序**：支持网站和分类的拖拽排序
- ✅ **自定义管理**：支持添加、编辑、删除网站和分类
- ✅ **新闻聚合**：集成9个平台的热门新闻
- ✅ **多引擎搜索**：支持5种搜索引擎切换
- ✅ **数据持久化**：用户自定义数据保存在localStorage
- ✅ **粒子特效**：精美的背景粒子动画
- ✅ **移动端适配**：完美支持手机和平板设备

---

## 🚀 快速开始

由于是纯静态HTML页面，最简单的方式是直接在浏览器中打开：

```bash
# Windows
双击 index.html 文件

# Mac
右键 index.html -> 打开方式 -> 浏览器
```

---

## 📁 项目结构

```
web-home/
├── index.html              # 主入口文件
├── css/                   # 样式文件
│   ├── theme.css         # 主题样式（配色、布局）
│   ├── components.css    # 组件样式（卡片、模态框等）
│   └── all.min.css      # Font Awesome图标库
├── js/                    # JavaScript模块
│   ├── app.js            # 应用主入口，初始化所有模块
│   ├── links.js          # 链接管理模块（CRUD、拖拽）
│   ├── news.js           # 新闻模块（聚合、缓存）
│   ├── search.js         # 搜索模块（多引擎切换）
│   ├── theme.js          # 主题管理模块
│   └── config.js         # 粒子效果配置
├── data/                  # 数据文件
│   ├── websites.js       # 网站数据（主要修改位置⭐）
│   └── websites.json     # 数据备份
├── icon/                  # 网站图标（140+个）
├── fonts/                 # 字体文件
├── assets/                # 其他资源
└── README.md             # 本文档
```

---

## 🔧 自定义修改

### 1️⃣ 添加/修改网站链接

#### 方法A：直接编辑代码（推荐开发者）

**文件位置**: `data/websites.js`

```javascript
const websitesData = {
    "常用": [
        {
            "name": "ChatGPT",
            "subtitle": "OpenAI开发",
            "url": "https://chat.openai.com",
            "icon": "./icon/chatgpt.png"
        },
        {
            "name": "你的网站",
            "subtitle": "网站描述",
            "url": "https://your-website.com",
            "icon": "./icon/your-icon.png"
        }
    ]
};
```

**说明**:
- `name`: 网站名称（必填）
- `subtitle`: 网站描述（可选）
- `url`: 网站链接（必填，需包含协议http://或https://）
- `icon`: 图标路径（可选，默认会使用网站favicon）

#### 方法B：使用界面（推荐普通用户）

1. **进入排序模式**: 双击页面顶部标题"思维兵工厂"
2. **添加网站**: 点击底部的"添加网站"卡片
3. **填写信息**: 在弹出的模态框中填写网站信息
4. **保存**: 点击"添加"按钮
5. **退出排序模式**: 再次双击标题

**注意**: localStorage数据仅保存在当前浏览器，清除浏览器数据会丢失。建议定期备份数据。

---

### 2️⃣ 添加网站图标

将图标文件放入 `icon/` 目录，推荐使用 32x32 或 64x64 像素的PNG格式。

**获取图标方法**:
- 直接下载网站favicon: `https://example.com/favicon.ico`
- 使用在线工具: [Favicon.io](https://favicon.io/)
- 手动截图并裁剪为正方形

**命名规范**: 使用小写字母和连字符，如 `chatgpt.png`, `github-copilot.png`

---

### 3️⃣ 修改搜索引擎

**文件位置**: `index.html`

```html
<select id="search-engine">
    <option value="https://www.baidu.com/s?wd=">百度</option>
    <option value="https://www.sogou.com/web?query=">搜狗</option>
    <option value="https://cn.bing.com/search?q=">必应</option>
    <option value="https://metaso.cn/search/?q=">秘塔</option>
    <option value="https://www.google.com/search?q=">谷歌</option>
</select>
```

**说明**: `value`属性是搜索引擎的搜索URL，需要在查询参数后添加`=`号。

---

### 4️⃣ 修改主题配色

**文件位置**: `css/theme.css`

```css
:root {
    --bg-primary: #f0f4f8;           /* 背景色 */
    --bg-secondary: #ffffff;         /* 卡片背景 */
    --color-primary: #2c3e50;       /* 主文字颜色 */
    --color-accent: #3498db;         /* 强调色（蓝色） */
    --color-accent-deep: #067bc2;    /* 深强调色 */
}

[data-theme="dark"] {
    --bg-primary: #121212;
    --bg-secondary: #1e1e2e;
    --color-primary: #e0e0e0;
    --color-accent: #667eea;         /* 紫色 */
    --color-accent-deep: #764ba2;
}
```

**修改步骤**: 打开 `css/theme.css`，找到对应的主题块，修改颜色变量值，保存后刷新浏览器。

---

### 5️⃣ 修改粒子效果

**文件位置**: `js/config.js`

```javascript
const particlesLightConfig = {
  particles: {
    number: { value: 100 },      // 粒子数量（移动端会自动减半）
    color: {
      value: ["#4a90e2", "#5dade2", "#ffffff"]  // 粒子颜色
    },
    size: { value: 5 },          // 粒子大小
    line_linked: {
      enable: true,              // 是否显示连线
      distance: 180,            // 连线距离
    },
    move: { speed: 1.8 }         // 移动速度
  }
};
```

**性能优化**: 如果卡顿，可以减少粒子数量或删除 `index.html` 中的particles.js引用。

---

### 6️⃣ 修改新闻源

**文件位置**: `js/news.js`

```javascript
// 修改API地址
const NEWS_API_URL = 'https://api.mdnice.com/trendings';

// 修改平台配置
this.platformConfig = {
    'zhihu': { name: '知乎', icon: '🔵' },
    'weibo': { name: '微博', icon: '🔴' },
    'toutiao': { name: '头条', icon: '📰' },
    // ... 更多平台
};
```

---

### 7️⃣ 修改标题和描述

**文件位置**: `index.html`

```html
<head>
    <title>思维兵工厂</title>  <!-- 修改这里 -->
    <meta name="description" content="...">  <!-- 修改描述 -->
    <meta name="keywords" content="...">     <!-- 修改关键词 -->
</head>

<body>
    <div class="header">
        <h1>思维兵工厂</h1>  <!-- 修改页面标题 -->
    </div>
</body>
```

---

## 🌐 部署方式

### 1. GitHub Pages（推荐）

1. 创建GitHub仓库
2. 上传代码：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/web-home.git
   git push -u origin main
   ```
3. 启用GitHub Pages: Settings → Pages → Deploy from branch → main/root
4. 访问 `https://yourusername.github.io/web-home/`

**自定义域名**: 在根目录创建 `CNAME` 文件，写入你的域名，然后在域名提供商添加DNS记录。

---

### 2. Vercel部署

```bash
npm i -g vercel
cd web-home
vercel
```

---

### 3. Netlify部署

访问 [app.netlify.com/drop](https://app.netlify.com/drop)，将整个项目文件夹拖拽到页面中即可。

---

### 4. 云存储（阿里云OSS / 腾讯云COS）

1. 创建对象存储桶，设置为公开读权限
2. 上传整个项目文件
3. 开启静态网站功能，设置默认文档为 `index.html`
4. 绑定自定义域名（可选）

---

## ❓ 常见问题

### Q1: 如何备份和恢复我的自定义数据？

**备份数据**: 打开浏览器开发者工具（F12），在Console中执行：
```javascript
const backup = {
    theme: localStorage.getItem('theme'),
    websitesOrder: localStorage.getItem('websitesOrder'),
    customWebsites: localStorage.getItem('customWebsites'),
    deletedDefaultWebsites: localStorage.getItem('deletedDefaultWebsites'),
    customCategories: localStorage.getItem('customCategories'),
    categoriesOrder: localStorage.getItem('categoriesOrder')
};
console.log(JSON.stringify(backup, null, 2));
```
复制输出的JSON并保存为 `backup.json`。

**恢复数据**: 打开浏览器开发者工具（F12），在Console中执行：
```javascript
// 恢复数据（假设已有backup变量）
if (backup.theme) localStorage.setItem('theme', backup.theme);
if (backup.websitesOrder) localStorage.setItem('websitesOrder', backup.websitesOrder);
// ... 其他键
location.reload();
```

---

### Q2: 粒子效果卡顿怎么办？

1. **移动端**: 已自动优化（粒子数减半）
2. **关闭粒子效果**: 删除 `index.html` 中的particles.js引用
3. **减少粒子数量**: 修改 `js/config.js` 中的 `number.value`

---

### Q3: 新闻加载失败？

1. 检查网络连接
2. 等待一段时间后重新加载页面
3. 即使API失败，也会显示缓存的新闻（如果存在）

---

### Q4: 图标不显示？

1. 检查 `icon` 属性的路径是否正确
2. 确认图标文件存在于 `icon/` 目录
3. 确保图标格式为PNG/ICO/SVG/WebP
4. 图标不宜过大（建议<100KB）

---

## 🎨 主题配色参考

```css
/* 科技蓝（默认） */
--color-accent: #3498db;

/* 紫色梦幻 */
--color-accent: #9b59b6;

/* 绿色清新 */
--color-accent: #2ecc71;

/* 橙色活力 */
--color-accent: #e67e22;

/* 粉色温柔 */
--color-accent: #e84393;
```

---

## 📚 相关资源

- [Particles.js文档](https://particles.js.org/)
- [Font Awesome文档](https://fontawesome.com/docs)
- [配色工具](https://coolors.co/)
- [图标下载](https://www.flaticon.com/)

---

## 👨‍💻 作者

**昵称**: 子不语  
**公众号**: 思维兵工厂  
**联系方式**: zibuyu2015831@qq.com

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- [Particles.js](https://particles.js.org/) - 粒子动画库
- [Font Awesome](https://fontawesome.com/) - 图标库
- [MDNice API](https://api.mdnice.com/trendings) - 新闻数据API

---

<p align="center">
  <b>如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！</b>
</p>
