# AVOE Front-End Side Project

以既有代購電商網站為參考，使用原生 HTML、CSS 與 JavaScript 重新製作前端介面與購物流程。

本專案為個人自主學習作品，目前仍在開發中，主要用來練習響應式網頁設計、JavaScript DOM 操作、JSON 資料處理，以及 LocalStorage 購物車功能。

> Project Status：開發中，目前前端完成度約 70%。

> [AOVE 官網](https://www.avoeofficial.com)

## 使用技術

* HTML5
* CSS3
* Vanilla JavaScript
* JSON
* LocalStorage
* ES Modules

## 已完成功能

* 響應式首頁與導覽列
* 手機版選單
* 商品列表動態渲染
* 商品詳情頁
* 商品圖片展示
* 尺寸與顏色選擇
* 商品數量調整
* 加入購物車
* 購物車商品數量更新與刪除
* 使用 LocalStorage 保存購物車
* 商品即時搜尋
* 商品分類與排序
* 共用工具函式模組化

## 開發中功能

* About 頁面
* Contact 頁面
* 頁面內容與樣式優化
* 表單驗證
* 更完整的錯誤處理
* 使用者操作體驗優化

## 專案檔案結構

```text
my-avoe-project/
├── index.html              # 首頁
├── product.html            # 商品詳情頁
├── collection.html         # 商品集合、分類與排序
├── search.html             # 商品搜尋頁
├── cart.html               # 購物車頁面
├── css/
│   └── style.css           # 全站style
├── js/
│   ├── main.js             # 首頁商品載入與渲染
│   ├── product.js          # 商品詳情與規格選擇
│   ├── collection.js       # 商品分類、搜尋與排序
│   ├── search.js           # 即時搜尋功能
│   ├── cart.js             # 購物車內容管理
│   └── utils.js            # 共用工具酷
└── data/
    └── products.json       # 商品資料
```

## 執行方式

由於專案會使用 JavaScript 讀取 JSON 資料，建議透過本機伺服器執行。

使用 VS Code 的 Live Server：

1. 下載或 Clone 此專案。
2. 使用 VS Code 開啟專案資料夾。
3. 安裝 Live Server 擴充套件。
4. 在 `index.html` 上按右鍵。
5. 選擇 `Open with Live Server`。

## 專案限制

目前專案以純前端功能為主，尚未串接後端 API、會員系統、資料庫及金流服務。因此，商品與購物車資料僅儲存在 JSON 檔案及瀏覽器 LocalStorage 中。

## 學習成果

透過本專案，我練習了：

* 使用 JavaScript 動態產生網頁內容
* 使用 Fetch API 讀取 JSON 商品資料
* 使用 LocalStorage 保存購物車狀態
* 處理商品尺寸、顏色與數量等不同規格
* 建立商品搜尋、分類及排序功能
* 將共用功能拆分為 JavaScript 模組
* 製作適用於桌面與行動裝置的響應式介面

## 後續規劃

* 完成尚未製作的頁面
* 改善商品圖片與操作介面
* 補充表單驗證及錯誤提示
* 部署線上 Demo
* 持續整理與重構程式碼

## Disclaimer

本專案僅作為個人前端開發練習與作品展示使用，並非正式營運的電商網站。

[AOVE 官網](https://www.avoeofficial.com)
