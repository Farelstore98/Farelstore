// Simpan data pengguna di localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Fungsi untuk registrasi pengguna baru
function registerUser(username, email, password) {
    // Validasi input
    if (!username || !email || !password) {
        return { success: false, message: 'Semua field harus diisi' };
    }
    
    if (password.length < 8) {
        return { success: false, message: 'Password minimal 8 karakter' };
    }
    
    // Cek apakah email sudah terdaftar
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        return { success: false, message: 'Email sudah terdaftar' };
    }
    
    // Cek apakah username sudah digunakan
    const usernameExists = users.some(user => user.username === username);
    if (usernameExists) {
        return { success: false, message: 'Username sudah digunakan' };
    }
    
    // Tambahkan pengguna baru
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // Dalam produksi, password harus di-hash
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Login pengguna setelah registrasi
    loginUser(email, password);
    
    return { success: true, message: 'Registrasi berhasil' };
}

// Fungsi untuk login pengguna
function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    
    if (!user) {
        return { success: false, message: 'Email atau password salah' };
    }
    
    // Simpan data pengguna yang login
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return { success: true, message: 'Login berhasil', user };
}

// Fungsi untuk logout
function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Fungsi untuk memeriksa apakah pengguna sudah login
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? user : null;
}

// Event listener untuk form registrasi
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.username.value.trim();
    const email = this.email.value.trim();
    const password = this.password.value;
    const confirmPassword = this['confirm-password'].value;
    
    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak sama');
        return;
    }
    
    const result = registerUser(username, email, password);
    
    if (result.success) {
        alert('Registrasi berhasil! Anda akan diarahkan ke halaman utama');
        window.location.href = '../index.html';
    } else {
        alert(result.message);
    }
});

// Event listener untuk form login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.email.value.trim();
    const password = this.password.value;
    
    const result = loginUser(email, password);
    
    if (result.success) {
        alert('Login berhasil!');
        window.location.href = '../index.html';
    } else {
        alert(result.message);
    }
});

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Periksa status login dan update UI
    const currentUser = checkAuth();
    const loginBtn = document.getElementById('login-btn');
    
    if (currentUser && loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.username}`;
        loginBtn.href = 'account/profile.html';
        
        // Tambahkan tombol logout jika diperlukan
    }
});