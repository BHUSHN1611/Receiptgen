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

// Load stored data on page load
window.onload = loadStoredData;
