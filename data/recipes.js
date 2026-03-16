// 小安做菜 - 菜谱数据

const recipes = [
  {
    id: 1,
    title: "小安酱改良版炸酱面",
    subtitle: "甜口酱香 · 肉丁焦香 · 家庭制作",
    author: "小安酱",
    emoji: "🍜",
    tags: ["面食", "家常", "快手"],
    time: "30分钟",
    difficulty: "中等",
    servings: "2-3人份",
    ingredients: {
      main: [
        { name: "五花肉丁", amount: "适量" },
        { name: "欣禾豆瓣酱（黄酱）", amount: "适量" },
        { name: "甜面酱", amount: "适量" },
        { name: "鲜面条（或干面条）", amount: "适量" }
      ],
      seasoning: [
        { name: "姜丝", amount: "少许" },
        { name: "葱花", amount: "大量" },
        { name: "黄酒（上海黄酒）", amount: "少许" },
        { name: "黑胡椒", amount: "少许" },
        { name: "白糖", amount: "适量" },
        { name: "食用油", amount: "少量" }
      ],
      side: [
        { name: "黄瓜", amount: "切条蘸酱" },
        { name: "青蒜", amount: "衍生菜用" }
      ]
    },
    steps: [
      {
        title: "煸肉",
        items: [
          "铁锅放少量油，油热后转中火，下姜丝爆香",
          "放入五花肉丁翻炒",
          "待肉丁表面不再发红时，喷入少许黄酒去腥",
          "等酒气蒸发后，撒入少许黑胡椒",
          "转小火慢慢翻炒，煸出猪油，直到肉丁微微发焦（美拉德反应）"
        ],
        tip: "如果肉较肥，煸出的油较多，可以倒出一些留作他用"
      },
      {
        title: "炸酱",
        items: [
          "酱料配比：豆瓣酱 : 甜面酱 = 1:3 或 2:3（喜欢甜口）",
          "不喜欢甜口可调整为 1:1",
          "将调好的酱倒入锅中，加一碗热水，待酱化开后转小火",
          "用勺子不停推酱（防止糊底），水快干时再加一碗热水",
          "重复加水、推酱过程，总共约需三碗水，炸制15分钟",
          "直到最后一点生酱味都没有，散发出浓郁的焦香味"
        ]
      },
      {
        title: "收油",
        items: [
          "放入大量葱花，继续推酱",
          "此时油酱会慢慢分离",
          "根据口味加入适量白糖搅拌均匀即可"
        ]
      }
    ],
    tips: [
      {
        title: "即时品鉴",
        content: "酱做好后，先拿黄瓜直接蘸酱尝一尝，是最佳开胃小菜"
      },
      {
        title: "剩菜利用",
        content: "剩余炸酱可做酱烧豆腐——豆腐切片煎一煎，放入剩酱加少许热水焖煮，汤汁收浓后撒入青蒜叶"
      }
    ],
    keyPoints: "全程小火，不断推酱，防止糊锅。黄酒比花雕更经济实惠，去腥效果足够。肉丁一定要煸至微焦才香。",
    quote: "我无私的把我的炸酱配方赠予你"
  }
];

// 导出数据
if (typeof window !== 'undefined') {
  window.recipes = recipes;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { recipes };
}