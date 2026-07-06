const productDetail = document.getElementById("product-detail");

async function loadProduct() {

	try {
		const params = new URLSearchParams(window.location.search);
		const id = Number(params.get("id"));

		const response = await fetch("./data/products.json");
		const products = await response.json();

		const product = products.find(item => item.id === id);

		if (!product) {
			productDetail.innerHTML = "<h2>Product not found.</h2>";
			return;
		}
		productDetail.innerHTML = createProductDetail(product);
	} catch (error) {
		console.error(error);
		productDetail.innerHTML = "<h2>Failed to load product.</h2>";
	}

}

loadProduct();

function createProductDetail(product) {
	return `
		<div class="product-page">
			<div class="product-image">
				<img src="${product.image}" alt="${product.name}">
			</div>

			<div class="product-info">
				<p class="product-category">${product.category}</p>
				<h1>${product.name}</h1>
				<p class="product-price">${product.price}</p>
			</div>
		</div>
	`;
}