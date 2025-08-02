// Simpan keranjang di localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Fungsi untuk menambah item ke keranjang
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    showCartNotification(product.name);
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCartItems();
}

// Fungsi untuk mengosongkan keranjang
function clearCart() {
    cart = [];
    saveCart();
    displayCartItems();
}

// Fungsi untuk mengubah jumlah item
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            displayCartItems();
        }
    }
}

// Fungsi untuk menampilkan item keranjang
function displayCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (!cartItemsList) return;
    
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="empty-cart">Keranjang belanja Anda kosong</div>';
        subtotalElement.textContent = 'Rp 0';
        shippingElement.textContent = 'Rp 0';
        totalElement.textContent = 'Rp 0';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="product-info">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.category}</p>
                </div>
            </div>
            <div class="product-price">Rp ${item.price.toLocaleString()}</div>
            <div class="product-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
            <div class="product-total">Rp ${itemTotal.toLocaleString()}</div>
            <div class="product-actions">
                <button class="remove-btn" onclick="removeFromCart('${item.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    });
    
    // Hitung ongkos kirim (contoh: flat rate 10% dari subtotal, maks 50rb)
    const shipping = Math.min(subtotal * 0.1, 50000);
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `Rp ${subtotal.toLocaleString()}`;
    shippingElement.textContent = `Rp ${shipping.toLocaleString()}`;
    totalElement.textContent = `Rp ${total.toLocaleString()}`;
}

// Fungsi untuk menampilkan notifikasi saat item ditambahkan
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <span>${productName} telah ditambahkan ke keranjang</span>
        <a href="cart.html">Lihat Keranjang</a>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Fungsi untuk memperbarui jumlah item di ikon keranjang
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartCount();
    
    // Event listener untuk tombol kosongkan keranjang
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // Event listener untuk tombol lanjut belanja
    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            window.location.href = 'products.html';
        });
    }
    
    // Event listener untuk tombol checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Keranjang belanja Anda kosong');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
});

// Ekspos fungsi ke global scope untuk digunakan di HTML
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.updateQuantity = updateQuantity;