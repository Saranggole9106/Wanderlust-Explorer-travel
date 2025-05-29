// Cart functionality
let cart = [];
let total = 0;

// Page navigation with smooth transitions
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Enhanced cart functionality
function addToCart(item, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.item === item);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total = existingItem.quantity * existingItem.price;
    } else {
        cart.push({
            item,
            price,
            quantity: 1,
            total: price
        });
    }
    
    total = cart.reduce((sum, item) => sum + item.total, 0);
    updateCart();
    alert(`${item} added to cart!`);
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    cart.forEach(cartItem => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${cartItem.item} - ₹${cartItem.price} x ${cartItem.quantity} = ₹${cartItem.total}
            <button onclick="removeFromCart('${cartItem.item}')" style="margin-left: 10px; color: red;">×</button>
        `;
        cartItems.appendChild(li);
    });
    
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function removeFromCart(item) {
    cart = cart.filter(cartItem => cartItem.item !== item);
    total = cart.reduce((sum, item) => sum + item.total, 0);
    updateCart();
}

function updateCartBadge() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartLink = document.querySelector('a[onclick="showPage(\'cart\')"]');
    
    if (cartCount > 0) {
        cartLink.innerHTML = `Cart (${cartCount})`;
    } else {
        cartLink.innerHTML = 'Cart';
    }
}

// Enhanced order placement
function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const billItems = document.getElementById('billItems');
    billItems.innerHTML = '';
    
    cart.forEach(cartItem => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.item} - ₹${cartItem.price} x ${cartItem.quantity} = ₹${cartItem.total}`;
        billItems.appendChild(li);
    });
    
    document.getElementById('billTotal').textContent = total.toFixed(2);
    document.getElementById('bill').style.display = 'block';
    
    alert('Order placed successfully!');
    cart = [];
    total = 0;
    updateCart();
}

// Enhanced wheel spinning
function spinWheel() {
    const wheel = document.getElementById('wheel');
    const randomDegree = Math.floor(Math.random() * 360 + 720);
    wheel.style.transform = `rotate(${randomDegree}deg)`;
    
    setTimeout(() => {
        const specialDish = getSpecialDish(randomDegree % 360);
        document.getElementById('specialDish').textContent = `Special Dish: ${specialDish}`;
    }, 4000);
}

function getSpecialDish(degree) {
    if (degree < 60) return "Paneer Tikka";
    else if (degree < 120) return "Butter Chicken";
    else if (degree < 180) return "Samosa";
    else if (degree < 240) return "Dal Makhani";
    else if (degree < 300) return "Gulab Jamun";
    else return "Rogan Josh";
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form validation
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Reservation made successfully!');
    this.reset();
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    updateCart();
});
