import {
	formatPrice,
	updateCartCount,
	setupMobileMenu
} from "./utils.js";

const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const searchStatus = document.querySelector("#search-status");

let products = [];

function createProductCard(product) {
	return `
		<a
			href="./product.html?id=${product.id}"
			class="product-card"
		>
			<img
				src="${product.image}"
				alt="${product.name}"
			>

			<p class="product-category">
				${product.category}
			</p>

			<h2 class="product-title">
				${product.name}
			</h2>

			<p class="product-price">
				${formatPrice(product.price)}
			</p>
		</a>
	`;
}

function renderProducts(filteredProducts) {
	if (filteredProducts.length === 0) {
		searchResults.innerHTML = "";

		searchStatus.textContent =
			"No products matched your search.";

		return;
	}

	searchResults.innerHTML = filteredProducts
		.map(createProductCard)
		.join("");

	searchStatus.textContent =
		`${filteredProducts.length} product(s) found`;
}

function searchProducts() {
	const keyword = searchInput.value
		.trim()
		.toLowerCase();

	const filteredProducts = products.filter((product) => {
		const productName = product.name.toLowerCase();
		const productCategory = product.category.toLowerCase();

		return (
			productName.includes(keyword) ||
			productCategory.includes(keyword)
		);
	});

	renderProducts(filteredProducts);
}

async function loadProducts() {
	try {
		const response = await fetch("./data/products.json");

		if (!response.ok) {
			throw new Error("Failed to load products.");
		}

		products = await response.json();

		renderProducts(products);
	} catch (error) {
		console.error(error);

		searchStatus.textContent =
			"Unable to load products. Please try again later.";
	}
}

searchInput.addEventListener("input", searchProducts);

updateCartCount();
setupMobileMenu();
loadProducts();