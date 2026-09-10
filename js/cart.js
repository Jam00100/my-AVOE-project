const cartItems =
	document.getElementById("cart-items");

const cartTotal =
	document.getElementById("cart-total");

let cart =
	JSON.parse(localStorage.getItem("cart")) || [];

// 從utils.js中import function
import {formatPrice, updateCartCount, saveCart, setupMobileMenu} from "./utils.js";

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
	cart.forEach((item, index) => {

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
					<div class="cart-item-options">

						${item.size
							? `
								<p class="cart-item-option">
									<span>Size:</span>
									${item.size}
								</p>
							`
							: ""
						}

						${item.color
							? `
								<p class="cart-item-option">
									<span>Color:</span>
									${item.color}
								</p>
							`
							: ""
						}

					</div>
					<p class="cart-item-price">
						${formatPrice(item.price)}
					</p>

					<div class="cart-quantity">
						<button
							type="button"
							class="cart-minus"
							data-index="${index}">
							−
						</button>

						<span>
							${item.quantity}
						</span>

						<button
							type="button"
							class="cart-plus"
							data-index="${index}">
							+
						</button>
					</div>

					<button
						type="button"
						class="remove-cart-item"
						data-index="${index}">
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
function calculateTotal() {

	let total = 0;
	cart.forEach(item => {
		total += item.price * item.quantity;
	});
	cartTotal.textContent = formatPrice(total);

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

			const index =
				Number(button.dataset.index);

			cart[index].quantity++;

			updateCart();
		});
	});

	// Minus
	minusButtons.forEach(button => {

		button.addEventListener("click", () => {

			const index =
				Number(button.dataset.index);

			if (cart[index].quantity > 1) {
				cart[index].quantity--;
			}

			updateCart();
		});
	});

	// Remove
	removeButtons.forEach(button => {
		button.addEventListener("click", () => {

			const index =
				Number(button.dataset.index);

			cart.splice(index, 1);

			updateCart();
		});
	});
}


// =============================
// Update Cart
// =============================

function updateCart() {
	saveCart(cart);
	renderCart();
	calculateTotal();
	updateCartCount();
	setupCartEvents();
}

// =============================
// Start
// =============================

renderCart();
calculateTotal();
updateCartCount();
setupCartEvents();
setupMobileMenu();