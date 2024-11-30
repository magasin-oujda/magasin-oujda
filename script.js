import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://jduurjuxxddqknktrohc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkdXVyanV4eGRkcWtua3Ryb2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5ODUxMDUsImV4cCI6MjA0ODU2MTEwNX0.lkW3IVjPolveNqiATaET5uYplCvK87SvRVLkeZUNp0M';
const supabase = createClient(supabaseUrl, supabaseKey);

document.querySelectorAll('.order-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productName = productElement.dataset.name;
        const productPrice = productElement.dataset.price;

        showOrderForm(productName, productPrice);
    });
});

function showOrderForm(productName, productPrice) {
    const formContainer = document.getElementById('order-form-container');
    formContainer.classList.remove('hidden');

    const submitButton = document.getElementById('submit-order');
    submitButton.onclick = async () => {
        const name = document.getElementById('customer-name').value;
        const address = document.getElementById('customer-address').value;
        const phone = document.getElementById('customer-phone').value;

        const { data, error } = await supabase.from('Pedidos').insert([{ name, address, phone, product: productName, price: productPrice }]);

        if (error) {
            console.error('Error al guardar el pedido:', error);
        } else {
            console.log('Pedido guardado:', data);
        }
        
        formContainer.classList.add('hidden');
    };

    document.getElementById('close-form').onclick = () => {
        formContainer.classList.add('hidden');
    };
}

document.getElementById('admin-button').onclick = async () => {
    const adminCode = document.getElementById('admin-code').value;

    if (adminCode === 'admin123') {
        const { data, error } = await supabase.from('Pedidos').select('*');

        if (error) {
            console.error('Error al obtener pedidos:', error);
        } else {
            console.log('Pedidos:', data);
            alert('Pedidos cargados. Mira la consola para más detalles.');
        }
    } else {
        alert('Código de administrador incorrecto.');
    }
};
