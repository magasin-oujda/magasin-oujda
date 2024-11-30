function openOrderForm(product, price) {
    document.getElementById('order-form').style.display = 'block';
    document.getElementById('product').value = product;
    document.getElementById('price').value = price;
}

function submitOrder(event) {
    event.preventDefault();
    const order = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        product: document.getElementById('product').value,
        price: document.getElementById('price').value
    };
    saveOrder(order);
    document.getElementById('order-form').reset();
    document.getElementById('order-form').style.display = 'none';
}

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function showAdminForm() {
    document.getElementById('admin-form').style.display = 'block';
}

function validateAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin123') {
        showOrders();
    } else {
        alert('Contraseña incorrecta');
    }
}

function showOrders() {
    document.getElementById('order-table').style.display = 'block';
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersTable = document.getElementById('orders');
    ordersTable.innerHTML = '';
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.address}</td>
            <td>${order.phone}</td>
            <td>${order.product}</td>
            <td>${order.price}</td>
        `;
        ordersTable.appendChild(row);
    });
}
