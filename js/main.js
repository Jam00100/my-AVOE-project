// =============================
// Featured Products
// =============================

// 從utils.js中import function
import {formatPrice, updateCartCount} from "./utils.js";

// 1. 取得商品
const productGrid = document.getElementById("product-grid");

/**
 * 建立一張商品卡
 * @param {Object} product 商品資料
 * @returns {string} 商品卡 HTML
 */


function createProductCard(product) {
	return `
		<div class="product-card">
			<a href="product.html?id=${product.id}">
				<img src="${product.image}" alt="${product.name}">
				<p class="product-category"> ${product.category} </p>
				<h3 class="product-title">${product.name} </h3>
				<p class="product-price"> ${formatPrice(product.price)} </p>
			</a>
		</div>
	`;
}

updateCartCount();

// 2. 讀取商品資料
fetch("./data/products.json")
	.then(response => response.json())
	.then(products => {
		let html = "";

		// 3. 產生所有商品卡
		products.forEach(product => {
			html += createProductCard(product);
		});

		// 4. 顯示到畫面
		productGrid.innerHTML = html;

	})
	.catch(error => {
		console.error("商品資料載入失敗：", error);
	});
