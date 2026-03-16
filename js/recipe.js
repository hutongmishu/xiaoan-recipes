// 小安做菜 - 菜谱详情页逻辑

class RecipePage {
  constructor() {
    this.recipe = null;
    this.currentStep = 0;
    this.isCooking = false;
    this.init();
  }

  init() {
    this.loadRecipe();
    if (this.recipe) {
      this.renderRecipe();
      this.bindEvents();
    }
  }

  // 加载菜谱数据
  loadRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    
    if (window.recipes) {
      this.recipe = window.recipes.find(r => r.id === id);
    }

    if (!this.recipe) {
      document.getElementById('recipeDetail').innerHTML = `
        <div class="empty-state">
          <div class="emoji">😢</div>
          <p>菜谱不存在或已被删除</p>
          <a href="index.html" style="color: var(--primary); margin-top: 16px; display: inline-block;">返回首页</a>
        </div>
      `;
    }
  }

  // 渲染菜谱详情
  renderRecipe() {
    const r = this.recipe;
    const container = document.getElementById('recipeDetail');

    container.innerHTML = `
      <!-- 头部信息 -->
      <div class="detail-header">
        <div class="detail-cover">
          <span class="detail-emoji">${r.emoji}</span>
        </div>
        <div class="detail-info">
          <h1 class="detail-title">${r.title}</h1>
          <p class="detail-subtitle">${r.subtitle}</p>
          <div class="detail-stats">
            <div class="stat">
              <span class="stat-value">${r.time}</span>
              <span class="stat-label">烹饪时间</span>
            </div>
            <div class="stat">
              <span class="stat-value">${r.difficulty}</span>
              <span class="stat-label">难度</span>
            </div>
            <div class="stat">
              <span class="stat-value">${r.servings}</span>
              <span class="stat-label">份量</span>
            </div>
          </div>
          <div class="detail-tags">
            ${r.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- 材料清单 -->
      <div class="section">
        <div class="section-title">
          <h2>📋 材料清单</h2>
        </div>
        ${this.renderIngredients()}
      </div>

      <!-- 制作步骤 -->
      <div class="section">
        <div class="section-title">
          <h2>👨‍🍳 制作步骤</h2>
        </div>
        ${this.renderSteps()}
      </div>

      <!-- 小贴士 -->
      ${r.tips.length > 0 || r.keyPoints ? `
        <div class="section">
          <div class="section-title">
            <h2>💡 进阶吃法 & 小贴士</h2>
          </div>
          ${r.tips.length > 0 ? `
            <div class="tips-list">
              ${r.tips.map(tip => `
                <div class="tip-item">
                  <div class="tip-title">${tip.title}</div>
                  <div class="tip-content">${tip.content}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${r.keyPoints ? `
            <div class="key-points" style="${r.tips.length > 0 ? 'margin-top: 16px;' : ''}">
              <strong>关键要点：</strong>${r.keyPoints}
            </div>
          ` : ''}
        </div>
      ` : ''}

      <!-- 引用 -->
      ${r.quote ? `
        <div class="quote-section">
          <span class="quote-text">"${r.quote}"</span>
          <span class="quote-author">—— ${r.author}</span>
        </div>
      ` : ''}
    `;
  }

  // 渲染材料清单
  renderIngredients() {
    const { ingredients } = this.recipe;
    let html = '';

    if (ingredients.main && ingredients.main.length > 0) {
      html += `
        <div class="ingredient-group">
          <div class="group-title">主料</div>
          ${ingredients.main.map(item => `
            <div class="ingredient-item">
              <span class="ingredient-name">${item.name}</span>
              <span class="ingredient-amount">${item.amount}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (ingredients.seasoning && ingredients.seasoning.length > 0) {
      html += `
        <div class="ingredient-group">
          <div class="group-title">调味料</div>
          ${ingredients.seasoning.map(item => `
            <div class="ingredient-item">
              <span class="ingredient-name">${item.name}</span>
              <span class="ingredient-amount">${item.amount}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (ingredients.side && ingredients.side.length > 0) {
      html += `
        <div class="ingredient-group">
          <div class="group-title">配菜</div>
          ${ingredients.side.map(item => `
            <div class="ingredient-item">
              <span class="ingredient-name">${item.name}</span>
              <span class="ingredient-amount">${item.amount}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    return html;
  }

  // 渲染步骤
  renderSteps() {
    return this.recipe.steps.map((step, index) => `
      <div class="step-card">
        <div class="step-header">
          <span class="step-num">${index + 1}</span>
          <span class="step-title">${step.title}</span>
        </div>
        <div class="step-body">
          ${step.items.map(item => `
            <div class="step-item">
              <span class="step-dot">•</span>
              <span>${this.highlightKeywords(item)}</span>
            </div>
          `).join('')}
          ${step.tip ? `<div class="step-tip">💡 ${step.tip}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  // 高亮关键词
  highlightKeywords(text) {
    const keywords = ['微微发焦', '一碗热水', '三碗水', '15分钟', '大量葱花', '1:3', '2:3', '1:1'];
    let result = text;
    keywords.forEach(kw => {
      result = result.replace(kw, `<span class="highlight">${kw}</span>`);
    });
    return result;
  }

  // 绑定事件
  bindEvents() {
    // 跟做模式
    const cookModeBtn = document.getElementById('cookModeBtn');
    const cookingModal = document.getElementById('cookingModal');
    const closeCooking = document.getElementById('closeCooking');

    if (cookModeBtn) {
      cookModeBtn.addEventListener('click', () => {
        this.isCooking = true;
        this.currentStep = 0;
        this.renderCookingStep();
        cookingModal.classList.add('show');
      });
    }

    if (closeCooking) {
      closeCooking.addEventListener('click', () => {
        cookingModal.classList.remove('show');
        this.isCooking = false;
      });
    }

    // 步骤导航
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.renderCookingStep();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentStep < this.recipe.steps.length - 1) {
          this.currentStep++;
          this.renderCookingStep();
        }
      });
    }
  }

  // 渲染跟做步骤
  renderCookingStep() {
    const step = this.recipe.steps[this.currentStep];
    const container = document.getElementById('cookingStep');
    const progress = document.getElementById('cookingProgress');
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');

    progress.textContent = `步骤 ${this.currentStep + 1}/${this.recipe.steps.length}`;

    container.innerHTML = `
      <div class="cooking-step-content">
        <div class="cooking-step-title">
          <span class="cooking-step-number">${this.currentStep + 1}</span>
          <span class="cooking-step-name">${step.title}</span>
        </div>
        <div class="cooking-items">
          ${step.items.map(item => `
            <div class="cooking-item">
              <span class="step-dot">•</span>
              <span>${this.highlightKeywords(item)}</span>
            </div>
          `).join('')}
        </div>
        ${step.tip ? `<div class="step-tip">💡 ${step.tip}</div>` : ''}
      </div>
    `;

    // 更新按钮状态
    if (prevBtn) prevBtn.disabled = this.currentStep === 0;
    if (nextBtn) {
      nextBtn.disabled = this.currentStep === this.recipe.steps.length - 1;
      nextBtn.textContent = this.currentStep === this.recipe.steps.length - 1 ? '完成' : '下一步';
    }
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new RecipePage();
});