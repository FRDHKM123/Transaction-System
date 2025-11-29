console.log("app.js is running...");

// =========================
// Variabel Global
// =========================
let generatedOTP = null;
let otpExpiredTime = null;
let otpTimer = null;

// =========================
// Fungsi Generate OTP
// =========================
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// =========================
// Fungsi Timer OTP
// =========================
function startOTPTimer() {

    // Hentikan timer sebelumnya jika ada
    if (otpTimer) {
        clearInterval(otpTimer);
    }

    otpTimer = setInterval(() => {
        const sisaWaktu = otpExpiredTime - Date.now();

        if (sisaWaktu <= 0) {
            clearInterval(otpTimer);
            generatedOTP = null;

            document.getElementById("otpInfo").innerText =
                "OTP telah kedaluwarsa!";
            return;
        }

        const detik = Math.floor(sisaWaktu / 1000);

        document.getElementById("otpInfo").innerText =
            "OTP Anda: " + generatedOTP + " (sisa " + detik + " detik)";

    }, 1000);
}


// =========================
// EVENT: Generate OTP
// =========================
btnGenerate.addEventListener("click", function () {
    const saldo = parseInt(document.getElementById("saldo").value);
    const nominal = parseInt(document.getElementById("nominal").value);

    // Validasi input kosong
    if (isNaN(saldo) || isNaN(nominal)) {
        alert("Isi saldo dan nominal terlebih dahulu!");
        return;
    }

    // Cek saldo
    if (saldo < nominal) {
        document.getElementById("otpInfo").innerText =
            "Saldo tidak mencukupi! OTP TIDAK dapat dibuat.";
        return;
    }

    // Generate OTP
    generatedOTP = generateOTP();

    // Set waktu kedaluwarsa (30 detik)
    otpExpiredTime = Date.now() + 30000;

    // Tampilkan OTP
    document.getElementById("otpInfo").innerText =
        "OTP Anda: " + generatedOTP + " (valid 30 detik)";

    // Mulai countdown
    startOTPTimer();
});


// =========================
// EVENT: Verifikasi OTP
// =========================
btnVerify.addEventListener("click", function () {
    const userOtp = parseInt(document.getElementById("inputOtp").value);

    if (!generatedOTP) {
        document.getElementById("hasil").innerText =
            "OTP tidak valid atau sudah kedaluwarsa.";
        return;
    }

    // Cek expired
    if (Date.now() > otpExpiredTime) {
        generatedOTP = null;
        document.getElementById("hasil").innerText =
            "OTP sudah kedaluwarsa!";
        return;
    }

    // Cek kecocokan OTP
    if (userOtp === generatedOTP) {
        document.getElementById("hasil").innerText =
            "Transaksi berhasil diverifikasi!";
    } else {
        document.getElementById("hasil").innerText =
            "OTP salah!";
    }
});
