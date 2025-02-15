document.addEventListener("DOMContentLoaded", () => {
    const cartPanel = document.getElementById("cart-panel");
    const cartIcon = document.querySelector(".cart-icon");
    const cartCloseBtn = document.getElementById("cart-close-btn");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let cart = [];

    function toggleCart() {
        cartPanel.classList.toggle("show");
    }

    function closeCart() {
        cartPanel.classList.remove("show");
    }

    cartIcon.addEventListener("click", toggleCart);
    cartCloseBtn.addEventListener("click", closeCart);

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - 💲${item.price * item.quantity}</p>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})">➖</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">➕</button>
                </div>
                <button onclick="removeFromCart(${item.id})"style="margin-top: 20px;">❌ Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total;
        document.getElementById("cart-count").textContent = cart.length;
    }

    function increaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++;
        }
        updateCart();
    }

    function decreaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
        updateCart();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    function clearCart() {
        cart = [];
        updateCart();
    }

    window.addToCart = addToCart;
    window.increaseQuantity = increaseQuantity;
    window.decreaseQuantity = decreaseQuantity;
    window.removeFromCart = removeFromCart;
    window.clearCart = clearCart;
});

