// Importar las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded } from "firebase/database";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAviLwnV_eQ7yU6qP3cAbMTgx7G3sQBwDg",
  authDomain: "tienda-camisetas-bfaa6.firebaseapp.com",
  databaseURL: "https://tienda-camisetas-bfaa6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tienda-camisetas-bfaa6",
  storageBucket: "tienda-camisetas-bfaa6.firebasestorage.app",
  messagingSenderId: "287261715035",
  appId: "1:287261715035:web:784d4000cc211f72cc6d7e",
  measurementId: "G-VD308N9GE9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la referencia a la base de datos
const db = getDatabase(app);

// Referencia a la ruta de los pedidos
const ordersRef = ref(db, 'orders');

// Escuchar los nuevos pedidos
onChildAdded(ordersRef, (snapshot) => {
  const order = snapshot.val();
  
  // Crear una nueva fila en la tabla con los datos del pedido
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${order.name}</td>
    <td>${order.address}</td>
    <td>${order.phone}</td>
    <td>${order.product}</td>
  `;
  
  // Añadir la fila a la tabla
  document.querySelector("#order-table tbody").appendChild(row);
});
