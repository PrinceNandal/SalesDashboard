document.addEventListener('DOMContentLoaded', function () {
    const priceInput = document.getElementById('product-price');
    const quantityInput = document.getElementById('product-quantity');
    const revenueInput = document.getElementById('product-revenue');

    // Calculate revenue when price or quantity changes
    function calculateRevenue() {
        const price = parseFloat(priceInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const revenue = price * quantity;
        revenueInput.value = revenue.toFixed(2); // Display revenue with 2 decimal places
    }

    // Add event listeners to price and quantity inputs
    priceInput.addEventListener('input', calculateRevenue);
    quantityInput.addEventListener('input', calculateRevenue);

    // Add product to localStorage on form submission
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        const productName = document.getElementById('product-name').value.trim();
        const productDescription = document.getElementById('product-description').value.trim();
        const productPrice = parseFloat(priceInput.value);
        const productQuantity = parseInt(quantityInput.value);
        const productRevenue = parseFloat(revenueInput.value);
        
        // Retrieve the product category
        const productCategory = document.getElementById('product-category').value; // Fix

        // Validate input before proceeding
        if (!productName || !productDescription || isNaN(productPrice) || isNaN(productQuantity) || !productCategory) {
            alert('Please fill out all fields correctly.');
            return;
        }

        // Create the product object
        const newProduct = {
            name: productName,
            description: productDescription,
            price: productPrice,
            quantity: productQuantity,
            revenue: productRevenue,
            category: productCategory // Now it's defined
        };

        // Save the product to localStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        // Reset the form after submission
        this.reset();
        revenueInput.value = ''; // Clear the calculated revenue
        alert('Product added successfully!');
    });
});
