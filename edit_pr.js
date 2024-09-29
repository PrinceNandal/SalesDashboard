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
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productQuantity').value = product.quantity;

        // Set the selected category in the dropdown
        const categoryDropdown = document.getElementById('productCategory');
        categoryDropdown.value = product.category; // Ensure the dropdown matches the product's category

        // Fallback in case the category doesn't match
        if (!Array.from(categoryDropdown.options).some(option => option.value === product.category)) {
            console.error('Category does not match available options:', product.category);
        }
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

    // Redirect back to products page
    window.location.href = 'products.html'; // Redirect to products page
});
