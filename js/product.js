// Product Detail

// 從 utils.js 中 import function
import {
	formatPrice,
	updateCartCount,
	getCart,
	saveCart,
	setupMobileMenu
} from "./utils.js";

// 取得商品資訊顯示區域
const productDetail =
	document.getElementById("product-detail");


// =====================================
// 載入商品
// =====================================

async function loadProduct() {
	try {
		// 取得網址上的 id
		// 例如：product.html?id=2
		const params =
			new URLSearchParams(
				window.location.search
			);

		const id =
			Number(params.get("id"));

		// 讀取商品資料
		const response =
			await fetch("./data/products.json");

		if (!response.ok) {
			throw new Error(
				"Failed to load products."
			);
		}

		const products =
			await response.json();

		// 找出對應商品
		const product =
			products.find(
				(item) => item.id === id
			);

		// 找不到商品
		if (!product) {
			productDetail.innerHTML = `
				<h2>Product Not Found</h2>
			`;

			return;
		}

		// 建立商品畫面
		productDetail.innerHTML =
			createProductDetail(product);

		// 建立商品圖片切換功能
		setupImageGallery(product);

		// 建立尺寸與顏色選擇功能
		setupProductOptions();

		// 建立數量按鈕與加入購物車功能
		setupQuantityButtons(product);

	} catch (error) {
		console.error(error);

		productDetail.innerHTML = `
			<h2>Failed to load product.</h2>
		`;
	}
}


// =====================================
// 建立商品詳細頁
// =====================================

function createProductDetail(product) {
	const productImages =
		product.images &&
		product.images.length > 0
			? product.images
			: [product.image];

	const productSizes =
		product.sizes &&
		product.sizes.length > 0
			? product.sizes
			: [];

	const productColors =
		product.colors &&
		product.colors.length > 0
			? product.colors
			: [];


	// 建立商品縮圖
	const thumbnailHTML = productImages
		.map((image, index) => {
			const isActive =
				index === 0;

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


	// 建立尺寸按鈕
	const sizeOptionsHTML = productSizes
		.map((size) => {
			return `
				<button
					type="button"
					class="size-option"
					data-size="${size}"
					aria-pressed="false"
				>
					${size}
				</button>
			`;
		})
		.join("");


	// 建立顏色按鈕
	const colorOptionsHTML = productColors
		.map((color) => {
			return `
				<button
					type="button"
					class="color-option"
					data-color="${color.name}"
					aria-label="Select ${color.name}"
					aria-pressed="false"
				>
					<span
						class="color-swatch"
						style="background-color: ${color.value};"
					></span>

					<span class="color-name">
						${color.name}
					</span>
				</button>
			`;
		})
		.join("");


	// 商品有尺寸時才建立尺寸區域
	const sizeSectionHTML =
		productSizes.length > 0
			? `
				<div class="product-option-group">

					<p class="option-label">
						Size
					</p>

					<div class="size-options">
						${sizeOptionsHTML}
					</div>

				</div>
			`
			: "";


	// 商品有顏色時才建立顏色區域
	const colorSectionHTML =
		productColors.length > 0
			? `
				<div class="product-option-group">

					<p class="option-label">
						Color
					</p>

					<div class="color-options">
						${colorOptionsHTML}
					</div>

				</div>
			`
			: "";


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

				<h1>
					${product.name}
				</h1>

				<p class="product-price">
					${formatPrice(product.price)}
				</p>


				<div class="product-options">

					${sizeSectionHTML}

					${colorSectionHTML}

					<p
						id="option-error"
						class="option-error"
						aria-live="polite"
					></p>

				</div>


				<div class="quantity-selector">

					<button
						id="minus-btn"
						type="button"
						aria-label="Decrease quantity"
					>
						−
					</button>

					<span id="quantity">
						1
					</span>

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
	const mainImage =
		document.getElementById(
			"main-product-image"
		);

	const thumbnailButtons =
		document.querySelectorAll(
			".thumbnail-button"
		);

	if (
		!mainImage ||
		thumbnailButtons.length === 0
	) {
		return;
	}

	thumbnailButtons.forEach(
		(button, index) => {
			button.addEventListener(
				"click",
				() => {
					const selectedImage =
						button.dataset.image;

					mainImage.src =
						selectedImage;

					mainImage.alt =
						`${product.name} image ${index + 1}`;

					thumbnailButtons.forEach(
						(thumbnail) => {
							thumbnail.classList.remove(
								"active"
							);

							thumbnail.setAttribute(
								"aria-pressed",
								"false"
							);
						}
					);

					button.classList.add(
						"active"
					);

					button.setAttribute(
						"aria-pressed",
						"true"
					);
				}
			);
		}
	);
}


// =====================================
// 尺寸與顏色選擇
// =====================================

function setupProductOptions() {
	const sizeButtons =
		document.querySelectorAll(
			".size-option"
		);

	const colorButtons =
		document.querySelectorAll(
			".color-option"
		);

	const optionError =
		document.getElementById(
			"option-error"
		);


	// 尺寸選擇
	sizeButtons.forEach((button) => {
		button.addEventListener("click", () => {
			sizeButtons.forEach(
				(sizeButton) => {
					sizeButton.classList.remove(
						"active"
					);

					sizeButton.setAttribute(
						"aria-pressed",
						"false"
					);
				}
			);

			button.classList.add("active");

			button.setAttribute(
				"aria-pressed",
				"true"
			);

			if (optionError) {
				optionError.textContent = "";
			}
		});
	});


	// 顏色選擇
	colorButtons.forEach((button) => {
		button.addEventListener("click", () => {
			colorButtons.forEach(
				(colorButton) => {
					colorButton.classList.remove(
						"active"
					);

					colorButton.setAttribute(
						"aria-pressed",
						"false"
					);
				}
			);

			button.classList.add("active");

			button.setAttribute(
				"aria-pressed",
				"true"
			);

			if (optionError) {
				optionError.textContent = "";
			}
		});
	});
}


// =====================================
// 數量按鈕與加入購物車
// =====================================

function setupQuantityButtons(product) {
	// 商品數量
	let quantity = 1;

	// 取得 HTML 元素
	const quantityText =
		document.getElementById("quantity");

	const plusBtn =
		document.getElementById("plus-btn");

	const minusBtn =
		document.getElementById("minus-btn");

	const addCartBtn =
		document.querySelector(
			".add-cart-btn"
		);

	const optionError =
		document.getElementById(
			"option-error"
		);


	// 更新畫面
	function updateQuantity() {
		quantityText.textContent =
			quantity;

		// 數量等於 1 時停用減號
		minusBtn.disabled =
			quantity === 1;
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
	addCartBtn.addEventListener(
		"click",
		() => {
			const selectedSizeButton =
				document.querySelector(
					".size-option.active"
				);

			const selectedColorButton =
				document.querySelector(
					".color-option.active"
				);

			const hasSizes =
				product.sizes &&
				product.sizes.length > 0;

			const hasColors =
				product.colors &&
				product.colors.length > 0;


			// 尚未選擇尺寸
			if (
				hasSizes &&
				!selectedSizeButton
			) {
				optionError.textContent =
					"Please select a size.";

				return;
			}


			// 尚未選擇顏色
			if (
				hasColors &&
				!selectedColorButton
			) {
				optionError.textContent =
					"Please select a color.";

				return;
			}


			const selectedSize =
				selectedSizeButton
					? selectedSizeButton.dataset.size
					: null;

			const selectedColor =
				selectedColorButton
					? selectedColorButton.dataset.color
					: null;


			optionError.textContent = "";


			addToCart(
				product,
				quantity,
				selectedSize,
				selectedColor
			);


			updateCartCount();


			alert(
				`Added ${quantity} item(s) to cart.`
			);
		}
	);


	// 初始化
	updateQuantity();
}


// =====================================
// Add to Cart
// =====================================

// 接收商品、數量、尺寸和顏色
function addToCart(
	product,
	quantity,
	selectedSize,
	selectedColor
) {
	// 讀取 localStorage
	const cart = getCart();

	// 相同商品、尺寸、顏色才視為同一品項
	const existingProduct =
		cart.find((item) => {
			return (
				item.id === product.id &&
				item.size === selectedSize &&
				item.color === selectedColor
			);
		});

	if (existingProduct) {
		existingProduct.quantity +=
			quantity;

	} else {
		const cartItem = {
			id: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			size: selectedSize,
			color: selectedColor,
			quantity: quantity
		};

		cart.push(cartItem);
	}

	// 更新購物車資料
	saveCart(cart);
}


// =====================================
// 執行
// =====================================

loadProduct();
updateCartCount();
setupMobileMenu();