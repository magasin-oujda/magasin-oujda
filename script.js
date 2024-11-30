// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDIcrB1nI3lctqpc481hDxLY53sY_5Be1A",
    authDomain: "moha-cc05c.firebaseapp.com",
    projectId: "moha-cc05c",
    storageBucket: "moha-cc05c.firebasestorage.app",
    messagingSenderId: "821122162813",
    appId: "1:821122162813:web:6d85d457528fbc49439114"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para enviar el pedido a Firebase
async function submitOrder(event) {
    event.preventDefault();
    const order = {
        nombre: document.getElementById('name').value,
        direccion: document.getElementById('address').value,
        telefono: document.getElementById('phone').value,
        producto: document.getElementById('product').value
    };

    try {
        // Agregar el pedido a Firestore
        const docRef = await addDoc(collection(db, "Pedidos"), order);
        alert('Pedido realizado con éxito');
        document.getElementById('order-form').reset();
        document.getElementById('order-form').style.display = 'none';
    } catch (e) {
        console.error('Error al agregar el documento: ', e);
        alert('Hubo un error al realizar el pedido. Por favor, inténtalo de nuevo.');
    }
}

// Función para abrir el formulario de pedido
function openOrderForm(productName, productPrice) {
    document.getElementById('order-form').style.display = 'block';
    document.getElementById('product').value = `${productName} - ${productPrice}€`;
}

// Función para mostrar el formulario de administración
function showAdminForm() {
    document.getElementById('admin-form').style.display = 'block';
}

// Función para validar la contraseña de administración
function validateAdmin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin123') {
        showOrders();
    } else {
        alert('Contraseña incorrecta');
    }
}

// Función para mostrar los pedidos en la tabla
async function showOrders() {
    document.getElementById('order-table').style.display = 'block';
    const querySnapshot = await getDocs(collection(db, "Pedidos"));
    const ordersTable = document.getElementById('orders');
    ordersTable.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const order = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.nombre}</td>
            <td>${order.direccion}</td>
            <td>${order.telefono}</td>
            <td>${order.producto}</td>
        `;
        ordersTable.appendChild(row);
    });
}
