const apiUrl = "https://api.escuelajs.co/api/v1/products"; // URL de la API

function sortProducts(products, sortType) {
    let sortedProducts = [...products];

    switch(sortType) {
        case 'aToZ':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'zToA':
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'priceDesc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'priceAsc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
    }
    return sortedProducts;
}

function initializeFilters() {
    console.log('Inicializando filtros');
    const sortAtoZ = document.getElementById('sortAtoZ');
    const sortZtoA = document.getElementById('sortZtoA');
    const sortPriceDesc = document.getElementById('sortPriceDesc');
    const sortPriceAsc = document.getElementById('sortPriceAsc');

    const allCheckboxes = [sortAtoZ, sortZtoA, sortPriceDesc, sortPriceAsc];

    function handleCheckboxChange(event) {
        const checkbox = event.target;
        console.log('Checkbox cambiado:', checkbox.id);
        
        if (checkbox.checked) {
            allCheckboxes.forEach(cb => {
                if (cb && cb !== checkbox) cb.checked = false;
            });
            
            const container = document.querySelector('.contenedor-productos-plp');
            console.log('Productos actuales:', window.currentProducts);

            let sortedProducts = [...window.currentProducts];
            
            switch(checkbox.id) {
                case 'sortAtoZ':
                    sortedProducts = sortProducts(sortedProducts, 'aToZ');
                    break;
                case 'sortZtoA':
                    sortedProducts = sortProducts(sortedProducts, 'zToA');
                    break;
                case 'sortPriceDesc':
                    sortedProducts = sortProducts(sortedProducts, 'priceDesc');
                    break;
                case 'sortPriceAsc':
                    sortedProducts = sortProducts(sortedProducts, 'priceAsc');
                    break;
            }

            if (container && sortedProducts) {
                updateProductsDisplay(sortedProducts, container, 25);
            }
        }
    }

    allCheckboxes.forEach(checkbox => {
        if (checkbox) {
            checkbox.addEventListener('change', handleCheckboxChange);
        }
    });
}

function getProducts(containerSelector, productCount = 4) {
    console.log('Iniciando getProducts');
    console.log('Cantidad de productos solicitados:', productCount); // Debug
    const container = document.querySelector(containerSelector);

    if (!container) {
        console.log('Contenedor no encontrado');
        return;
    }

    fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error('There are no products available');
            }
            return res.json();
        })
        .then(data => {
            const clothesProducts = data.filter(product => product.category?.name === 'Clothes');
            window.currentProducts = clothesProducts;
            
            // Aplicamos el slice aquí para limitar la cantidad de productos
            const limitedProducts = clothesProducts.slice(0, productCount);
            console.log(`Mostrando ${limitedProducts.length} productos`); // Debug
            
            updateProductsDisplay(limitedProducts, container, productCount);
            
            // Solo inicializamos filtros en la página PLP
            if (window.location.pathname.includes('plp.html')) {
                initializeFilters();
            }
        })
        .catch(error => console.error("Error fetching products:", error));
}

// Función para actualizar la visualización de productos
function updateProductsDisplay(products, container, productCount) {
    container.innerHTML = "";
    
    products.slice(0, productCount).forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('productos');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const productImage = document.createElement('img');
        productImage.classList.add('producto-imagen');

        const imageUrl = product.images && product.images[0] 
            ? product.images[0] 
            : 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

        productImage.onload = () => {
            productImage.style.display = 'block';
        };

        productImage.onerror = () => {
            productImage.src = 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
            productImage.style.display = 'block';
        };

        productImage.src = imageUrl;
        productImage.alt = product.title;
            
        imageContainer.appendChild(productImage);
        productElement.appendChild(imageContainer);
        
        const namePrice = document.createElement('div');
        namePrice.classList.add('nombre-precio');

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
    });
}

// Inicialización según la página
if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    getProducts('.contenedor-productos', 5);
} else if (window.location.pathname.includes('plp.html')) {
    getProducts('.contenedor-productos-plp', 25);
}

