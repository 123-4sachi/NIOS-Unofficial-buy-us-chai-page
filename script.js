


let selectedAmount = 0;

// Your UPI Configuration (just change this config if we want to change the payment account)
const UPI_CONFIG = {
    upiId: 'niosstudentcommunity@kotak', // Replace with your UPI ID (if we want to change in future)
    merchantName: 'NIOS Unofficial', // Replace with your name
    transactionNote: 'Buy us a chai'
};

// Handle preset amount buttons
document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove selected class from all buttons
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
        
        // Add selected class to clicked button
        this.classList.add('selected');
        
        // Set selected amount
        selectedAmount = parseInt(this.dataset.amount);
        
        // Clear custom input
        document.getElementById('customAmount').value = '';
        
        // Enable donate button
        document.getElementById('donateBtn').disabled = false;
    });
});

// Handle custom amount input
document.getElementById('customAmount').addEventListener('input', function() {
    const value = parseInt(this.value);
    
    if (value && value > 0) {
        selectedAmount = value;
        
        // Remove selected class from preset buttons
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
        
        // Enable donate button
        document.getElementById('donateBtn').disabled = false;
    } else {
        selectedAmount = 0;
        document.getElementById('donateBtn').disabled = true;
    }
});

// Handle donate button click
document.getElementById('donateBtn').addEventListener('click', function() {
    if (selectedAmount > 0) {
        generatePaymentDetails();
    }
});

function generatePaymentDetails() {
    // Update amount display
    document.getElementById('selectedAmount').textContent = selectedAmount;
    
    // Show payment info
    document.getElementById('paymentInfo').style.display = 'block';
    
    // Generate QR code (using a simple text-based QR for demo)
    generateQRCode();
    
    // Show QR code
    document.getElementById('qrCode').style.display = 'block';
    
    // Scroll to QR section
    document.getElementById('qrCode').scrollIntoView({ behavior: 'smooth', block: 'center' });
}



// QR code game from generation to how to put it, to tracking to more

function generateQRCode() {
    const qrContainer = document.getElementById('qrCode');
    
    // Clear previous QR code
    qrContainer.innerHTML = '';
    
    // Create UPI payment URL with tracking
    const transactionId = generateTransactionId();
    const upiUrl = `upi://pay?pa=${UPI_CONFIG.upiId}&pn=${encodeURIComponent(UPI_CONFIG.merchantName)}&am=${selectedAmount}&cu=INR&tn=${encodeURIComponent(UPI_CONFIG.transactionNote + ' - ID:' + transactionId)}`;
    
    try {
        // Create QR code using qrcode-generator library
        const qr = qrcode(0, 'M');
        qr.addData(upiUrl);
        qr.make();
        
        // Create the QR code as an image
        const qrImage = qr.createImgTag(4, 8);
        qrContainer.innerHTML = qrImage;
        
        // Style the generated image
        const img = qrContainer.querySelector('img');
        if (img) {
            img.style.width = '180px';
            img.style.height = '180px';
            img.style.border = 'none';
        }
        
        // Store transaction for tracking
        storeTransaction(transactionId, selectedAmount);
        console.log('QR Code generated successfully');
        
    } catch (error) {
        console.error('QR Code generation failed:', error);
        



        // Enhanced fallback with clickable UPI link
        qrContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #333; border: 2px dashed #ccc; border-radius: 10px;">
                <div style="font-size: 48px; margin-bottom: 10px;">📱</div>
                <div style="font-size: 16px; margin-bottom: 15px;">Click to Pay via UPI</div>
                <a href="${upiUrl}" style="
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 25px;
                    text-decoration: none;
                    font-weight: 600;
                    display: inline-block;
                    margin-bottom: 10px;
                ">Pay ₹${selectedAmount}</a>
                <div style="font-size: 14px; color: #666; margin-top: 10px;">
                    Or copy UPI ID: <strong>${UPI_CONFIG.upiId}</strong>
                </div>
            </div>
        `;
    }
}



//  (real shit )Generate unique transaction ID for tracking
function generateTransactionId() {
    return 'CHAI_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
}

// Fake donations data (don't know how to get real one so)
const fakeDonations = [
    {
        name: "Riya",
        amount: 200,
        message: "Couldn't have asked for a better thing. Thank you helping me out in my whole NIOS journey, btw special thanks to Hrithik! 💕",
        time: ""
    },
    {
        name: "Saanvi Rawat",
        amount: 500,
        message: "Finally passed my exam thanks to your guidance. Here's to many more chais and success stories! HUGE thanks to hrithik and woodpacker 🎉",
        time: ""
    },
    {
        name: "Sambhavi",
        amount: 150,
        message: "Small contribution but huge gratitude. Couldn't have asked for a more better support community 🌟",
        time: ""
    },
    {
        name: "Vikash reddy",
        amount: 300,
        message: "From a struggling student to passing with good marks - all thanks to this community! Chai pe charcha! 😊",
        time: ""
    },
    {
        name: "Faisal",
        amount: 100,
        message: " Keep up the amazing work.  chai is well deserved! btw Hrithik is my goat ☕",
        time: ""
    }
];

// Display fake donations
function displayDonations() {
    const donationsList = document.getElementById('donationsList');
    
    fakeDonations.forEach(donation => {
        const donationElement = document.createElement('div');
        donationElement.className = 'donation-item';
        donationElement.innerHTML = `
            <div class="donation-time">${donation.time}</div>
            <div class="donation-header">
                <span class="donor-name">${donation.name}</span>
                <span class="donation-amount">₹${donation.amount}</span>
            </div>
            <div class="donation-message">${donation.message}</div>
            <div class="chai-emoji">☕</div>
        `;
        donationsList.appendChild(donationElement);
    });
}

//  some nice interactions
document.addEventListener('DOMContentLoaded', function() {
    // Display fake donations
    displayDonations();
    
    //  hover effect to chai icon
    const chaiIcon = document.querySelector('.chai-icon');
    chaiIcon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    chaiIcon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});





// TRIAL SHIT for making donation history live for everyone or maybe just for ourselevs

// Store transaction data (this would typically go to  server)
function storeTransaction(transactionId, amount) {
    const transaction = {
        id: transactionId,
        amount: amount,
        timestamp: new Date().toISOString(),
        source: 'chai-donation-page',
        status: 'pending'
    };
    
    // Store in localStorage for demo (in production, send to  server)
    let transactions = JSON.parse(localStorage.getItem('chai_transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('chai_transactions', JSON.stringify(transactions));
    
    console.log('Transaction stored:', transaction);
}