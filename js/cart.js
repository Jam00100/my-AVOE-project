const cartItems =
	document.getElementById("cart-items");

const cartTotal =
	document.getElementById("cart-total");

let cart =
	JSON.parse(localStorage.getItem("cart")) || [];


// =============================
// Render Cart
// =============================

function renderCart() {

	if (cart.length === 0) {

		cartItems.innerHTML = `
			<div class="empty-cart">
				<p>Your cart is empty.</p>

				<a href="./index.html" class="btn">
					Continue Shopping
				</a>
			</div>
		`;
		cartTotal.textContent = "NTD $0";

		return;
	}

	let html = "";
	cart.forEach(item => {

		html += `
			<div class="cart-item">
				<div class="cart-item-image">
					<img
						src="${item.image}"
						alt="${item.name}"
					>
				</div>

				<div class="cart-item-info">

					<h2>${item.name}</h2>

					<p>${item.price}</p>

					<div class="cart-quantity">
						<button
							class="cart-minus"
							data-id="${item.id}">
							−
						</button>

						<span>
							${item.quantity}
						</span>

						<button
							class="cart-plus"
							data-id="${item.id}">
							+
						</button>
					</div>

					<button
						class="remove-cart-item"
						data-id="${item.id}">
						Remove
					</button>
				</div>
			</div>
		`;
	});
	cartItems.innerHTML = html;
}


// =============================
// Price
// =============================
function getPriceNumber(price) {

	return Number(
		price.replace("NTD $", "")
	);

}

function calculateTotal() {

	let total = 0;
	cart.forEach(item => {

		const price =
			getPriceNumber(item.price);
		total +=
			price * item.quantity;
	});
	cartTotal.textContent =
		`NTD $${total}`;

}

// =============================
// Save Cart
// =============================

function saveCart() {

	localStorage.setItem(
		"cart",
		JSON.stringify(cart)
	);

}

// =============================
// Cart Events
// =============================

function setupCartEvents() {

	const plusButtons =
		document.querySelectorAll(".cart-plus");

	const minusButtons =
		document.querySelectorAll(".cart-minus");

	const removeButtons =
		document.querySelectorAll(".remove-cart-item");

	// Plus
	plusButtons.forEach(button => {
		button.addEventListener("click", () => {

			const id =
				Number(button.dataset.id);
			const product =
				cart.find(item => item.id === id);

			product.quantity++;
			updateCart();
		});
	});

	// Minus
	minusButtons.forEach(button => {

		button.addEventListener("click", () => {

			const id =
				Number(button.dataset.id);
			const product =
				cart.find(item => item.id === id);

			if (product.quantity > 1) {
				product.quantity--;
			}
			updateCart();
		});
	});

	// Remove
	removeButtons.forEach(button => {
		button.addEventListener("click", () => {
			const id =
				Number(button.dataset.id);

			cart =
				cart.filter(item => item.id !== id);
			updateCart();
		});
	});
}


// =============================
// Update Cart
// =============================

function updateCart() {
	saveCart();
	renderCart();
	calculateTotal();
	setupCartEvents();
}

// =============================
// Start
// =============================

renderCart();
calculateTotal();
setupCartEvents();