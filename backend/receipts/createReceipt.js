const { jsPDF } = require("jspdf");

exports.create = (data) => {
    var doc = new jsPDF();

    let imgStr = doc.loadImageFile("./backend/receipts/logo.png");

    doc.text("Utente: " + data.cf, 70, 15)

    doc.addImage(imgStr, "PNG", 10, 10, 10, 10);

    doc.line(5, 25, 205, 25);

    let i = 0;
    doc.setFontSize(10);
    data.cart.forEach(row => {
        let j = 0;


        for (const [key, value] of Object.entries(row)) {
            doc.text(value.toString(), 10 + j, 40 + i, { maxWidth: 0 })

            switch (key) {
                case 'isbn':
                    j+= 30;
                    break;
            
                case  'subject':
                    j+=30;
                    break;    
                
                case 'title':
                    j+=30;
                    break;

                case 'volume':
                    j+=5;
                    break;

                case  "publisher":
                    j+=30;
                    break;
                
                case 'price':
                    j+=10;
                    break;

                case 'section':
                    j+=20;
                    break;
            }
            
        }

        i += 10
    });

    doc.setFontSize(20);
    
    doc.text(data.price.toString() + "€",185,285);
    doc.save("./backend/receipts/prova.pdf")

    return doc;
}   
