// 网站数据
const websitesData = {
    "常用": [
        {
            "name": "ChatGPT",
            "subtitle": "OpenAI开发",
            "url": "https://chat.openai.com",
            "icon": "./icon/chatgpt.png"
        },
        {
            "name": "Grok",
            "subtitle": "马斯克旗下",
            "url": "https://grok.com/chat",
            "icon": "./icon/grok.ico"
        },
        {
            "name": "DeepSeek",
            "subtitle": "国产开源先河",
            "url": "https://chat.deepseek.com/",
            "icon": "./icon/deepseek.svg"
        },
        {
            "name": "Kimi",
            "subtitle": "月之暗面",
            "url": "https://kimi.moonshot.cn/",
            "icon": "./icon/kimi.ico"
        },
        {
            "name": "通义千问",
            "subtitle": "阿里出品",
            "url": "https://tongyi.aliyun.com/qianwen/",
            "icon": "./icon/tongyi.svg"
        },
        {
            "name": "讯飞星火",
            "subtitle": "科大讯飞",
            "url": "https://xinghuo.xfyun.cn/desk",
            "icon": "./icon/xfyun.png"
        },
        {
            "name": "腾讯镜像",
            "subtitle": "腾讯云的镜像仓库",
            "url": "https://console.cloud.tencent.com/tcr",
            "icon": "./icon/cloud_tencent.ico"
        },
        {
            "name": "腾讯函数",
            "subtitle": "腾讯的函数服务",
            "url": "https://console.cloud.tencent.com/scf/index",
            "icon": "./icon/cloud_tencent.ico"
        },
        {
            "name": "企业微信",
            "subtitle": "企业微信",
            "url": "https://work.weixin.qq.com/wework_admin",
            "icon": "./icon/corp_wechat.png"
        },
        {
            "name": "微信公众平台",
            "subtitle": "微信公众平台",
            "url": "https://mp.weixin.qq.com/",
            "icon": "https://mp.weixin.qq.com/favicon.ico"
        },
        {
            "name": "微信视频号",
            "subtitle": "微信视频号",
            "url": "https://channels.weixin.qq.com/login.html",
            "icon": "./icon/channels.ico"
        },
        {
            "name": "微信测试号",
            "subtitle": "供微信开发使用",
            "url": "https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login",
            "icon": "./icon/wx_test.ico"
        },
        {
            "name": "GitHub",
            "subtitle": "最大的开源代码库",
            "url": "https://www.github.com",
            "icon": "./icon/github.ico"
        },
        {
            "name": "Gitee",
            "subtitle": "国内开源代码平台",
            "url": "https://www.gitee.com",
            "icon": "./icon/gitee.ico"
        },
        {
            "name": "哔哩哔哩",
            "url": "https://www.bilibili.com",
            "icon": "./icon/bilibili.ico",
            "subtitle": "国内视频网站"
        },
        {
            "name": "知乎",
            "url": "https://www.zhihu.com",
            "subtitle": "国内问答平台",
            "icon": "./icon/zhihu.ico"
        },
        {
            "name": "Claude镜像",
            "url": "https://share.claude.best",
            "subtitle": "免费Claude镜像",
            "icon": "./icon/share_claude.png"
        },
        {
            "name": "硅基流动",
            "subtitle": "开源模型汇总",
            "url": "https://cloud.siliconflow.cn/models",
            "icon": "./icon/siliconflow.svg"
        }
    ],
    "AI": [
        {
            "name": "ChatGPT",
            "subtitle": "OpenAI开发",
            "url": "https://chat.openai.com",
            "icon": "./icon/chatgpt.png"
        },
        {
            "name": "Claude",
            "subtitle": "代码能力强",
            "url": "https://claude.ai/",
            "icon": "./icon/claude.png"
        },
        {
            "name": "Gemini",
            "subtitle": "代码能力强",
            "url": "https://gemini.google.com/",
            "icon": "./icon/gemini.svg"
        },
        {
            "name": "Grok",
            "subtitle": "马斯克旗下",
            "url": "https://grok.com/chat",
            "icon": "./icon/grok.ico"
        },
        {
            "name": "DeepSeek",
            "subtitle": "国产开源先河",
            "url": "https://chat.deepseek.com/",
            "icon": "./icon/deepseek.svg"
        },
        {
            "name": "豆包",
            "subtitle": "字节跳动",
            "url": "https://www.doubao.com/chat/",
            "icon": "./icon/doubao.png"
        },
        {
            "name": "Kimi",
            "subtitle": "月之暗面",
            "url": "https://kimi.moonshot.cn/",
            "icon": "./icon/kimi.ico"
        },
        {
            "name": "通义千问",
            "subtitle": "阿里巴巴",
            "url": "https://tongyi.aliyun.com/qianwen/",
            "icon": "./icon/tongyi.svg"
        },
        {
            "name": "讯飞星火",
            "subtitle": "科大讯飞",
            "url": "https://xinghuo.xfyun.cn/desk",
            "icon": "./icon/xfyun.png"
        },
        {
            "name": "海螺问问",
            "subtitle": "MinMax-上海稀宇",
            "url": "https://hailuoai.com/",
            "icon": "./icon/hailuoai.png"
        },
        {
            "name": "智谱清言",
            "subtitle": "清华智谱",
            "url": "https://chatglm.cn/",
            "icon": "./icon/chatglm.png"
        },
        {
            "name": "文心一言",
            "subtitle": "百度出品",
            "url": "https://yiyan.baidu.com/",
            "icon": "./icon/wenxinyiyan.png"
        },
        {
            "name": "质谱",
            "subtitle": "质谱海外版",
            "url": "https://chat.z.ai/",
            "icon": "./icon/zai.svg"
        },
        {
            "name": "百川大模型",
            "subtitle": "百川智能",
            "url": "https://ying.baichuan-ai.com/",
            "icon": "./icon/baichuan.png"
        },
        {
            "name": "天工AI",
            "subtitle": "AI办公",
            "url": "https://www.tiangong.cn/",
            "icon": "./icon/tg.png"
        },
        {
            "name": "GenSpark",
            "subtitle": "超级智能体",
            "url": "https://www.genspark.ai/",
            "icon": "./icon/tg.png"
        },
        {
            "name": "UniFuncs",
            "subtitle": "深度研究",
            "url": "https://unifuncs.com/deepresearch",
            "icon": "./icon/unifuncs.png"
        },
        {
            "name": "硅基流动",
            "subtitle": "开源模型汇总",
            "url": "https://cloud.siliconflow.cn/models",
            "icon": "./icon/siliconflow.svg"
        }
    ],
    "云服务": [
        {
            "name": "阿里云",
            "subtitle": "阿里云主页",
            "url": "https://www.aliyun.com/",
            "icon": "./icon/ali_cloud.ico"
        },
        {
            "name": "腾讯云",
            "subtitle": "腾讯云主页",
            "url": "https://cloud.tencent.com/",
            "icon": "./icon/tencent_cloud.ico"
        },
        {
            "name": "华为云",
            "subtitle": "华为云主页",
            "url": "https://www.huaweicloud.com/",
            "icon": "./icon/huaweicloud.ico"
        },
        {
            "name": "火山引擎",
            "subtitle": "字节跳动",
            "url": "https://www.volcengine.com/",
            "icon": "./icon/volcengine.ico"
        },
        {
            "name": "七牛云",
            "subtitle": "云服务",
            "url": "https://portal.qiniu.com/home",
            "icon": "./icon/qiniu.ico"
        },
        {
            "name": "百度云",
            "subtitle": "百度云主页",
            "url": "https://cloud.baidu.com/",
            "icon": "./icon/baiduyun.ico"
        },
        {
            "name": "讯飞开放平台",
            "subtitle": "讯飞开放平台",
            "url": "https://www.xfyun.cn/",
            "icon": "./icon/xfyun_cloud.ico"
        },
        {
            "name": "坚果云",
            "subtitle": "个人云存储服务",
            "url": "https://www.jianguoyun.com",
            "icon": "./icon/jianguoyun.ico"
        },
        {
            "name": "缤纷云",
            "subtitle": "免费的对象存储",
            "url": "https://console.bitiful.com/dashboard",
            "icon": "./icon/bitiful.ico"
        },
        {
            "name": "MemFire",
            "subtitle": "免费的数据库",
            "url": "https://cloud.memfiredb.com/generaloverview",
            "icon": "./icon/memfiredb.ico"
        },
        {
            "name": "SQLhub",
            "subtitle": "云数据库服务",
            "url": "https://sqlpub.com/dashboard",
            "icon": "./icon/sqlpub.ico"
        },
        {
            "name": "DeepSeek",
            "subtitle": "DeepSeek开放平台",
            "url": "https://platform.deepseek.com/",
            "icon": "./icon/deepseek.svg"
        },
        {
            "name": "MinMax",
            "subtitle": "MinMax开放平台",
            "url": "https://www.minimaxi.com/platform_overview",
            "icon": "./icon/minmax.png"
        },
        {
            "name": "Kimi",
            "subtitle": "Kimi开放平台",
            "url": "https://platform.moonshot.cn/",
            "icon": "./icon/kimi.ico"
        },
        {
            "name": "智谱",
            "subtitle": "智谱开放平台",
            "url": "https://open.bigmodel.cn/",
            "icon": "./icon/zhipuopen.png"
        }
    ],
    "工具汇集": [
        {
            "name": "蓝奏云",
            "url": "https://www.lanzou.com/",
            "subtitle": "免费存储100M文件",
            "icon": "./icon/lanzou.ico"
        },
        {
            "name": "小飞机网盘",
            "url": "https://www.feijipan.com/",
            "subtitle": "免费存储空间1G",
            "icon": "./icon/xiaofeiji.ico"
        },
        {
            "name": "QQ邮箱",
            "url": "https://mail.qq.com",
            "icon": "./icon/qq_mail.ico",
            "subtitle": "腾讯旗下邮箱服务"
        },
        {
            "name": "临时邮箱",
            "subtitle": "国内临时邮箱",
            "url": "https://www.snapmail.cc/",
            "icon": "./icon/snapmail.ico"
        },
        {
            "name": "小宇宙播客",
            "url": "https://podcaster.xiaoyuzhoufm.com/",
            "subtitle": "小宇宙主页",
            "icon": "./icon/xiaoyuzhou.ico"
        },
        {
            "name": "图怪兽",
            "subtitle": "作图工具",
            "url": "https://818ps.com/home",
            "icon": "./icon/tuguaishou.png"
        },
        {
            "name": "Markdown编辑",
            "subtitle": "Markdown转微信推文",
            "url": "./tools/markdown2wechat/index.html",
            "icon": "./icon/markdown.ico"
        },
        {
            "name": "好维持",
            "subtitle": "虚假美国地址",
            "url": "https://www.haoweichi.com/",
            "icon": "./icon/haoweichi.ico"
        },
        {
            "name": "NatApp",
            "subtitle": "内网穿透",
            "url": "https://natapp.cn/",
            "icon": "./icon/natapp.png"
        },
        {
            "name": "多米API",
            "subtitle": "免费API平台",
            "url": "https://api.wike.cc/",
            "icon": "./icon/duomi.png"
        },
        {
            "name": "哲风壁纸",
            "subtitle": "壁纸平台",
            "url": "https://haowallpaper.com/",
            "icon": "./icon/zefeng.ico"
        },
        {
            "name": "百度云解析",
            "subtitle": "解析直链",
            "url": "https://www.94speed.com/",
            "icon": "./icon/default.ico"
        },
        {
            "name": "Lucide",
            "subtitle": "图标网站",
            "url": "https://lucide.dev/",
            "icon": "./icon/lucide.ico"
        },
        {
            "name": "鸭力巨大",
            "subtitle": "图片+视频压缩",
            "url": "https://www.yalijuda.com/",
            "icon": "./icon/yalijvda.png"
        },
        {
            "name": "文本转语音",
            "subtitle": "外网环境不可用",
            "url": "https://t.leftsite.cn/",
            "icon": "./icon/tts.svg"
        },
        {
            "name": "火狐狸",
            "subtitle": "接码平台",
            "url": "https://t.me/firefox_fun",
            "icon": "./icon/huohuli.jpg"
        },
        {
            "name": "Generator Prompt",
            "subtitle": "Prompt生成器",
            "url": "https://generatorprompt.org/",
            "icon": "./icon/generatorprompt.svg"
        },
        {
            "name": "Prompter Hub",
            "subtitle": "Prompt分享平台",
            "url": "https://www.prompterhub.cn/",
            "icon": "./icon/prompterhub.png"
        }
    ],
    "墙外世界": [
        {
            "name": "Youtube",
            "subtitle": "国外视频平台",
            "url": "https://www.youtube.com/",
            "icon": "./icon/youtube.ico"
        },
        {
            "name": "Stack Overflow",
            "subtitle": "IT问答平台",
            "url": "https://www.stackoverflow.com",
            "icon": "./icon/stackoverflow.ico"
        },
        {
            "name": "Jitter",
            "subtitle": "动画制作网址",
            "url": "https://jitter.video/",
            "icon": "./icon/jitter.png"
        },
        {
            "name": "LottieFiles",
            "subtitle": "动态图标下载",
            "url": "https://lottiefiles.com/",
            "icon": "./icon/lottiefiles.png"
        },
        {
            "name": "手写体草稿",
            "subtitle": "生成手写体",
            "url": "https://vtool.pro/",
            "icon": "./icon/jitter.png"
        },
        {
            "name": "Proton邮箱",
            "subtitle": "Proton邮箱",
            "url": "https://account.proton.me/mail",
            "icon": "./icon/proton.ico"
        },
        {
            "name": "朗文词典",
            "url": "https://www.ldoceonline.com/",
            "icon": "./icon/ldoceonline.ico",
            "subtitle": "朗文在线词典"
        },
        {
            "name": "科林斯词典",
            "url": "https://www.collinsdictionary.com/dictionary/",
            "icon": "./icon/collins.ico",
            "subtitle": "科林斯在线词典"
        },
        {
            "name": "Etymonline",
            "url": "https://www.etymonline.com/",
            "icon": "./icon/etymonline.png",
            "subtitle": "词源词典"
        },
        {
            "name": "Dictionary",
            "url": "https://www.dictionary.com/",
            "icon": "./icon/dictionarycoms.jpg",
            "subtitle": "Dictionary词典"
        },
        {
            "name": "WordSea",
            "url": "https://wordsea.xyz/",
            "icon": "./icon/word_sea.png",
            "subtitle": "WordSea"
        },
        {
            "name": "Zlibrary",
            "url": "https://z-lib.fm/",
            "icon": "./icon/zlibrary.ico",
            "subtitle": "书籍下载"
        },
        {
            "name": "getzlib",
            "url": "https://getzlib.com/zh",
            "icon": "./icon/zlibrary.ico",
            "subtitle": "获取最新Zlibrary地址"
        },
        {
            "name": "安娜的档案",
            "url": "https://annas-archive.org/",
            "icon": "./icon/anna_archive.png",
            "subtitle": "书籍下载"
        },
        {
            "name": "Openstax",
            "url": "https://openstax.org/",
            "icon": "./icon/openstax.png",
            "subtitle": "公益教材库"
        }
    ],
    "阅读": [
        {
            "name": "识典古籍",
            "url": "https://www.shidianguji.com/",
            "icon": "./icon/shidianguji.png",
            "subtitle": "古籍阅读平台"
        },
        {
            "name": "子夜星",
            "url": "http://www.ziyexing.com/",
            "icon": "./icon/none.png",
            "subtitle": "古籍阅读平台"
        },
        {
            "name": "汉典",
            "url": "https://www.zdic.net/",
            "icon": "./icon/handian.ico",
            "subtitle": "在线词典"
        },
        {
            "name": "搜韵",
            "url": "https://sou-yun.cn/index.aspx",
            "icon": "./icon/souyun.png",
            "subtitle": "诗词格律校验"
        },
        {
            "name": "古文之家",
            "url": "https://www.cngwzj.com/",
            "icon": "./icon/guwen.png",
            "subtitle": "古诗文拼音标注"
        },
        {
            "name": "中国哲学书电子化计划",
            "url": "https://ctext.org/zh",
            "icon": "./icon/ctext.ico",
            "subtitle": "古诗文拼音标注"
        },
        {
            "name": "诵读客栈",
            "url": "https://songduke.com/indexpc.php",
            "icon": "./icon/langsong.ico",
            "subtitle": "古诗文朗读"
        },
        {
            "name": "Book Yell",
            "url": "https://bookyell.com/",
            "icon": "./icon/book_yell.png",
            "subtitle": "英文阅读"
        },
        {
            "name": "open Text Books",
            "url": "https://open.umn.edu/opentextbooks/",
            "icon": "./icon/open_library.svg",
            "subtitle": "公开教材库"
        },
        {
            "name": "L站",
            "url": "https://linux.do/",
            "icon": "./icon/linux.png",
            "subtitle": "新互联网分享平台"
        },
        {
            "name": "链滴",
            "url": "https://ld246.com/",
            "icon": "./icon/liandi.png",
            "subtitle": "思源笔记论坛"
        },
        {
            "name": "A姐分享",
            "url": "https://www.ahhhhfs.com/",
            "icon": "./icon/ahhhhfs.webp",
            "subtitle": "个人资源分享网站"
        },
        {
            "name": "墨滴写作",
            "url": "https://www.mdnice.com/",
            "icon": "./icon/mdnice.svg",
            "subtitle": "写作平台"
        },
        {
            "name": "FastAPI",
            "url": "https://fastapi.tiangolo.com/zh/",
            "icon": "./icon/fastapi.png",
            "subtitle": "FastAPI官方文档"
        },
        {
            "name": "Django",
            "url": "https://docs.djangoproject.com/zh-hans/5.1/",
            "icon": "./icon/django.ico",
            "subtitle": "Django官方文档"
        },
        {
            "name": "微信开发文档",
            "url": "https://developers.weixin.qq.com/doc/",
            "icon": "./icon/wx.ico",
            "subtitle": "微信开发文档"
        },
        {
            "name": "思源笔记开发",
            "url": "https://docs.siyuan-note.club/zh-Hans/",
            "icon": "./icon/siyuan.svg",
            "subtitle": "思源笔记开发文档"
        },
        {
            "name": "obsidian开发",
            "url": "https://publish.obsidian.md/help-zh/%E7%94%B1%E6%AD%A4%E5%BC%80%E5%A7%8B",
            "icon": "./icon/obsidian.ico",
            "subtitle": "obsidian开发文档"
        }
    ],
    "工作": [
        {
            "name": "探巡项目地址",
            "url": "https://github.com/orgs/scantist/repositories",
            "icon": "./icon/github.ico",
            "subtitle": "项目文档"
        },
        {
            "name": "探巡项目面板",
            "url": "https://scantist.atlassian.net/jira/software/projects/CN/boards/44",
            "icon": "./icon/jira.png",
            "subtitle": "Jira项目管理"
        },
        {
            "name": "探巡项目文档",
            "url": "https://scantist.atlassian.net/wiki/spaces/PROD/pages/2209185814/Scantist+DevSecOps+V4",
            "icon": "./icon/jira.png",
            "subtitle": "项目文档"
        },
        {
            "name": "探巡测试环境",
            "url": "https://v4dev.scantist.io/",
            "icon": "./icon/tanxun.svg",
            "subtitle": "通用功能"
        },
        {
            "name": "中汽研",
            "url": "https://v4dev-2.scantist.io/",
            "icon": "./icon/zhongqiyan.svg",
            "subtitle": "中汽研测试环境"
        },
        {
            "name": "微信网页版",
            "url": "https://wx.qq.com",
            "icon": "./icon/wechat.png",
            "subtitle": "微信在线网页版"
        },
        {
            "name": "Element Plus",
            "url": "https://cn.element-plus.org/zh-CN/guide/design.html",
            "icon": "./icon/element_plus.png",
            "subtitle": "Element Plus文档"
        },
        {
            "name": "Process on",
            "url": "https://www.processon.com/",
            "icon": "./icon/processon.ico",
            "subtitle": "在线画图"
        }
    ]
};
