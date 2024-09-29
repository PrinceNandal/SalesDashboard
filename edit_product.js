document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index'); // Get the index from the URL
    loadProductData(index);
});

// Function to load product data for editing
function loadProductData(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    // Populate the form fields with the product data
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productQuantity').value = product.quantity;
    }
}

// Handle form submission to update the product
document.getElementById('editProductForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');

    const updatedProduct = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        quantity: parseInt(document.getElementById('productQuantity').value),
        revenue: parseFloat(document.getElementById('productPrice').value) * parseInt(document.getElementById('productQuantity').value) // Calculate revenue
    };

    // Update the product in localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products[index] = updatedProduct; // Replace the old product with the updated one
    localStorage.setItem('products', JSON.stringify(products)); // Save to localStorage

    // Redirect back to products page or give feedback
    window.location.href = 'products.html'; // Redirect to products page
});
