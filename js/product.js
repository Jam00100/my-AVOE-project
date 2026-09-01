// Product Detail

// 從utils.js中import function
import {formatPrice, updateCartCount, getCart, saveCart, setupMobileMenu} from "./utils.js";

// 取得商品資訊顯示區域
const productDetail = document.getElementById("product-detail");

// 載入商品
async function loadProduct() {

    try {
        // 取得網址上的 id
        // 例如：product.html?id=2
        const params = new URLSearchParams(window.location.search);
        const id = Number(params.get("id"));

        // 讀取商品資料
        const response = await fetch("./data/products.json");
        const products = await response.json();

        // 找出對應商品
        const product = products.find(item => item.id === id);

        // 找不到商品
        if (!product) {
            productDetail.innerHTML = `<h2>Product Not Found</h2>`;
            return;
        }

        // 建立商品畫面
        productDetail.innerHTML = createProductDetail(product);

        // 建立按鈕
        setupQuantityButtons(product);
		// 建立商品圖片切換功能
		setupImageGallery(product);

    } catch (error) {
        console.error(error);
        productDetail.innerHTML = `<h2>Failed to load product.</h2>`;
    }
}

// 執行
loadProduct();
updateCartCount();
setupMobileMenu();

// =====================================
// 建立商品詳細頁
// =====================================
function createProductDetail(product) {
	const productImages =
		product.images && product.images.length > 0
			? product.images
			: [product.image];

	const thumbnailHTML = productImages
		.map((image, index) => {
			const isActive = index === 0;

			return `
				<button
					type="button"
					class="thumbnail-button${isActive ? " active" : ""}"
					data-image="${image}"
					aria-label="View ${product.name} image ${index + 1}"
					aria-pressed="${isActive}"
				>
					<img
						src="${image}"
						alt="${product.name} thumbnail ${index + 1}"
						loading="lazy"
					>
				</button>
			`;
		})
		.join("");

	return `
		<div class="product-page">
			<div class="product-image">
				<div class="main-image-wrapper">
					<img
						id="main-product-image"
						src="${productImages[0]}"
						alt="${product.name}"
					>
				</div>

				<div
					class="product-thumbnails"
					aria-label="${product.name} image gallery"
				>
					${thumbnailHTML}
				</div>
			</div>

			<div class="product-info">
				<p class="product-category">
					${product.category}
				</p>

				<h1>${product.name}</h1>

				<p class="product-price">
					${formatPrice(product.price)}
				</p>

				<div class="quantity-selector">
					<button
						id="minus-btn"
						type="button"
						aria-label="Decrease quantity"
					>
						−
					</button>

					<span id="quantity">1</span>

					<button
						id="plus-btn"
						type="button"
						aria-label="Increase quantity"
					>
						+
					</button>
				</div>

				<button
					class="add-cart-btn"
					type="button"
				>
					Add to Cart
				</button>
			</div>
		</div>
	`;
}

// =====================================
// 商品圖片 Gallery
// =====================================
function setupImageGallery(product) {
	const mainImage = document.getElementById(
		"main-product-image"
	);

	const thumbnailButtons = document.querySelectorAll(
		".thumbnail-button"
	);

	if (!mainImage || thumbnailButtons.length === 0) {
		return;
	}

	thumbnailButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			const selectedImage = button.dataset.image;

			mainImage.src = selectedImage;
			mainImage.alt =
				`${product.name} image ${index + 1}`;

			thumbnailButtons.forEach((thumbnail) => {
				thumbnail.classList.remove("active");
				thumbnail.setAttribute(
					"aria-pressed",
					"false"
				);
			});

			button.classList.add("active");
			button.setAttribute(
				"aria-pressed",
				"true"
			);
		});
	});
}

// 數量按鈕
// 這個功能指向product
function setupQuantityButtons(product) {

    // 商品數量
    let quantity = 1;

    // 取得 HTML 元素
    const quantityText = document.getElementById("quantity");
    const plusBtn = document.getElementById("plus-btn");
    const minusBtn = document.getElementById("minus-btn");
    const addCartBtn = document.querySelector(".add-cart-btn");

    // 更新畫面
    function updateQuantity() {
        quantityText.textContent = quantity;
        // 數量等於 1 時停用減號
        minusBtn.disabled = quantity === 1;
    }

    // 點 +
    plusBtn.addEventListener("click", () => {
        quantity++;
        updateQuantity();
    });

    // 點 -
    minusBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            updateQuantity();
        }
    });

    // 點加入購物車
    addCartBtn.addEventListener("click", () => {

		addToCart(product, quantity);

		updateCartCount();

		alert(`Added ${quantity} item(s) to cart.`);
	});
	// 初始化
	updateQuantity();
}

// Add to Cart function
// 接收「哪件商品」和「幾件」，然後放進購物車
function addToCart(product, quantity) {
	// 讀取local storage如果有資料就讀取，如果沒有就建立Array
	const cart = getCart();

	// 檢查商品是否已在購物車
	const existingProduct = cart.find(item => item.id === product.id);

	// 利用if else來更新購物車
    if (existingProduct) {

		existingProduct.quantity += quantity;
	} else {
		// 獲得商品資訊
		const cartItem = {
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			quantity: quantity
		};
		cart.push(cartItem);
	}

	// 更新購物車資料
	saveCart(cart);

}