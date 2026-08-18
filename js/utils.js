// =============================
// Price
// =============================

export function formatPrice(price) {
	return `NTD $${price.toLocaleString("zh-TW")}`;
}


// =============================
// Cart Storage
// =============================

export function getCart() {

	const savedCart =
		localStorage.getItem("cart");

	// 完全沒有購物車資料
	if (!savedCart) {
		return [];
	}

	try {

		const cart =
			JSON.parse(savedCart);

		// 確認資料真的是 Array
		if (!Array.isArray(cart)) {
			return [];
		}

		return cart;

	} catch (error) {

		console.error(
			"Failed to parse cart data:",
			error
		);

		// 壞掉的資料直接移除
		localStorage.removeItem("cart");

		return [];
	}

}


export function saveCart(cart) {

	localStorage.setItem(
		"cart",
		JSON.stringify(cart)
	);

}


// =============================
// Cart Count
// =============================

export function updateCartCount() {

	const cart = getCart();

	const cartCount =
		document.getElementById("cart-count");

	if (!cartCount) {
		return;
	}

	let totalQuantity = 0;

	cart.forEach(item => {
		totalQuantity += item.quantity;
	});

	cartCount.textContent =
		totalQuantity;
}