document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the amount entered by the user
    const amount = document.getElementById('amount').value;

    // Validate amount input
    if (isNaN(amount) || Number(amount) <= 0) {
        alert("⚠️ Please enter a valid amount.");
        return;
    }

    // Construct the UPI URL
    const upiID = "siddharthdeshmukh24@fam"; // Owner's UPI ID
    const payeeName = "NexForge";
    const transactionNote = "Payment to NexForge";
    const upiURL = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(payeeName)}&tn=${encodeURIComponent(transactionNote)}&am=${amount}&cu=INR`;

    // Generate and display the QR code
    const qrCanvas = document.getElementById('qrCanvas');
    QRCode.toCanvas(qrCanvas, upiURL, { width: 200 }, function(error) {
        if (error) {
            console.error("Error generating QR code:", error);
            alert("Error generating QR code. Please try again.");
        } else {
            // Show the download button
            document.getElementById('downloadButton').style.display = 'block';
        }
    });
});

// Download QR code as an image
document.getElementById('downloadButton').addEventListener('click', function() {
    const qrCanvas = document.getElementById('qrCanvas');
    const image = qrCanvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'upi-qr-code.png';
    link.click();
});
