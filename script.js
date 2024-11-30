document.addEventListener("DOMContentLoaded", () => {
    const orderFormContainer = document.getElementById("order-form-container");
    const submitOrderButton = document.getElementById("submit-order");
    const closeFormButton = document.getElementById("close-form");
    const adminAccessButton = document.getElementById("admin-access-button");

    let selectedProduct = null;

    // Show order form when a product is clicked
    document.querySelectorAll(".order-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product");
            selectedProduct = {
                name: productElement.getAttribute("data-name"),
                price: productElement.getAttribute("data-price")
            };
            orderFormContainer.classList.remove("hidden");
        });
    });

    // Close the order form
    closeFormButton.addEventListener("click", () => {
        orderFormContainer.classList.add("hidden");
    });

    // Submit the order and save it to local storage
    submitOrderButton.addEventListener("click", () => {
        const name = document.getElementById("customer-name").value;
        const address = document.getElementById("customer-address").value;
        const phone = document.getElementById("customer-phone").value;

        if (name && address && phone && selectedProduct) {
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push({ name, address, phone, product: selectedProduct });
            localStorage.setItem("orders", JSON.stringify(orders));

            alert("تم إرسال الطلب بنجاح!");
            orderFormContainer.classList.add("hidden");
        } else {
            alert("يرجى ملء جميع الحقول.");
        }
    });

    // Show orders for admin
    adminAccessButton.addEventListener("click", () => {
        const password = prompt("يرجى إدخال كلمة المرور:");
        if (password === "admin123") {
            const orders = JSON.parse(localStorage.getItem("orders")) || [];
            if (orders.length === 0) {
                alert("لا توجد طلبات.");
                return;
            }

            let tableContent = "<table><tr><th>الاسم</th><th>العنوان</th><th>رقم الهاتف</th><th>المنتج</th></tr>";
            orders.forEach(order => {
                tableContent += `<tr><td>${order.name}</td><td>${order.address}</td><td>${order.phone}</td><td>${order.product.name} - ${order.product.price} درهم</td></tr>`;
            });
            tableContent += "</table>";

            const newWindow = window.open();
            newWindow.document.write("<html><head><title>طلبات</title></head><body>");
            newWindow.document.write("<h2>الطلبات</h2>");
            newWindow.document.write(tableContent);
            newWindow.document.write("</body></html>");
        } else {
            alert("كلمة المرور غير صحيحة.");
        }
    });
});
