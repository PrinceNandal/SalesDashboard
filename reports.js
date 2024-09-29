document.addEventListener('DOMContentLoaded', function () {
    // Retrieve product data from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log(products); // Check if products data is retrieved correctly

    // Calculate Top Selling Products
    const topSellingProducts = products
        .map(product => ({
            name: product.name,
            sales: product.revenue || 0 // Using revenue as sales data
        }))
        .sort((a, b) => b.sales - a.sales) // Sort by sales (revenue) in descending order
        .slice(0, 5); // Get the top 5 products

    // Create Top Selling Products Data
    const topSellingProductsData = {
        labels: topSellingProducts.map(product => product.name),
        datasets: [{
            label: 'Sales',
            data: topSellingProducts.map(product => product.sales),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    // Calculate Sales by Product Category
    const salesByCategoryMap = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = 0; // Initialize if not present
        }
        acc[product.category] += product.revenue; // Use revenue for category sales
        return acc;
    }, {});

    console.log(salesByCategoryMap); // Check the contents of the salesByCategoryMap

    // Create Sales by Product Category Data
    const salesByCategoryData = {
        labels: Object.keys(salesByCategoryMap),
        datasets: [{
            label: 'Sales by Category',
            data: Object.values(salesByCategoryMap),
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    console.log(salesByCategoryData); // Check if salesByCategoryData is populated correctly

    // Create Top Selling Products Chart
    const topSellingProductsCtx = document.getElementById('topSellingProductsChart').getContext('2d');
    new Chart(topSellingProductsCtx, {
        type: 'bar',
        data: topSellingProductsData,
        options: {
            responsive: true,
            maintainAspectRatio: false, // Added for better responsiveness
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Create Sales by Product Category Chart
    const salesByCategoryCtx = document.getElementById('salesByCategoryChart').getContext('2d');
    new Chart(salesByCategoryCtx, {
        type: 'doughnut',
        data: salesByCategoryData,
        options: {
            responsive: true,
            maintainAspectRatio: false, // This allows the chart to fit the container's size
            plugins: {
                legend: {
                    display: true,
                    position: 'top' // Place the legend at the top to ensure it doesn’t crowd the chart
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            }
        }
    });
    

    // For Product Sales Trends Chart (Example Data)
    const productSalesTrendsData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Sales',
            data: [5000, 7000, 8000, 10000, 9000, 12000], // Example data, replace with actual product sales trends
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            fill: true
        }]
    };

    // Create Product Sales Trends Chart
    const productSalesTrendsCtx = document.getElementById('productSalesTrendsChart').getContext('2d');
    new Chart(productSalesTrendsCtx, {
        type: 'line',
        data: productSalesTrendsData,
        options: {
            responsive: true,
            maintainAspectRatio: false, // Added for better responsiveness
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
