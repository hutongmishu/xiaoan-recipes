// 小安做菜 - 主页逻辑

class App {
  constructor() {
    this.recipes = window.recipes || [];
    this.init();
  }

  init() {
    this.renderRecipes();
    this.bindEvents();
    this.checkInstallPrompt();
  }

  // 渲染菜谱列表
  renderRecipes(filter = '') {
    const container = document.getElementById('recipeList');
    
    let displayRecipes = this.recipes;
    if (filter) {
      const keyword = filter.toLowerCase();
      displayRecipes = this.recipes.filter(r => 
        r.title.toLowerCase().includes(keyword) ||
        r.tags.some(t => t.toLowerCase().includes(keyword))
      );
    }

    if (displayRecipes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="emoji">🔍</div>
          <p>没有找到相关菜谱</p>
        </div>
      `;
      return;
    }

    container.innerHTML = displayRecipes.map(recipe => `
      <a href="recipe.html?id=${recipe.id}" class="recipe-card">
        <div class="card-cover">
          <span class="card-emoji">${recipe.emoji}</span>
          <span class="card-badge">${recipe.difficulty}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${recipe.title}</h3>
          <p class="card-subtitle">${recipe.subtitle}</p>
          <div class="card-meta">
            <span class="meta-item">⏱️ ${recipe.time}</span>
            <span class="meta-item">👤 ${recipe.servings}</span>
          </div>
          <div class="card-tags">
            ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </a>
    `).join('');
  }

  // 绑定事件
  bindEvents() {
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderRecipes(e.target.value);
      });
    }

    // 关于弹窗
    const aboutTab = document.getElementById('aboutTab');
    const aboutModal = document.getElementById('aboutModal');
    const closeModal = document.getElementById('closeModal');
    const overlay = document.getElementById('overlay');

    if (aboutTab) {
      aboutTab.addEventListener('click', (e) => {
        e.preventDefault();
        aboutModal.classList.add('show');
        overlay.classList.add('show');
      });
    }

    const hideModal = () => {
      aboutModal.classList.remove('show');
      overlay.classList.remove('show');
    };

    if (closeModal) closeModal.addEventListener('click', hideModal);
    if (overlay) overlay.addEventListener('click', hideModal);
  }

  // 检查是否可以提示安装
  checkInstallPrompt() {
    // 检测 iOS 设备
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIOS && !isStandalone) {
      // iOS 显示安装提示
      const installTip = document.getElementById('installTip');
      if (installTip) {
        installTip.innerHTML = '<p>💡 点击 Safari 分享按钮 → "添加到主屏幕"</p>';
      }
    }
  }
}

// 检测 Service Worker 更新
function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
        showUpdateNotification();
      }
    });
  }
}

// 显示更新提示
function showUpdateNotification() {
  // 创建更新提示条
  const updateBar = document.createElement('div');
  updateBar.className = 'update-bar';
  updateBar.innerHTML = `
    <span>🎉 有新版本可用</span>
    <button onclick="location.reload()">立即刷新</button>
  `;
  
  // 添加样式
  updateBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #4caf50;
    color: white;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9999;
    font-size: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;
  
  updateBar.querySelector('button').style.cssText = `
    background: white;
    color: #4caf50;
    border: none;
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
  `;
  
  document.body.appendChild(updateBar);
  document.body.style.paddingTop = '48px';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new App();
  checkForUpdates();
});