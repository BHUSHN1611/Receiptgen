function convertNumberToMarathiWords(number) {
    const marathiNumbers = ["शून्य", "एक", "दोन", "तीन", "चार", "पाच", "सहा", "सात", "आठ", "नऊ"];
    const marathiTens = ["", "दहा", "वीस", "तीस", "चाळीस", "पन्नास", "साठ", "सत्तर", "ऐंशी", "नव्वद"];
    const marathiTeens = ["अकरा", "बारा", "तेरा", "चौदा", "पंधरा", "सोळा", "सतरा", "अठरा", "एकोणीस"];
    const marathiHundreds = ["", "एकशे", "दोनशे", "तीनशे", "चारशे", "पाचशे", "सहाशे", "सातशे", "आठशे", "नऊशे"];
    const hundr = ["शंबर "];
    
    let words = "";
    
 
    if (number == 0) return marathiNumbers[0];

    if (number < 10) return marathiNumbers[number];
    if (number < 20) return marathiTeens[number - 11];
    if (number < 100) {
        words += marathiTens[Math.floor(number / 10)];
        if (number % 10 != 0) words += " " + marathiNumbers[number % 10];
        return words;
    }
    if (number == 100) return hundr[0]; 

    if (number < 1000) {
        words += marathiHundreds[Math.floor(number / 100)];
        if (number % 100 != 0) words += " " + convertNumberToMarathiWords(number % 100);
        return words;
    }  
    
    if (number < 100000) {
        words += convertNumberToMarathiWords(Math.floor(number / 1000)) + " हजार";
        if (number % 1000 != 0) words += " " + convertNumberToMarathiWords(number % 1000);
        return words;
    }

    if (number < 10000000) {
        words += convertNumberToMarathiWords(Math.floor(number / 100000)) + " लाख";
        if (number % 100000 != 0) words += " " + convertNumberToMarathiWords(number % 100000);
        return words;
    }

    return "संख्या खूप मोठी आहे";
}

function setCurrentDateTime() {
    const now = new Date();
    
    const options = {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    
    const formattedDateTime = new Intl.DateTimeFormat('en-GB', options).format(now).replace(',', '');
    document.getElementById('paymentDate').value = formattedDateTime;
}

function printDetails() {
    const paymentDate = document.getElementById('paymentDate').value;
    const consumerNumber = document.getElementById('consumerNumber').value;
    const consumerName = document.getElementById('consumerName').value;
    const amount = document.getElementById('amount').value;
    const amountInWords = convertNumberToMarathiWords(Number(amount));

    if (paymentDate && consumerNumber && consumerName && amount) {
        const popup = window.open('', '', 'width=800,height=600');
        popup.document.write(`
           <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>

    *{
        margin: 0;
        padding: 0;
        border: border-box;   
        font-family: Arial; 
    }
    
    #main{
        height:600px;
        width: 390px;
        border: 1px solid rgb(0, 0, 0);
        margin-left:auto ;
        margin-right: auto;
        position: relative;
    }
    img{
        height: 75px;
        width: 175px;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
    }
    h4{
        text-align: center;
        margin: 10px;
        font-size: 14.5px;
        margin-left:45px;
        margin-right:45px;   
    }
    .header{
        text-align: center;
        margin: 10px;
        font-size: 13px;
        margin-left:45px;
        margin-right:45px;  
    }
    .section>pre>p{
        text-align: left;
        font-size: 13px;
        margin-left:45px;
        margin-right:45px;
        margin-top: 0px;
        margin-bottom: -2.5px;
        font-weight: 545;
    }
    
    #line{
        border-top: 1.5px dashed rgb(0, 0, 0);
        margin-left: 45px;
        margin-right:45px ;
        margin-top:4px;
        margin-bottom:2px;
    }
    #consemerdetails{
        text-align: center;
        margin: 2px;
        font-size: 13.5px;
        margin-left:45px;
        margin-right:45px;
    }
    .details>pre>p{
        text-align: left;
        margin-right: 45px;
        margin-left: 45px;
        font-size: 13px;
        margin-top: 0px;
        margin-bottom: -2.5px;
    }
    #amt{
        text-align: left;
        margin-left:45px;
        margin-right:45px;
        font-size: 13px;
        margin-top: 0px;
        margin-bottom: -2.5px;
    }
    #amt1{
        text-align: left;
        margin-left:45px;
        margin-right:45px;
        font-size: 13px;
        margin-top: 0px;
        margin-bottom: -2.5px;
        
    }
    #amt2{
        text-align: left;
        margin-left:45px;
        margin-right:45px;
        font-size: 13px;
        margin-top: 0px;
        margin-bottom: -2.5px;
        
    }
    .footer{
        text-align: left;
        margin-left:45px;
        margin-right:45px;
        font-size: 12px;
        margin-top: 0px;
        margin-bottom: -2.5px;
    }
    .lastfooter{
        text-align: center;
        margin-left:45px;
        margin-right:45px;
        font-size: 12px;
        margin-top: 1px;
        margin-bottom: -2.5px;
    
    }
    
    button {
        background-color: rgb(0, 145, 255);;
        border:none;
        border-radius: 2px;
        color: white;
        height:36px;
        width: 105px;
        font-weight: 500;
        cursor:pointer;
        margin-right:45px;
        transition: opacity 0.15s ;
        margin-left: 135px;
        margin-top:20px;
        
    
    }
    button:hover{
        opacity: 0.8;
    
    }
    button:active{
        opacity: 0.5;
    }
    

    </style>
</head>
<body>
    <div id="main">

        <div id="img">
            <img src="mpp.webp" alt="maha">
        </div>

        <div class="header">
            <h4>देय पावती</h4>
            <p id="cin">CIN: U40109MH2005SGC153645</p>
            <p>CC-184706006-SATASWARUP XEROX CENTER V</p>
            <p>ELECTRIC WORK</p>
        </div>

        <div class="section">
            <pre><p>देय दिनांक:                                     ${paymentDate}</p></pre>
            <pre><p>पावती नं:                                           W281250058407</p></pre>
            <pre><p>बिल नं:                                           000002501626583</p></pre>
        </div>
            <hr id="line">
        <div id="consemerdetails">ग्राहक तपशील</div>

        <div class="details">
                <pre><p>ग्राहक नं:                                            ${consumerNumber}</p></pre>
                <pre><p>ग्राहकाचे नाव:             ${consumerName}</p></pre>
                <pre><p>बि.यु./चौ./उपविभाग:                4706-5/विरार पूव</p></pre>
                <pre><p>विभाग:                                   विरार</p></pre>
                <pre><p>मंडळ:                                    वसई</p></pre>
        </div>
            <hr id="line">
        <div id="amt">
                 <pre><p>पावती                                                                 रक्कम</p></pre>
        </div>
            <hr id="line">
        <div id="amt1">
                <pre><p>01-वीज देयक                                                     ${amount}</p></pre>
        </div>
           <hr id="line">
        <div id="amt2">
            <pre><p>एकूण देय रक्कम:                                                ${amount}</p></pre>
            <pre><p>अक्षरी:              ${amountInWords}</p></pre>
            <pre><p>देय माध्यम :           रोख</p></pre>
        </div>
        <div class="footer">
            <div>
                <p>१/ चे मुद्रांक शुल्क, भारतीय मुद्रांक कायदा 1899 च्या कलम 53 नुसार अदा केले जाते. सदर शुल्क महाराष्ट्र सरकारचे कोषागारात, अतिरिक्त नियंत्रक-मुद्रांक, मुंबई, जनरल पोस्ट ऑफीस, फोर्ट, मुंबई 400001, यांच्या आदेश नं. (LOA/ENF-2/LOA/ENF-2/CSD/64/2024/(Validity Period Dt.11/07/2024 to Dt. 31/12/2025)/2830 Dt. 11.07.2024 GRN No.MH004618017202425E DT.02-JUL-24, Bank of Maharashtra,) GRAS DEFACE NO.0002670590202425 dt. 09-JUL-24 नुसार भरलेला एकत्रित मुद्रांक शुल्कामध्ये सामाविष्ट आहे.</p>
            </div>
        </div>
        <div class="lastfooter">
            <p>*** MSEDCL-MahaPowerPay v1.7.2 ***</p>
        </div>
        
        <button onclick="window.print()">Print</button>
      
    </div>
    
   
</body>
</html>
        `);
        popup.document.close();
    } else {
        alert('Please fill out all fields.');
    }
}

window.onload = setCurrentDateTime;
