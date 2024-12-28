// const apiUrl = "https://api.escuelajs.co/api/v1/products"; // URL de la API

// // Función para obtener productos de la API

// function getProducts() {
//     fetch(apiUrl)
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error('There are no products available');
//             } else {
//                 return res.json();
//             }
//         })
//         .then(data => {
//             if (data && Array.isArray(data)) {

//                 const productsContainer = document.querySelector('.contenedor-productos'); 

//                 // Creo una constante donde js va a mandar los productos (sirve como lugar a donde apuntar), esta va a ser productsContainer
//                 // Esta constante utiliza document.queryselector(.productos) para buscar en mi html un elemnto 
//                 // con esa clase, ahi va a mandar los productos/va contener a las tarjetas de los productos 

//                 // Solo va a mostrar los primeros 4 productos (el 4 no cuenta)
 
//                 data.slice(12, 17).forEach(product => { // Uso un for each, para cada producto de ese slice...

//                     // Estructura para el div del producto, de la imagen y la imagen 

//                     // Creo un elemento js que va a ser el div para cada producto y le agrego la clase producto

                    // const productElement = document.createElement('div');
                    // productElement.classList.add('productos');

//                     // Creo un elemento js que va a ser el div para la imagen del producto y le agregro la clase 

                    // const imageContainer = document.createElement('div');
                    // imageContainer.classList.add('image-container');
                    
//                     // Creo un elemento js que va a ser la imagen y le agrego la clase 

                    // const productImage = document.createElement('img');
                    // productImage.classList.add('producto-imagen');
                    
//                     // Validar la URL de la imagen antes de asignarla al elemento js de la imagen (el que está arriba)

                    // const imageUrl = product.images && product.images[0] 
                    // ? product.images[0] 
                    // : 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Imagen de remera random


                    // productImage.onload = () => {
                    // productImage.style.display = 'block';
                    // };

                    // productImage.onerror = () => {
                    //     // Si la imagen falla, usamos la imagen de fallback de la remera
                    //     productImage.src = 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Imagen de remera random
                    //     productImage.style.display = 'block';
                    // };
                    

                    // Aca asigno la imagen (la validad o la de feedback) al src del elemento productimage que tenia al elemento img 
                    // productImage.src = imageUrl;
                    // productImage.alt = product.title;
                    
                    // imageContainer.appendChild(productImage); // Agrego la imagen al div de imagen 

                    // productElement.appendChild(imageContainer); // Agrego el div de la imagen al div del producto 

//                     // ---------------------------
//                     // Estructura para el nombre, precio y categoria del producto 

                    // const namePrice = document.createElement('div'); // Div para el nombre y el precio 
                    // namePrice.classList.add('nombre-precio'); // Establezco la clase para ese div 

//                     // Directamente creo los elementos html y como contenido les asigno el titulo y el precio de product!! 
                    // namePrice.innerHTML = `
                    //     <h3>${product.title}</h3>
                    //     <h4>$${product.price}</h4>
                    // `;

//                     // Aca creo que la constante para la categoria, creo el elemento html h5 y se lo asigno 
//                     // Le asigno a esa constante que tiene el h5 la categoria del producto 
                    // const category = document.createElement('h5');
                    // category.innerText = product.category.name;

//                     // Aca creo la constante del button, creo el elemento, le añado la clase y el texto propiamente 
                    // const buyButton = document.createElement('button');
                    // buyButton.classList.add('button-comprar');
                    // buyButton.innerText = 'Comprar';

//                     // Agrego TODO lo anterior al div del producto
                    // productElement.appendChild(namePrice);
                    // productElement.appendChild(category);
                    // productElement.appendChild(buyButton);

//                     // El div del producto (productElement) ya tiene la imagen, el nombre/precio, categoria y el botón

//                     // Finalmente, agrego el producto (productElement) al contenedor principal
                //     productsContainer.appendChild(productElement);
                // });
//             } else {
//                 console.log('No products found or incorrect API response');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching products:', error);
//         });
// }

// // Llamo a la función para obtener los productos cuando la página cargue
// window.onload = getProducts;


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

if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    getProducts('.contenedor-productos', 5);
} else if (window.location.pathname.includes('plp.html')) {
    const plpContainer = document.querySelector('.contenedor-productos-plp');
    getProducts('.contenedor-productos-plp', 25);
} else {
    console.log('Ruta actual:', window.location.pathname);
}

// Agregar verificación de contenedores
document.addEventListener('DOMContentLoaded', () => {
    const indexContainer = document.querySelector('.contenedor-productos');
    const plpContainer = document.querySelector('.contenedor-productos-plp');
});
