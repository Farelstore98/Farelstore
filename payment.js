// Inisialisasi metode pembayaran
const paymentMethods = {transfer}
    dana: {085783241843
        name: "DANA",
        logo: "images/payments/dana.png",
        fee: 0
    },
    ovo: {085783241843
        name: "OVO",
        logo: "images/payments/ovo.png",
        fee: 0
    },
    shopeepay: {085783241843
        name: "ShopeePay",
        logo: "images/payments/shopeepay.png",
        fee: 0
    },
    gopay: {085783241843
        name: "GoPay",
        logo: "images/payments/gopay.png",
        fee: 0
    },
    transfer: {sedang di perbaiki
        name: "Transfer Bank",
        logo: "images/payments/bank.png",
        fee: 0
    }
};

// Fungsi untuk menampilkan pilihan pembayaran
function displayPaymentMethods() {
    const paymentContainer = document.getElementById('payment-methods');
    paymentContainer.innerHTML = '';
    
    for (const [key, method] of Object.entries(paymentMethods)) {
        const paymentOption = document.createElement('div');
        paymentOption.className = 'payment-option';
        paymentOption.innerHTML = `
            <input type="radio" id="${key}" name="payment" value="${key}">
            <label for="${key}">
                <img src="${method.logo}" alt="${method.name}">
                <span>${method.name}</span>
            </label>
        `;
        paymentContainer.appendChild(paymentOption);
    }
    
    // Set event listener untuk perubahan metode pembayaran
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updatePaymentDetails(this.value);
        });
    });
}

// Fungsi untuk memproses pembayaran
function processPayment() {
    const selectedMethod = document.querySelector('input[name="payment"]:checked')?.value;
    
    if (!selectedMethod) {
        alert('Silakan pilih metode pembayaran');
        return;
    }
    
    // Simulasikan proses pembayaran
    showLoading();
    
    // Dalam implementasi nyata, ini akan mengarahkan ke gateway pembayaran
    setTimeout(() => {
        hideLoading();
        window.location.href = 'payment-success.html';
    }, 2000);
}

// Tampilkan loading
function showLoading() {
    document.getElementById('payment-loading').style.display = 'block';
}

// Sembunyikan loading
function hideLoading() {
    document.getElementById('payment-loading').style.display = 'none';
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    displayPaymentMethods();
    
    // Event listener untuk tombol bayar
    document.getElementById('pay-now-btn').addEventListener('click', processPayment);
});