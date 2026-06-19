const contentSections = [
  {
    id: "game-reviews",
    title: "游戏评测",
    tags: ["爱游戏", "手游", "评测"],
    description: "最新手游深度评测与分析",
    items: [
      { name: "仙剑奇侠传", platform: "Android/iOS", rating: 4.5 },
      { name: "原神", platform: "Android/iOS/PC", rating: 4.8 },
      { name: "王者荣耀", platform: "iOS/Android", rating: 4.6 }
    ]
  },
  {
    id: "news-updates",
    title: "新闻动态",
    tags: ["爱游戏", "行业资讯", "版本更新"],
    description: "游戏行业最新消息与版本动态",
    items: [
      { name: "夏季游戏发布会", date: "2024-06-15", highlight: "多款新作亮相" },
      { name: "爱游戏平台更新", date: "2024-06-10", highlight: "优化用户体验" }
    ]
  },
  {
    id: "tips-guides",
    title: "攻略指南",
    tags: ["爱游戏", "攻略", "技巧"],
    description: "实用游戏攻略与技巧分享",
    items: [
      { name: "新手入门指南", difficulty: "简单", content: "快速上手必备知识" },
      { name: "高级技巧", difficulty: "困难", content: "提升操作水平" }
    ]
  }
];

const sectionIndex = {};

contentSections.forEach((section, index) => {
  sectionIndex[section.id] = index;
});

const keywordTags = ["爱游戏", "手游", "评测", "攻略", "资讯", "更新", "技巧"];

function filterContent(keyword) {
  if (!keyword || keyword.trim() === "") {
    return { matched: [], total: 0 };
  }

  const lowerKeyword = keyword.toLowerCase().trim();
  const matchedSections = [];

  contentSections.forEach((section) => {
    const sectionMatch =
      section.title.toLowerCase().includes(lowerKeyword) ||
      section.description.toLowerCase().includes(lowerKeyword) ||
      section.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword));

    const itemMatches = section.items.filter((item) => {
      const itemValues = Object.values(item).map((val) =>
        String(val).toLowerCase()
      );
      return itemValues.some((val) => val.includes(lowerKeyword));
    });

    if (sectionMatch || itemMatches.length > 0) {
      matchedSections.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchedItems: itemMatches.length > 0 ? itemMatches : section.items,
        matchType: itemMatches.length > 0 ? "item" : "section"
      });
    }
  });

  return {
    matched: matchedSections,
    total: matchedSections.length
  };
}

const baseUrl = "https://appm-aiyouxi.com.cn";

function buildSectionUrl(sectionId) {
  return `${baseUrl}/content/${sectionId}`;
}

function generateSiteSummary() {
  const totalItems = contentSections.reduce(
    (acc, section) => acc + section.items.length,
    0
  );
  return {
    totalSections: contentSections.length,
    totalItems: totalItems,
    keywords: keywordTags,
    source: baseUrl
  };
}

const searchDemo = filterContent("爱游戏");
const summaryDemo = generateSiteSummary();

console.log("搜索测试结果:", searchDemo);
console.log("站点摘要:", summaryDemo);