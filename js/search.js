import {
	formatPrice,
	updateCartCount,
	setupMobileMenu
} from "./utils.js";

const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const searchStatus = document.querySelector("#search-status");

let products = [];
let searchTimer;

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

function renderProducts(filteredProducts, keyword = "") {
	if (filteredProducts.length === 0) {
		searchResults.innerHTML = "";

		searchStatus.textContent =
			`No products found for "${keyword}".`;

		return;
	}

	searchResults.innerHTML = filteredProducts
		.map(createProductCard)
		.join("");

	if (keyword === "") {
		searchStatus.textContent = "";
		return;
	}

	const productLabel =
		filteredProducts.length === 1
			? "product"
			: "products";

	searchStatus.textContent =
		`${filteredProducts.length} ${productLabel} found for "${keyword}".`;
}

function updateSearchURL(keyword) {
	const url = new URL(window.location.href);

	if (keyword === "") {
		url.searchParams.delete("query");
	} else {
		url.searchParams.set("query", keyword);
	}

	window.history.replaceState({}, "", url);
}

function searchProducts() {
	const rawKeyword = searchInput.value.trim();
	const normalizedKeyword = rawKeyword.toLowerCase();

	updateSearchURL(rawKeyword);

	if (normalizedKeyword === "") {
		renderProducts(products);
		return;
	}

	const filteredProducts = products.filter((product) => {
		const productName = product.name.toLowerCase();
		const productCategory = product.category.toLowerCase();

		return (
			productName.includes(normalizedKeyword) ||
			productCategory.includes(normalizedKeyword)
		);
	});

	renderProducts(filteredProducts, rawKeyword);
}

function handleSearchInput() {
	clearTimeout(searchTimer);

	searchTimer = setTimeout(() => {
		searchProducts();
	}, 300);
}

async function loadProducts() {
	try {
		const response = await fetch("./data/products.json");

		if (!response.ok) {
			throw new Error("Failed to load products.");
		}

		products = await response.json();

		const searchParams = new URLSearchParams(
			window.location.search
		);

		const initialKeyword =
			searchParams.get("query") ?? "";

		searchInput.value = initialKeyword;

		searchProducts();
	} catch (error) {
		console.error(error);

		searchStatus.textContent =
			"Unable to load products. Please try again later.";
	}
}

searchInput.addEventListener(
	"input",
	handleSearchInput
);

updateCartCount();
setupMobileMenu();
loadProducts();