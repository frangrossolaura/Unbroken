const apiUrl = "https://api.escuelajs.co/api/v1/products"; // URL de la API

function getProducts (containerSelector, productCount = 4){
    const container = document.querySelector(containerSelector);

    if (!container) return; 

    fetch(apiUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error('There are no products available');
        } else {
            return res.json();
        }
        })
    .then (data => {
        container.innerHTML = "";
        data.slice(0, productCount).forEach(product => {
            
            const productElement = document.createElement('div');
            productElement.classList.add('productos');

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const productImage = document.createElement('img');
            productImage.classList.add('producto-imagen');

            const imageUrl = product.images && product.images[0] 
            ? product.images[0] 
            : 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Imagen de remera random

            productImage.onload = () => {
            productImage.style.display = 'block';
            };

            productImage.onerror = () => {
            // Si la imagen falla, usamos la imagen de fallback de la remera
                productImage.src = 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Imagen de remera random
                productImage.style.display = 'block';
            };

            productImage.src = imageUrl;
            productImage.alt = product.title;
                    
            imageContainer.appendChild(productImage); // Agrego la imagen al div de imagen 

            productElement.appendChild(imageContainer); // Agrego el div de la imagen al div del producto 
            
            const namePrice = document.createElement('div'); // Div para el nombre y el precio 
            namePrice.classList.add('nombre-precio'); // Establezco la clase para ese div 

            namePrice.innerHTML = `
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
            `;

            const category = document.createElement('h5');
            category.innerText = product.category?.name;

            const buyButton = document.createElement('button');
            buyButton.classList.add('button-comprar');
            buyButton.innerText = 'Comprar';

            productElement.appendChild(namePrice);
            productElement.appendChild(category);
            productElement.appendChild(buyButton);

            container.appendChild(productElement);
        })   
    })
    .catch(error => console.error("Error fetching products:", error));
}

if (window.location.pathname.includes('index.html')) {
    getProducts('.contenedor-productos', 5);
} else if (window.location.pathname.includes('plp.html')) {
    getProducts('.contenedor-productos-plp', 25);
}
