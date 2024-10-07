
let products = [];
let cart = [];


async function addProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        
        const data = await response.json();

      
        products = data;

        
        populateProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function populateProducts() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; 

    
    products.forEach(product => {
        
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productContainer.appendChild(productDiv);
    });
}


function addToCart(productId) {
   
    const product = products.find(p => p.id === productId);

    
    const existingProduct = cart.find(p => p.id === productId);

    if (existingProduct) {
       
        existingProduct.quantity += 1;
    } else {
        
        cart.push({ ...product, quantity: 1 });
    }

    
    updateCartUI();
}


function deleteProductFromCart(productId) {
   
    cart = cart.filter(product => product.id !== productId);

    
    updateCartUI();
}


function increaseProductQuantity(productId) {
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity += 1;
        updateCartUI(); 
    }
}


function reduceProductQuantity(productId) {
    const product = cart.find(p => p.id === productId);
    if (product) {
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            
            deleteProductFromCart(productId);
        }
        updateCartUI(); 
    }
}


function editProductInCart(productId, newQuantity) {
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity = newQuantity;
        updateCartUI(); 
    }
}


function updateCartUI() {
    const cartContainer = document.getElementById('cartContainer');

    
    cartContainer.innerHTML = '<h2 id="cart__header">My Cart</h2>';

    if (cart.length === 0) {
        
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty__message');
        emptyMessage.innerText = 'No Items Available in the Cart';
        cartContainer.appendChild(emptyMessage);
    } else {
        
        cart.forEach((product, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <button onclick="increaseProductQuantity(${product.id})">+</button>
                <button onclick="reduceProductQuantity(${product.id})">-</button>
                <button onclick="deleteProductFromCart(${product.id})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
    }
}


addProducts();