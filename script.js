// Variables globales
const orderButtons = document.querySelectorAll('.order-button');
const orderFormContainer = document.getElementById('order-form-container');
const orderForm = document.getElementById('order-form');
const submitOrderButton = document.getElementById('submit-order');
const closeFormButton = document.getElementById('close-form');
const orderTable = document.getElementById('order-table').querySelector('tbody');
const orderTableSection = document.getElementById('order-table-section');
const adminAccessButton = document.getElementById('admin-access-button');

// Datos del producto seleccionado
let selectedProduct = {};

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
        // Agregar a la tabla (oculta para el cliente)
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${address}</td>
            <td>${phone}</td>
            <td>${selectedProduct.name} - ${selectedProduct.price} درهم</td>
        `;
        orderTable.appendChild(row);

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
