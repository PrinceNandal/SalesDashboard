document.addEventListener('DOMContentLoaded', function() {
    loadRecentProducts();
    loadSalesTrends();
    loadTopProducts();
    loadKeyMetrics()
});

// Function to load recent products into the recent products table
function loadRecentProducts() {
    const recentProductsTableBody = document.getElementById('recentProductsTableBody');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Clear existing rows
    recentProductsTableBody.innerHTML = '';

    // Display only the first 5 products
    const displayedProducts = products.slice(0, 5);
    
    displayedProducts.forEach(product => {
        const row = document.createElement('tr');

        // Ensure revenue is defined, if not calculate it from price * quantity
        const productRevenue = (product.revenue !== undefined) ? product.revenue : (product.price * product.quantity);

        row.innerHTML = `
            <td class="py-3 px-6">${product.name}</td>
            <td class="py-3 px-6">${product.category}</td>
            <td class="py-3 px-6">$${parseFloat(product.price).toFixed(2)}</td>
            <td class="py-3 px-6">${product.quantity}</td>
            <td class="py-3 px-6">$${parseFloat(productRevenue).toFixed(2)}</td>
        `;
        recentProductsTableBody.appendChild(row);
    });

    // Show "Show More" button if there are more than 5 products
    const showMoreContainer = document.getElementById('showMoreContainer');
    if (products.length > 5) {
        showMoreContainer.classList.remove('hidden'); // Show the button
    } else {
        showMoreContainer.classList.add('hidden'); // Hide the button
    }
}

// Load recent products on page load
window.onload = loadRecentProducts;


// Function to load top products into the Top Products section
function loadTopProducts() {
    const topProductsList = document.getElementById('topProductsTableBody');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Calculate Top Selling Products based on Revenue
    const topProducts = products
        .map(product => ({
            name: product.name,
            quantity: product.quantity || 0, // Get quantity
            revenue: product.revenue || (product.price * product.quantity), // Calculate revenue if not defined
            category: product.category
        }))
        .sort((a, b) => b.revenue - a.revenue) // Sort by revenue in descending order
        .slice(0, 5); // Get the top 5 products

    // Clear existing product rows
    topProductsList.innerHTML = '';

    // Add product rows to the Top Products table
    topProducts.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'border-b';
        row.innerHTML = `
            <td class="p-2">${product.name}</td>
            <td class="p-2">${product.category}</td>
            <td class="p-2">${product.quantity}</td> <!-- Display Quantity -->
            <td class="p-2">$${parseFloat(product.revenue).toFixed(2)}</td> <!-- Display Revenue -->
        `;
        topProductsList.appendChild(row);
    });
}

// Function to load sales trends
function loadSalesTrends() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Prepare data for the chart
    const productNames = products.map(product => product.name);
    const revenues = products.map(product => product.revenue || (product.price * product.quantity));

    // Create the chart
    const ctx = document.getElementById('salesTrendsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Use bar chart to display revenue per product
        data: {
            labels: productNames, // Product names for x-axis
            datasets: [{
                label: 'Revenue',
                data: revenues, // Revenue data for y-axis
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
                borderColor: 'rgba(54, 162, 235, 1)', // Border color
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Revenue ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Products'
                    }
                }
            }
        }
    });
}
function loadKeyMetrics() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Calculate Total Revenue, Total Products, and Quantities Sold
    const totalRevenue = products.reduce((acc, product) => acc + (product.revenue || (product.price * product.quantity)), 0);
    const totalProducts = products.length;
    const totalQuantitiesSold = products.reduce((acc, product) => acc + (product.quantity || 0), 0);
    const totalCustomers = 120; // Assuming a static number for customers, update as necessary

    // Update the HTML of existing cards
    document.querySelector('.bg-gradient-to-r.from-green-400').querySelector('p').innerText = `${totalProducts}`;
    document.querySelector('.bg-gradient-to-r.from-yellow-400').querySelector('p').innerText = `${totalCustomers}`;
    document.querySelector('.bg-gradient-to-r.from-indigo-400').querySelector('p').innerText = `${totalQuantitiesSold}`;
    document.querySelector('.bg-gradient-to-r.from-pink-400').querySelector('p').innerText = `$${totalRevenue.toFixed(2)}`;
}
// Load recent products, top products, and sales trends on page load
window.onload = function() {
    loadRecentProducts();
    loadTopProducts();
    loadSalesTrends();
    loadKeyMetrics()
};
