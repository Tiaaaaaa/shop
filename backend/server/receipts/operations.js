const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const folder = "./backend/server/receipts/"

exports.create = (data, buyer) => {
    var doc = new jsPDF();

    let imgStr = doc.loadImageFile(folder + "logo.png");

    buyer.toUpperCase();

    doc.text("Utente: " + buyer, 70, 15)

    doc.addImage(imgStr, "PNG", 10, 10, 10, 10);

    doc.line(5, 25, 205, 25);

    doc.setFontSize(10);
    doc.text("Libri depositati:", 15, 35)

    let i = 0;
    data.forEach(row => {
        let j = 0;

        for (const [key, value] of Object.entries(row)) {
            doc.text(value.toString(), 10 + j, 40 + i, { maxWidth: 0 })

            switch (key) {
                case 'isbn':
                    j += 30;
                    break;

                case 'subject':
                    j += 30;
                    break;

                case 'title':
                    j += 30;
                    break;

                case 'volume':
                    j += 5;
                    break;

                case "publisher":
                    j += 30;
                    break;

                case 'price':
                    j += 10;
                    break;

                case 'section':
                    j += 20;
                    break;
            }

        }

        i += 10
    });

    doc.setFontSize(20);

    doc.text(data.price + "€", 185, 285);
    doc.save(folder + "past/" + buyer + ".pdf")

    return doc;
}

exports.get = (cf) => {

    cf = cf.toUpperCase();

    const prom = new Promise((resolve, reject) => {

        fs.readdir(path.join(__dirname, "past"), { withFileTypes: false }, (err, files) => {

            if (err) {
                reject("File not found");
            }

            resolve(files);
        });
    });

    return prom;
}