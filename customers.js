document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchCustomer');
    const statusFilter = document.getElementById('customerStatus');
    const customerList = document.getElementById('customer-list');

    // Sample customer data with year-based sales
    const customers = [
        { name: 'John Doe', email: 'john@example.com', purchases: 15000, status: 'active', yearSales: [3000, 5000, 7000, 4000] },
        { name: 'Jane Smith', email: 'jane@example.com', purchases: 12500, status: 'pending', yearSales: [2000, 3000, 5000, 2500] },
        { name: 'Michael Brown', email: 'michael@example.com', purchases: 9000, status: 'inactive', yearSales: [1000, 4000, 3000, 1500] },
        { name: 'Lisa White', email: 'lisa@example.com', purchases: 12000, status: 'active', yearSales: [4000, 6000, 7000, 3000] },
        { name: 'David Black', email: 'david@example.com', purchases: 11000, status: 'pending', yearSales: [2000, 3000, 4000, 2500] }
    ];

    // Function to render customers
    function renderCustomers(filterText = '', filterStatus = '') {
        customerList.innerHTML = ''; // Clear existing list

        customers
            .filter(customer => {
                const matchesText = customer.name.toLowerCase().includes(filterText.toLowerCase()) ||
                    customer.email.toLowerCase().includes(filterText.toLowerCase());
                const matchesStatus = !filterStatus || customer.status === filterStatus;
                return matchesText && matchesStatus;
            })
            .forEach(customer => {
                const customerCard = document.createElement('div');
                customerCard.classList.add('bg-gray-100', 'p-6', 'rounded-lg', 'shadow-md', 'hover-card', 'transition', 'duration-300', 'ease-in-out');

                customerCard.innerHTML = `
                    <div class="flex items-center mb-4">
                        <img src="https://static.vecteezy.com/system/resources/previews/009/397/835/non_2x/man-avatar-clipart-illustration-free-png.png" alt="Customer Avatar" class="w-16 h-16 rounded-full customer-avatar">
                        <div class="ml-4">
                            <h2 class="text-xl font-bold">${customer.name}</h2>
                            <p class="text-gray-600">${customer.email}</p>
                        </div>
                    </div>
                    <p class="text-gray-700 mb-2">Total Purchases: $${customer.purchases}</p>
                    <p class="text-gray-700">Status: <span class="font-bold text-green-600">${customer.status}</span></p>

                    <!-- Year-Based Sales Data Section -->
                    <div class="mt-4">
                        <h3 class="text-lg font-bold mb-2">Sales by Year</h3>
                        <canvas id="salesByYearChart${customer.name.replace(' ', '')}" class="h-32"></canvas>
                    </div>
                `;
                customerList.appendChild(customerCard);

                // Render the year-based sales chart for this customer
                renderYearSalesChart(customer.yearSales, `salesByYearChart${customer.name.replace(' ', '')}`);
            });
    }

    // Function to render the sales by year chart
    function renderYearSalesChart(yearSales, canvasId) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Sales',
                    data: yearSales,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Event listeners for search and status filters
    searchInput.addEventListener('input', () => {
        const filterText = searchInput.value;
        const filterStatus = statusFilter.value;
        renderCustomers(filterText, filterStatus);
    });

    statusFilter.addEventListener('change', () => {
        const filterText = searchInput.value;
        const filterStatus = statusFilter.value;
        renderCustomers(filterText, filterStatus);
    });

    // Initial render of all customers
    renderCustomers();
});
