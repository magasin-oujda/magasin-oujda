// Cargar los pedidos almacenados en localStorage para la vista de administrador
function loadAdminOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tableBody = document.getElementById('adminOrdersTableBody');
    tableBody.innerHTML = '';  // Limpiar la tabla antes de agregar nuevas filas

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.product}</td>
            <td>${order.id}</td>
            <td>${order.quantity}</td>
            <td>${order.price}</td>
        `;
        tableBody.appendChild(row);
    });
}

window.onload = loadAdminOrders;  // Cargar los pedidos cuando se carga la página
