let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  renderCart();
}

function updateQuantity(name, amount) {
  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.qty += amount;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }
  saveCart();
  renderCart();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';

  if (cart.length === 0) {
    cartDiv.innerHTML = '<p>Cart is empty.</p>';
    return;
  }

  cart.forEach(item => {
    cartDiv.innerHTML += `
      <div class="cart-item">
        ${item.name} - ₹${item.price}<br>
        <button onclick="updateQuantity('${item.name}', -1)">-</button>
        ${item.qty}
        <button onclick="updateQuantity('${item.name}', 1)">+</button>
        <button onclick="removeFromCart('${item.name}')">Remove</button>
      </div>
    `;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartDiv.innerHTML += `<strong>Total: ₹${total}</strong>`;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

renderCart();