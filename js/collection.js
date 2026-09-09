import {formatPrice, updateCartCount, setupMobileMenu} from "./utils.js";

const collectionGrid =
	document.getElementById("collection-grid");

const searchInput =
	document.getElementById("search-input");

const filterButtons =
	document.querySelectorAll(".filter-btn");

const sortSelect =
	document.getElementById("sort-select");

const collectionStatus =
	document.getElementById("collection-status");

let products = [];
let selectedCategory = "All";


// =============================
// Load Products
// =============================

async function loadProducts() {
	try {
		const response =
			await fetch("./data/products.json");

		if (!response.ok) {
			throw new Error(
				"Failed to load products."
			);
		}

		products = await response.json();

		applyFilters();

	} catch (error) {
		console.error(
			"Failed to load products:",
			error
		);

		collectionGrid.innerHTML = `
			<p class="no-products">
				Failed to load products.
			</p>
		`;

		collectionStatus.textContent =
			"Unable to load products.";
	}
}


// =============================
// Product Card
// =============================

function createProductCard(product) {
	return `
		<div class="product-card">

			<a href="./product.html?id=${product.id}">
				<img
					src="${product.image}"
					alt="${product.name}"
				>
			</a>

			<p class="product-category">
				${product.category}
			</p>

			<h2 class="product-title">
				${product.name}
			</h2>

			<p class="product-price">
				${formatPrice(product.price)}
			</p>

		</div>
	`;
}


// =============================
// Render Products
// =============================

function renderProducts(productList) {
	if (productList.length === 0) {
		collectionGrid.innerHTML = `
			<p class="no-products">
				No products found.
			</p>
		`;

		return;
	}

	collectionGrid.innerHTML = productList
		.map(createProductCard)
		.join("");
}


// =============================
// Update Product Count
// =============================

function updateCollectionStatus(productCount) {
	if (productCount === 0) {
		collectionStatus.textContent =
			"No products found.";

		return;
	}

	const productLabel =
		productCount === 1
			? "product"
			: "products";

	collectionStatus.textContent =
		`${productCount} ${productLabel}`;
}


// =============================
// Sort Products
// =============================

function sortProducts(productList) {
	const sortedProducts = [...productList];

	switch (sortSelect.value) {
		case "price-low-high":
			sortedProducts.sort(
				(a, b) => a.price - b.price
			);
			break;

		case "price-high-low":
			sortedProducts.sort(
				(a, b) => b.price - a.price
			);
			break;

		case "name-a-z":
			sortedProducts.sort(
				(a, b) =>
					a.name.localeCompare(b.name)
			);
			break;

		default:
			break;
	}

	return sortedProducts;
}


// =============================
// Update Collection URL
// =============================

function updateCollectionURL(keyword) {
	const url =
		new URL(window.location.href);

	if (keyword === "") {
		url.searchParams.delete("query");
	} else {
		url.searchParams.set(
			"query",
			keyword
		);
	}

	if (selectedCategory === "All") {
		url.searchParams.delete("category");
	} else {
		url.searchParams.set(
			"category",
			selectedCategory
		);
	}

	if (sortSelect.value === "default") {
		url.searchParams.delete("sort");
	} else {
		url.searchParams.set(
			"sort",
			sortSelect.value
		);
	}

	window.history.replaceState(
		{},
		"",
		url
	);
}


// =============================
// Restore Controls From URL
// =============================

function restoreControlsFromURL() {
	const searchParams =
		new URLSearchParams(
			window.location.search
		);

	const initialKeyword =
		searchParams.get("query") ?? "";

	const initialCategory =
		searchParams.get("category") ?? "All";

	const initialSort =
		searchParams.get("sort") ?? "default";

	searchInput.value = initialKeyword;

	const categoryExists =
		Array.from(filterButtons).some(
			(button) =>
				button.dataset.category ===
				initialCategory
		);

	selectedCategory =
		categoryExists
			? initialCategory
			: "All";

	filterButtons.forEach((button) => {
		const isActive =
			button.dataset.category ===
			selectedCategory;

		button.classList.toggle(
			"active",
			isActive
		);
	});

	const sortExists =
		Array.from(sortSelect.options).some(
			(option) =>
				option.value === initialSort
		);

	sortSelect.value =
		sortExists
			? initialSort
			: "default";
}


// =============================
// Apply Filters and Sorting
// =============================

function applyFilters() {
	const rawKeyword =
		searchInput.value.trim();

	const keyword =
		rawKeyword.toLowerCase();

	updateCollectionURL(rawKeyword);

	const filteredProducts =
		products.filter((product) => {
			const matchesSearch =
				product.name
					.toLowerCase()
					.includes(keyword) ||
				product.category
					.toLowerCase()
					.includes(keyword);

			const matchesCategory =
				selectedCategory === "All" ||
				product.category === selectedCategory;

			return (
				matchesSearch &&
				matchesCategory
			);
		});

	const sortedProducts =
		sortProducts(filteredProducts);

	renderProducts(sortedProducts);

	updateCollectionStatus(
		sortedProducts.length
	);
}


// =============================
// Search Event
// =============================

searchInput.addEventListener(
	"input",
	applyFilters
);


// =============================
// Category Events
// =============================

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		selectedCategory =
			button.dataset.category;

		filterButtons.forEach(
			(filterButton) => {
				filterButton.classList.remove(
					"active"
				);
			}
		);

		button.classList.add("active");

		applyFilters();
	});
});


// =============================
// Sort Event
// =============================

sortSelect.addEventListener(
	"change",
	applyFilters
);


// =============================
// Start
// =============================

restoreControlsFromURL();
loadProducts();
updateCartCount();
setupMobileMenu();