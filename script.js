document.addEventListener("DOMContentLoaded", function() {
    // Mostrar el formulario de pedido cuando se hace clic en "اطلب الآن"
    const orderButtons = document.querySelectorAll('.order-button');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = button.parentElement.dataset.name; // Obtener el nombre del producto
            showOrderForm(productName);
        });
    });

    // Mostrar el formulario de pedido
    function showOrderForm(productName) {
        const formContainer = document.getElementById("order-form-container");
        const productNameField = document.getElementById("product-name");
        productNameField.value = productName;
        formContainer.classList.remove("hidden");
    }

    // Cerrar el formulario
    const closeButton = document.getElementById("close-form");
    closeButton.addEventListener("click", function() {
        document.getElementById("order-form-container").classList.add("hidden");
    });

    // Enviar el formulario
    const orderForm = document.getElementById("order-form");
    orderForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("customer-name").value;
        const address = document.getElementById("customer-address").value;
        const phone = document.getElementById("customer-phone").value;
        const productName = document.getElementById("product-name").value; // Obtener el nombre del producto

        // Enviar los datos a Firebase
        submitOrderToFirebase(name, address, phone, productName);

        // Cerrar el formulario después de enviarlo
        document.getElementById("order-form-container").classList.add("hidden");
    });

    // Función para enviar el pedido a Firebase
    function submitOrderToFirebase(name, address, phone, productName) {
        const db = firebase.database();
        const ordersRef = db.ref('orders');
        const newOrderRef = ordersRef.push(); // Crear un nuevo pedido

        newOrderRef.set({
            name: name,
            address: address,
            phone: phone,
            product: productName
        }).then(() => {
            alert("تم إرسال الطلب بنجاح!");
        }).catch(error => {
            alert("حدث خطأ عند إرسال الطلب");
        });
    }
});
