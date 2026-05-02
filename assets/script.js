const WHATSAPP_NUMBER = "263000000000"; // Replace with your Zvakho WhatsApp number, e.g. 263771234567

const cart = new Map();

const money = (n) => `$${n.toFixed(0)}`;

function updateCartUI() {
  const count = [...cart.values()].reduce((sum, item) => sum + item.qty, 0);
  const total = [...cart.values()].reduce((sum, item) => sum + item.qty * item.price, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = money(total);

  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  if (cart.size === 0) {
    cartItems.innerHTML = `<p class="cart-note">Your cart is empty.</p>`;
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <strong>${item.name}</strong>
      <span>${money(item.price)} × ${item.qty} = ${money(item.price * item.qty)}</span>
      <div class="cart-item-actions">
        <button type="button" data-action="minus" data-id="${item.id}">−</button>
        <span>${item.qty}</span>
        <button type="button" data-action="plus" data-id="${item.id}">+</button>
        <button type="button" data-action="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItems.appendChild(row);
  });
}

function addToCart(product) {
  const existing = cart.get(product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.set(product.id, { ...product, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function buildWhatsAppMessage() {
  if (cart.size === 0) {
    return "Hello Zvakho, I would like to ask about the Victoria Falls collection.";
  }

  const lines = [];
  lines.push("Hello Zvakho, I would like to order from the Victoria Falls store:");
  lines.push("");

  let total = 0;
  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    lines.push(`- ${item.name} x${item.qty} — $${lineTotal}`);
  });

  lines.push("");
  lines.push(`Order Total: $${total}`);
  lines.push("");
  lines.push("Please assist me with payment and delivery.");

  return lines.join("\n");
}

function checkout() {
  const message = encodeURIComponent(buildWhatsAppMessage());
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    addToCart({
      id: card.dataset.id,
      name: card.dataset.name,
      price: Number(card.dataset.price)
    });
  });
});

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("checkoutButton").addEventListener("click", checkout);
document.getElementById("drawerCheckout").addEventListener("click", checkout);

document.getElementById("cartItems").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const id = button.dataset.id;
  const item = cart.get(id);
  if (!item) return;

  if (button.dataset.action === "plus") item.qty += 1;
  if (button.dataset.action === "minus") item.qty = Math.max(1, item.qty - 1);
  if (button.dataset.action === "remove") cart.delete(id);

  updateCartUI();
});

document.getElementById("cartDrawer").addEventListener("click", (event) => {
  if (event.target.id === "cartDrawer") closeCart();
});

updateCartUI();
