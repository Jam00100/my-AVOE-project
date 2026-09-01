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

export function setupMobileMenu() {

	const menuToggle =
		document.querySelector(".menu-toggle");

	const navbar =
		document.querySelector(".navbar");

	const navLinks =
		document.querySelectorAll(".nav-links a");


	if (!menuToggle || !navbar) {
		return;
	}


	// 點 Hamburger
	menuToggle.addEventListener("click", () => {

		navbar.classList.toggle("active");

		menuToggle.classList.toggle("active");

		const isOpen =
			navbar.classList.contains("active");

		menuToggle.setAttribute(
			"aria-expanded",
			isOpen
		);

	});


	// 點選單連結後關閉 Menu
	navLinks.forEach(link => {

		link.addEventListener("click", () => {

			navbar.classList.remove("active");

			menuToggle.classList.remove("active");

			menuToggle.setAttribute(
				"aria-expanded",
				"false"
			);

		});

	});

}