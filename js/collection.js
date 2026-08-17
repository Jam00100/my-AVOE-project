const collectionGrid =
	document.getElementById("collection-grid");

const searchInput =
	document.getElementById("search-input");

const filterButtons =
	document.querySelectorAll(".filter-btn");


let products = [];

let selectedCategory = "All";


// =============================
// Load Products
// =============================

async function loadProducts() {

	try {

		const response =
			await fetch("./data/products.json");

		products =
			await response.json();

		renderProducts(products);

	} catch (error) {

		console.error(
			"Failed to load products:",
			error
		);

		collectionGrid.innerHTML = `
			<p>Failed to load products.</p>
		`;

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


	let html = "";


	productList.forEach(product => {

		html +=
			createProductCard(product);

	});


	collectionGrid.innerHTML = html;

}


// =============================
// Filters
// =============================

function applyFilters() {

	const keyword =
		searchInput.value
			.trim()
			.toLowerCase();


	const filteredProducts =
		products.filter(product => {

			const matchesSearch =

				product.name
					.toLowerCase()
					.includes(keyword)

				||

				product.category
					.toLowerCase()
					.includes(keyword);


			const matchesCategory =

				selectedCategory === "All"

				||

				product.category === selectedCategory;


			return (
				matchesSearch &&
				matchesCategory
			);

		});


	renderProducts(filteredProducts);

}


// Search
searchInput.addEventListener(
	"input",
	applyFilters
);


// Category
filterButtons.forEach(button => {

	button.addEventListener("click", () => {

		selectedCategory =
			button.dataset.category;


		filterButtons.forEach(btn => {

			btn.classList.remove("active");

		});


		button.classList.add("active");


		applyFilters();

	});

});


// =============================
// Price
// =============================

function formatPrice(price) {

	return `NTD $${price.toLocaleString("zh-TW")}`;

}


// =============================
// Cart Count
// =============================

function updateCartCount() {

	const cart =
		JSON.parse(
			localStorage.getItem("cart")
		) || [];


	const cartCount =
		document.getElementById("cart-count");


	let totalQuantity = 0;


	cart.forEach(item => {

		totalQuantity +=
			item.quantity;

	});


	cartCount.textContent =
		totalQuantity;

}


// =============================
// Start
// =============================

loadProducts();

updateCartCount();