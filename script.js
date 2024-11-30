// Variables globales
const orderButtons = document.querySelectorAll('.order-button');
const orderFormContainer = document.getElementById('order-form-container');
const submitOrderButton = document.getElementById('submit-order');
const closeFormButton = document.getElementById('close-form');
const orderTable = document.getElementById('order-table').querySelector('tbody');
const orderTableSection = document.getElementById('order-table-section');
const adminAccessButton = document.getElementById('admin-access-button');

// Datos del producto seleccionado
let selectedProduct = {};

// Función para cargar pedidos desde localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach((order, index) => addOrderToTable(order, index));
}

// Función para agregar un pedido a la tabla
function addOrderToTable(order, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.name}</td>
        <td>${order.address}</td>
        <td>${order.phone}</td>
        <td>${order.product}</td>
        <td><button class="delete-order" data-index="${index}">حذف</button></td>
    `;
    orderTable.appendChild(row);

    // Añadir evento para eliminar pedido
    row.querySelector('.delete-order').addEventListener('click', (event) => {
        const orderIndex = event.target.dataset.index;
        deleteOrder(orderIndex);
    });
}

// Guardar pedido en localStorage
function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Eliminar pedido de localStorage y la tabla
function deleteOrder(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrderTable();
}

// Renderizar tabla completa desde localStorage
function renderOrderTable() {
    orderTable.innerHTML = ''; // Limpiar la tabla
    loadOrders(); // Volver a cargar los pedidos
}

// Abrir el formulario
orderButtons.forEach(button => {
    button.addEventListener('click', event => {
        const product = event.target.closest('.product');
        selectedProduct.name = product.dataset.name;
        selectedProduct.price = product.dataset.price;
        orderFormContainer.classList.remove('hidden');
    });
});

// Cerrar el formulario
closeFormButton.addEventListener('click', () => {
    orderFormContainer.classList.add('hidden');
});

// Enviar pedido
submitOrderButton.addEventListener('click', () => {
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const phone = document.getElementById('customer-phone').value;

    if (name && address && phone) {
        const order = {
            name,
            address,
            phone,
            product: `${selectedProduct.name} - ${selectedProduct.price} درهم`
        };

        // Agregar a la tabla
        addOrderToTable(order, JSON.parse(localStorage.getItem('orders') || '[]').length);

        // Guardar en localStorage
        saveOrder(order);

        // Enviar mensaje a WhatsApp
        const whatsappMessage = `مرحباً، أنا ${name}. أريد شراء ${selectedProduct.name} بسعر ${selectedProduct.price} درهم. عنواني: ${address}. رقم هاتفي: ${phone}.`;
        const whatsappUrl = `https://wa.me/212762944411?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // Cerrar formulario
        orderFormContainer.classList.add('hidden');
    } else {
        alert('يرجى إدخال جميع البيانات');
    }
});

// Mostrar tabla para administrador al hacer clic en el botón
adminAccessButton.addEventListener('click', () => {
    const password = prompt('أدخل كلمة السر لعرض الطلبات:');
    if (password === 'admin123') { // Cambia "admin123" por tu contraseña.
        orderTableSection.classList.remove('hidden');
        alert('تم منحك الوصول كمسؤول');
    } else {
        alert('كلمة السر غير صحيحة');
    }
});

// Cargar pedidos al cargar la página
document.addEventListener('DOMContentLoaded', renderOrderTable);
