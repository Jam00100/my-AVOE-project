// Product Detail

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

    } catch (error) {
        console.error(error);
        productDetail.innerHTML = `<h2>Failed to load product.</h2>`;
    }
}

// 執行
loadProduct();

// =====================================
// 建立商品詳細頁
// =====================================
function createProductDetail(product) {
    return `
        <div class="product-page">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="product-info">
                <p class="product-category">
                    ${product.category}
                </p>

                <h1> ${product.name}</h1>

                <p class="product-price">${product.price}</p>

                <div class="quantity-selector">
                    <button id="minus-btn">−</button>
                    <span id="quantity">1</span>
                    <button id="plus-btn">+</button>
                </div>

                <button class="add-cart-btn">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
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

		alert(`Added ${quantity} item(s) to cart.`);
	});
	// 初始化
	updateQuantity();
}

// Add to Cart function
// 接收「哪件商品」和「幾件」，然後放進購物車
function addToCart(product, quantity) {
	// 讀取local storage如果有資料就讀取，如果沒有就建立Array
	const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
	localStorage.setItem(
		"cart",
		JSON.stringify(cart)
	);

}