function loadStoredData() {
    const storedData = JSON.parse(localStorage.getItem('receipts')) || [];
    const receiptsTable = document.getElementById('receiptsTable').getElementsByTagName('tbody')[0];
    let totalAmount = 0;
    let receiptsToday = 0;

    const today = new Date().toLocaleDateString('en-GB', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    storedData.forEach((receipt, index) => {
        const row = receiptsTable.insertRow();
        row.insertCell(0).innerText = index + 1; // Serial Number
        row.insertCell(1).innerText = receipt.paymentDate;
        row.insertCell(2).innerText = receipt.consumerNumber;
        row.insertCell(3).innerText = receipt.consumerName;
        row.insertCell(4).innerText = receipt.amount;

        const actionsCell = row.insertCell(5);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
            deleteReceipt(index);
        };
        actionsCell.appendChild(deleteButton);

        totalAmount += parseFloat(receipt.amount);

        if (receipt.paymentDate.includes(today)) {
            receiptsToday++;
        }
    });

    const receiptCount = storedData.length;
    // const lastSerialNumber = receiptCount > 0 ? receiptCount : 0;

    document.getElementById('totalAmount').innerText = totalAmount;
    document.getElementById('totalReceipts').innerText = storedData.length;
    // document.getElementById('lastSerialNumber').innerText = lastSerialNumber; // Last serial number // Total number of receipts
}

function deleteReceipt(index) {
    const storedData = JSON.parse(localStorage.getItem('receipts')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('receipts', JSON.stringify(storedData));
    location.reload(); // Reload the page to update the displayed data
}

function clearAllData() {
    localStorage.removeItem('receipts');
    location.reload(); // Reload the page to clear the displayed data
}

function goBack() {
    window.location.href = 'index.html'; // Change this to the main form page
}

function downloadReceiptsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get today's date in IST
    const now = new Date();
    const options = {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };
    
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(now).replace(',', '');

    // Fetch stored data
    const storedData = JSON.parse(localStorage.getItem('receipts')) || [];
    let totalAmount = 0;
    let receiptsToday = 0;

    // Calculate total amount and count receipts for today
    storedData.forEach(receipt => {
        totalAmount += parseFloat(receipt.amount);
        receiptsToday++;
    });


    doc.setFontSize(10);
    doc.text(`Receipts Report - ${formattedDate}`, 10, 5);
    doc.setFontSize(10);
    doc.text(`Total Receipts: ${receiptsToday}`, 10, 10);
    doc.text(`Total Amount: ${totalAmount.toFixed(2)} Rs.`, 10, 15);

  
    const headers = ["Receipt No.", "Date and Time", "Consumer Number", "Consumer Name", "Amount"];
    const rows = [];

    // Generate table data
    storedData.forEach((receipt, index) => {
        const receiptNumber = index + 1;
        const { paymentDate, consumerNumber, consumerName, amount } = receipt;
        rows.push([receiptNumber, paymentDate, consumerNumber, consumerName, `${amount} Rs.`]);
    });

    // Add the table
    doc.autoTable({
        head: [headers],
        body: rows,
        bodyStyles: {fontSize: 7.5 },
        startY: 18,
        theme: 'grid',
        headStyles: { fillColor: [0, 57, 107] },
        styles: { fontSize: 7.5 },
        margin:3
    });

    // Save the PDF by the date 
    const fileName = `Receipts_Report_${formattedDate}.pdf`;
    doc.save(fileName);
}
// Load stored data on page load
window.onload = loadStoredData;
