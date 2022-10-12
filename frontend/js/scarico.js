let cart = [];

getJSON(host + "/books/classes").then(data => {

    data.forEach(element => {
        let tmp = document.createElement("option");
        tmp.innerHTML = element;

        document.getElementById("class").appendChild(tmp);
    });

});


document.getElementById("submit").addEventListener("click", (event) => {

    if (document.getElementById("info-table")) {
        document.getElementById("info-table").remove();
    }

    let isbn = document.getElementById("isbn").value;
    let section = document.getElementById("class").value;
    if (section == "Seleziona la classe da ricercare")
        section = "";

    let subject = document.getElementById("subject").value;

    getJSON(host + "/storage/search-in-storage?book=" + isbn + "&section=" + section + "&subject=" + subject + "&inSale=true").then((data) => {

        for (let i = 0; i < data.length; i++) {

            let addBtn = document.createElement("button");
            addBtn.addEventListener("click", (event) => {

                addToCart(data[i], event.path[2]);
            });

            addBtn.innerHTML = "acquista";

            data[i].title = data[i].book.title;
            data[i].isbn = data[i].book.isbn;
            data[i].position = data[i].seller.id;
            data[i].subject = data[i].book.subject;
            data[i].price = data[i].book.price;
            data[i].add = addBtn;
            delete data[i].book;
            delete data[i].seller;
            delete data[i].buyer;
            delete data[i].sellDate;
            delete data[i].buyDate;
        }

        document.getElementById("infos").append(createTable(data, "in deposito"));
    }).catch(error => {
        notice(error.message, false)
    });

});

function addToCart(data, row) {

    if (document.getElementById("cart-table")) {
        document.getElementById("cart-table").remove();
    }

    delete data.add;
    cart.push(data);

    if (document.getElementById("cart-table"))
        document.getElementById("cart-table").remove()

    document.getElementById("cart").append(createTable(cart, "carrello", "cart-table"));


    // Calcolo e stampa del totale
    let prevTot = Number(document.getElementById("tot").innerHTML);
    document.getElementById("tot").innerHTML = prevTot + data.price;

    notice("Aggiunto il libro " + data.title + " al prezzo di " + data.price, true);

    row.remove();

}

/**
 * Creates a confirm window asking the confirmation about the buy.
 * Makes a request to the api server "buy" 
 */
function buy() {
    // Eseguire richiesta, ora solo lato client (animazione tutte cose)

    let div = document.getElementById("buy");

    div.innerHTML = "sicuro?";

    div.onclick = () => {
        fetch(host + "/storage/buy", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        }).then(a => {
            notice("Acquisto eseguito", true);
        });
    }

    let str = "";

    cart.forEach(element => {
        Object.keys(element).forEach(el => {
            str += el + "<br>";
        });
        str += "<br>"
    });

    
    

}