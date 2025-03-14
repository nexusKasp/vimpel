// Product data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
        description: "Новейший iPhone с профессиональной системой камер"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 899,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
        description: "Продвинутый флагман Android с функциями искусственного интеллекта"
    },
    {
        id: 3,
        name: "Google Pixel 8",
        price: 799,
        image: "https://www.dgl.ru/wp-content/uploads/2023/10/google-pixel-8-pro_review_1-1.webp",
        description: "Чистый опыт Android с потрясающей камерой"
    },
    {
        id: 4,
        name: "OnePlus 12",
        price: 699,
        image: "https://i.guim.co.uk/img/media/57828dad13e775fd65c7880d8e3be52c0414236d/54_344_5310_3187/master/5310.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=c720e0c8779a1ef3ad2d16aa95dc3a06",
        description: "Быстрая зарядка и плавная работа"
    },
    {
        id: 5,
        name: "Xiaomi 14 Pro",
        price: 749,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Kpvfpv7L874pOsk068dH726Xgr2n8EJ_3g&s",
        description: "Многофункциональный флагман по выгодной цене"
    },
    {
        id: 6,
        name: "iPhone 15",
        price: 799,
        image: "https://stores-apple.com/upload/iblock/39b/fimzgippwlggiqqh69cd9mrpvkn5q3b2.jpg",
        description: "Идеальный iPhone для всех"
    },
    {
        id: 7,
        name: "Samsung Galaxy A54",
        price: 449,
        image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3",
        description: "Превосходство среднего класса с великолепными характеристиками"
    },
    {
        id: 8,
        name: "Google Pixel 7a",
        price: 499,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5WXuwzAYfXidk0em-y-Yz4U-CyxTdTSYvOw&s",
        description: "Лучший телефон среднего класса от Google по доступной цене"
    },
    {
        id: 9,
        name: "Nothing Phone 2",
        price: 599,
        image: "https://click-or-die.ru/app/uploads/2023/12/izobrazhenie_2023-12-30_025335600.jpg",
        description: "Уникальный дизайн с великолепной производительностью"
    },
    {
        id: 10,
        name: "Motorola Edge 40",
        price: 599,
        image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e",
        description: "Премиум функции по средней цене"
    },
    {
        id: 11,
        name: "Huawei Mate XT",
        price: 839,
        image: "https://design-glory.com/content/images/size/w2000/2024/09/HUAWEI-Mate-XT-Ultimate-Design--1024x561.jpg",
        description: "Новинка с качественным экраном и произодительным процессором"
    },
    {
        id: 12,
        name: "Galaxy Z Fold 6",
        price: 599,
        image: "https://apple-nova.ru/files/blog_block_gallery/Zfold_0.jpg",
        description: "Два смартфона в одном!"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');
const productsGrid = document.querySelector('.products-grid');
const checkoutBtn = document.querySelector('.checkout-btn');
const closeCartBtn = document.querySelector('.close-cart');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.toggle('active');
});
closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    В корзину
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}">
            <div class="cart-item-info">
                <h4>${item.product.name}</h4>
                <p>$${item.product.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.product.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.product.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        </div>
    `).join('');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    totalAmount.textContent = `$${total}`;

    saveCart(); 
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.product.id !== productId);
    } else {
        const cartItem = cart.find(item => item.product.id === productId);
        if (cartItem) cartItem.quantity = newQuantity;
    }

    updateCart();
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }

    alert('Благодарим Вас за покупку!');
    cart = [];
    updateCart();
    cartSidebar.classList.remove('active');
});

renderProducts();
updateCart(); 