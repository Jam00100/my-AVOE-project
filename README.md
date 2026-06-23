# my-AVOE-project
Study the front end tools
# Avoe Official - 前端優化 Side Project 藍圖

本專案針對既有的代購電商網站進行前端視覺與流暢度的全面翻新。採用原生的 **HTML5、CSS3 與 Vanilla JavaScript** 進行開發，
---

## 📂 專案檔案結構 (Project Structure)

```text
my-avoe-project/
├── index.html          # 首頁（包含當季 Lookbook、熱銷排行商品展示）
├── product.html        # 商品詳情頁（穿搭多圖輪播、尺寸選擇）
├── css/
│   └── style.css       # 全站核心
├── js/
│   ├── main.js         # 負責頁面初始化、非同步讀取 JSON 商品資料與動態渲染
│   └── cart.js         # 獨立的購物車模組（處理 LocalStorage、滑出式購物車 UI）
└── data/
    └── products.json   # 商品資料庫
