# 小安做菜 - PWA 菜谱应用

记录安卉分享的私房菜谱

## 功能特点

- 📱 PWA 应用，可添加到手机主屏幕
- 🔍 支持搜索菜谱
- 👨‍🍳 跟做模式，一步步引导烹饪
- 💾 离线可用，无网络也能查看
- 💡 小贴士和关键要点提醒

## 项目结构

```
xiaoan-pwa/
├── index.html          # 首页 - 菜谱列表
├── recipe.html         # 菜谱详情页
├── manifest.json       # PWA 配置
├── favicon.ico         # 网站图标
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── app.js          # 首页逻辑
│   ├── recipe.js       # 详情页逻辑
│   └── sw.js           # Service Worker（离线缓存）
├── data/
│   └── recipes.js      # 菜谱数据
└── icons/              # PWA 图标
    └── icon-*.png
```

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`xiaoan-recipes`（或其他你喜欢的名字）
4. 选择 "Public"（公开仓库才能用免费 GitHub Pages）
5. 点击 "Create repository"

### 2. 上传代码

```bash
# 在本地项目目录执行
cd /path/to/xiaoan-pwa

git init
git add .
git commit -m "Initial commit"

git remote add origin https://github.com/你的用户名/xiaoan-recipes.git
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单选择 "Pages"
4. "Source" 下拉选择 "Deploy from a branch"
5. "Branch" 选择 "main"，文件夹选择 "/ (root)"
6. 点击 "Save"
7. 等待几分钟，页面会显示访问地址：`https://你的用户名.github.io/xiaoan-recipes/`

### 4. 访问应用

- 手机或电脑浏览器打开上面的地址
- 点击浏览器菜单 → "添加到主屏幕"（iOS/Android）
- 以后就像原生 App 一样使用了

## 添加新菜谱

编辑 `data/recipes.js`，按照以下格式添加：

```javascript
{
  id: 2,  // 递增的ID
  title: "菜谱名称",
  subtitle: "副标题描述",
  author: "安卉",
  emoji: "🍲",
  tags: ["分类", "标签"],
  time: "30分钟",
  difficulty: "简单",
  servings: "2-3人份",
  ingredients: {
    main: [{ name: "材料", amount: "用量" }],
    seasoning: [{ name: "调料", amount: "用量" }],
    side: [{ name: "配菜", amount: "用量" }]
  },
  steps: [
    {
      title: "步骤名称",
      items: ["步骤1", "步骤2"],
      tip: "小贴士（可选）"
    }
  ],
  tips: [
    { title: "提示标题", content: "提示内容" }
  ],
  keyPoints: "关键要点",
  quote: "引用的话"
}
```

## 本地预览

```bash
# 方法1：Python 简单服务器
cd xiaoan-pwa
python3 -m http.server 8000

# 然后访问 http://localhost:8000

# 方法2：Node.js serve 包
npx serve .
```

## 技术栈

- 原生 HTML5 + CSS3 + JavaScript
- PWA（Progressive Web App）
- Service Worker 离线缓存
- 响应式设计，适配手机/平板/电脑

## 当前菜谱

- 马奶奶改良版炸酱面

---

> "我无私的把我的炸酱配方赠予你" —— 安卉
