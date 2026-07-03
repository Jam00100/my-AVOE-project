// =============================
// Featured Products
// =============================

// 1. 取得商品
const productGrid = document.getElementById("product-grid");

// 2. 商品資料
const products = [
	{
		name: "Nova Set",
		category: "Swimwear",
		price: "NTD $980",
		image: "./images/Nova_Set/Nova_set_1.jpg"
	},
	{
		name: "Sundae Swimwear",
		category: "Swimwear",
		price: "NTD $1280",
		image: "./images/Sundae_Swimwear_Collection/Sundae_Swimwear_Collection_3.jpg"
	},
	{
		name: "NF Body Top",
		category: "Shirt",
		price: "NTD $1380",
		image: "./images/NF_BODY_TOP/NF_BODY_TOP_1.jpg"
	}
];

// 3. 建立商品卡 HTML
let html = "";
products.forEach((product) => {

	html += `
		<div class="product-card">
			<img src="${product.image}" alt="${product.name}">
			<p class="product-category"> ${product.category}</p>
			<h3 class="product-title">${product.name}</h3>
			<p class="product-price">${product.price}</p>
		</div>
	`;
});
// 4. 將商品加入畫面
productGrid.innerHTML = html;