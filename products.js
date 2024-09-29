document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
});

// Function to load products from localStorage with an optional search filter
function loadProducts(searchQuery = "") {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productsTableBody = document.getElementById("productsTableBody");
  productsTableBody.innerHTML = ""; // Clear existing rows

  // Filter products based on the search query (case-insensitive)
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredProducts.forEach((product, index) => {
    const row = document.createElement("tr");
    row.className = "border-b";

    row.innerHTML = `
      <td class="py-4 text-center">${product.name}</td>
      <td class="py-4 text-center">${product.category}</td>
      <td class="py-4 text-center">$${parseFloat(product.price).toFixed(2)}</td>
      <td class="py-4 text-center">${product.quantity}</td>
      <td class="py-4 text-center">
        <button class="text-blue-500 hover:text-blue-700 hover:scale-110 transition transform duration-300 mr-4" onclick="editProduct(${index})">
          <i class="fas fa-pen"></i> <!-- Edit outline icon -->
        </button>
        <button class="text-red-500 hover:text-red-700 hover:scale-110 transition transform duration-300" onclick="deleteProduct(${index})">
          <i class="fas fa-trash-alt"></i> <!-- Delete outline icon -->
        </button>
      </td>
    `;

    productsTableBody.appendChild(row);
  });
}

// Function to search products based on input
function searchProducts() {
  const searchInput = document.getElementById("searchInput").value;
  loadProducts(searchInput); // Reload products based on search query
}

// Function to edit a product
function editProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[index];
  // Redirect to the edit form with product index
  window.location.href = `edit_product.html?index=${index}`;
}

// Function to delete a product
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1); // Remove the product from the array
  localStorage.setItem("products", JSON.stringify(products)); // Update localStorage
  loadProducts(); // Reload the products list
}
