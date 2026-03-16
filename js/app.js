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

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new App();
});