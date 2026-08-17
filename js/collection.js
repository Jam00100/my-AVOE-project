const collectionGrid = document.getElementById("collection-grid");

const searchInput = document.getElementById("search-input");

const filterButtons = document.querySelectorAll(".filter-btn");


let products = [];

async function loadProducts() {
	try {

		const response =
			await fetch("./data/products.json");

		products =
			await response.json();

		console.log(products);

	} catch (error) {

		console.error(
			"Failed to load products:",
			error
		);
	}
}

loadProducts();