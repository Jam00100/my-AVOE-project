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
	return JSON.parse(localStorage.getItem("cart")) || [];
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

	cartCount.textContent = totalQuantity;
}