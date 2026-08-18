// export 讓 function 可以被import
// Format Price
export function formatPrice(price) {

	return `NTD $${price.toLocaleString("zh-TW")}`;

}


// Update Cart Count
export function updateCartCount() {

	const cart =
		JSON.parse(localStorage.getItem("cart")) || [];

	const cartCount =
		document.getElementById("cart-count");

	// 檢查該頁面是否有cart
	if (!cartCount) {
		return;
	}

	let totalQuantity = 0;

	cart.forEach(item => {

		totalQuantity += item.quantity;

	});

	cartCount.textContent = totalQuantity;

}