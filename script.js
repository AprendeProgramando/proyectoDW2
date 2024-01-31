let cartItems = [];

    // Obtener el botón del carrito y el modal
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');

    // Función para abrir el modal al hacer clic en el botón del carrito
    cartButton.addEventListener('click', () => {
      updateCartDisplay(); // Actualizar la visualización del carrito antes de abrir el modal
      cartModal.style.display = 'block';
    });

    // Función para cerrar el modal al hacer clic en la "x" de cierre
    document.querySelector('.close').addEventListener('click', () => {
      cartModal.style.display = 'none';
    });

    // Función para cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', event => {
      if (event.target == cartModal) {
        cartModal.style.display = 'none';
      }
    });

    function addToCart(button, title, price) {
      // Verificar si el producto ya está en el carrito
      const existingItem = cartItems.find(item => item.title === title);
  
    if (existingItem) {
      existingItem.quantity++; // Incrementar la cantidad si el producto ya está en el carrito
    } else {
      cartItems.push({ title, price, quantity: 1 }); // Agregar el producto al carrito con cantidad 1
    }
    
      updateCartDisplay();
      updateCartCount(); // Llamar a la función para actualizar el número de productos en el carrito en la barra de navegación
    
      // Cambiar el texto y el color del botón y agregar la clase "added"
      button.textContent = 'Agregado';
    }

    function updateCartButton() {
      const addButton = document.getElementById('add-to-cart-button');
      addButton.textContent = 'Agregado';
      addButton.classList.remove('btn-primary');
      addButton.classList.add('btn-success');
    }

    function updateCartCount() {
      const cartCountElement = document.getElementById('cartCount');
      const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.textContent = totalCount;
    }

    function removeFromCart(title) {
      cartItems = cartItems.filter(item => item.title !== title);
      updateCartDisplay();
      updateCartCount(); // Llamar a la función para actualizar el número de productos en el carrito en la barra de navegación
    }


    // Función para actualizar la visualización del carrito
    function updateCartDisplay() {
      const cartItemsContainer = document.getElementById('cartItems');
      cartItemsContainer.innerHTML = ''; // Limpiar el contenido anterior

      let total = 0;

      cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
      <p>${item.title} --> $${item.price} = $${itemTotal}</p>
      <div class="quantity-controls">
        <button class="quantity-btn" onclick="decrementQuantity('${item.title}')">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn" onclick="incrementQuantity('${item.title}')">+</button>
      </div>
      <button class="remove" onclick="removeFromCart('${item.title}')">Remove</button>
    `;
        cartItemsContainer.appendChild(cartItemElement);
      });

      const cartTotalElement = document.getElementById('cartTotal');
      cartTotalElement.textContent = `$${total.toFixed(2)}`;

    }

    // Variables globales
let currentQuantity = 1; // Inicialmente, la cantidad es 1

// Obtener referencias a los elementos del DOM
const decrementButton = document.getElementById('decrementQuantity');
const incrementButton = document.getElementById('incrementQuantity');
const quantityElement = document.getElementById('quantity');
// const buyButton = document.getElementById('buyButton');

function incrementQuantity(title) {
  const item = cartItems.find(item => item.title === title);
  if (item) {
    item.quantity++;
    updateCartDisplay();
    updateCartCount();
  }
}

function decrementQuantity(title) {
  const item = cartItems.find(item => item.title === title);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCartDisplay();
    updateCartCount();
  }
}

incrementButton.addEventListener('click', () => {
  currentQuantity++;
  updateQuantityDisplay();
});

// Función para actualizar la visualización de la cantidad
function updateQuantityDisplay() {
  quantityElement.textContent = currentQuantity;
}