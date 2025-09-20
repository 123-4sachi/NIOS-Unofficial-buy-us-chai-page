

// --- Chai Donation Page JavaScript ---

// Currently selected donation amount
let selectedAmount = 0;

// UPI payment configuration (edit to change payment details)
const UPI_CONFIG = {
    upiId: 'niosstudentcommunity@kotak', // UPI ID for receiving payments
    merchantName: 'NIOS Unofficial',     // Display name for merchant
    transactionNote: 'Buy us a chai'     // Note shown in UPI app
};

// --- Handle preset amount buttons ---
document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', function () {
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

// --- Handle custom amount input ---
document.getElementById('customAmount').addEventListener('input', function () {
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

// --- Handle donate button click ---
document.getElementById('donateBtn').addEventListener('click', function () {
    if (selectedAmount > 0) {
        generatePaymentDetails();
    }
});

// --- Show payment info and QR code for selected amount ---
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



// --- Generate and display the UPI QR code ---
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



// --- Generate unique transaction ID for tracking ---
function generateTransactionId() {
    return 'CHAI_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
}

// --- Fake donations data (replace with real data if available) ---
const fakeDonations = [
    {
        name: "glad bend",
        amount: 911,
        message: "thank you for creating the discord servr and whole community",
        time: ""
    },
    {
        name: "head-ice5826",
        amount: 15,
        message: "already 12th passed from icse board, but only had 73, appearing for nios to clear 75% for jee, your subreddit helped alot about the nios information and all",
        time: ""
    },
    {
        name: "u/advanced-novel3307",
        amount: 50,
        message: "just gratitude and my best wishes, got my result and satisfied! love the community, also contributed my notes too",
        time: ""
    },
    {
        name: "Anonymous",
        amount: 14,
        message: "small amount but huge gratitude, ",
        time: ""
    },
    {
        name: "manish bagel",
        amount: 50,
        message: "A small contribution to a great cause! Your support means a lot to us. Thank you! 🙏",
        time: ""
    },
    {
        name: "rithesh verma",
        amount: 50,
        message: "Thanks for your support! 🙏",
        time: ""
    },
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
        message: " Keep up the amazing work.  chai is well deserved! btw Hrithik is my goat ",
        time: ""
    }



];
// --- Show more effect for donations (expand/collapse) ---
const DONATION_PREVIEW_COUNT = 2; // Number of donations to show initially
let donationsExpanded = false;    // Track if all donations are shown

// Render the donation cards in the UI
function displayDonations() {
    const donationsList = document.getElementById('donationsList');
    donationsList.innerHTML = '';
    // Show only a few donations unless expanded
    let toShow = fakeDonations;
    if (!donationsExpanded && fakeDonations.length > DONATION_PREVIEW_COUNT) {
        toShow = fakeDonations.slice(0, DONATION_PREVIEW_COUNT);
    }
    // Render each donation card
    toShow.forEach(donation => {
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
        Object.assign(donationElement.style, {
            position: 'relative',
            padding: '12px',
            marginBottom: '10px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
        });
        donationsList.appendChild(donationElement);
    });

    // Add inline style for donation card appearance
    const style = document.createElement('style');
    style.textContent = `
        .donation-item {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
            min-height: 90px;
        }
        .donation-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .donor-name {
            font-size: 1.2rem;
            font-weight: 600;
            color: goldenrod;
            padding-left: 5px;
        }
        .donation-amount {
            font-size: 1rem;
            font-weight: 500;
            color: #ffffffff;
            background: #5dcc7dff;
            padding: 4px 8px;
            border-radius: 6px;
        }
        .donation-time {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 8px;
        }
        .donation-message {
            font-size: 0.99rem;
            color: #333;
            font-weight: 600;
            text-align: center;
            width: 90%;
            margin: 0 auto 18px auto;
            word-break: break-word;
        }
        .chai-emoji {
            font-size: 1.3rem;
            position: absolute;
            right: 18px;
            bottom: 14px;
            opacity: 0.7;
            padding: 0;
            line-height: 1;
            transition: transform 0.3s ease;
            pointer-events: none;
        }
        .donation-item:hover .chai-emoji {
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);

    // Add "Show all donations" button if needed
    let showMoreBtn = document.getElementById('showMoreDonationsBtn');
    if (fakeDonations.length > DONATION_PREVIEW_COUNT && !donationsExpanded) {
        if (!showMoreBtn) {
            showMoreBtn = document.createElement('button');
            showMoreBtn.id = 'showMoreDonationsBtn';
            showMoreBtn.textContent = 'Show all donations';
            showMoreBtn.style.display = 'block';
            showMoreBtn.style.margin = '0 auto 18px auto';
            showMoreBtn.style.padding = '10px 22px';
            showMoreBtn.style.background = 'linear-gradient(90deg,#ffde7d,#ffb347)';
            showMoreBtn.style.color = '#ffffffff';
            showMoreBtn.style.fontWeight = 'bold';
            showMoreBtn.style.border = 'none';
            showMoreBtn.style.cursor = 'pointer';
            showMoreBtn.style.fontSize = '1.08em';
            showMoreBtn.style.boxShadow = '0 2px 8px rgba(139,69,19,0.08)';
            showMoreBtn.style.width = '100%';
        }
        showMoreBtn.onclick = () => {
            donationsExpanded = true;
            displayDonations();
        };
        donationsList.appendChild(showMoreBtn);
    } else {
        if (showMoreBtn) showMoreBtn.remove();
        let fadeDiv = document.getElementById('donationsFade');
        donationsList.style.position = '';
    }
}

// --- Add some nice UI interactions on page load ---
document.addEventListener('DOMContentLoaded', function () {
    // Display fake donations on page load
    displayDonations();
    // Add hover effect to chai icon (logo)
    const chaiIcon = document.querySelector('.chai-icon');
    chaiIcon.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    chaiIcon.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});





// --- Store transaction data (for demo; in production, send to server) ---
function storeTransaction(transactionId, amount) {
    const transaction = {
        id: transactionId,
        amount: amount,
        timestamp: new Date().toISOString(),
        source: 'chai-donation-page',
        status: 'pending'
    };
    // Store in localStorage for demo (in production, send to server)
    let transactions = JSON.parse(localStorage.getItem('chai_transactions') || '[]');
    transactions.push(transaction);
    localStorage.setItem('chai_transactions', JSON.stringify(transactions));
    console.log('Transaction stored:', transaction);
}
