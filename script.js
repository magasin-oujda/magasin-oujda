document.addEventListener("DOMContentLoaded", function() {
    // Mostrar el formulario de login cuando el admin hace clic en el botón
    const adminButton = document.getElementById("admin-access-button");
    adminButton.addEventListener("click", function() {
        let adminCode = prompt("من فضلك أدخل رمز المدير:");
        if (adminCode === "admin123") { // El código de administrador correcto
            window.location.href = "admin.html"; // Redirigir al área de pedidos
        } else {
            alert("رمز المدير غير صحيح");
        }
    });
});
