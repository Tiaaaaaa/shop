let cart = [];
let cfInput = document.getElementById("cf");
let searchBtn = document.getElementById("submit");
let buyBtn = document.getElementById("buy-infos");

getJSON(host + "/books/classes").then(data => {

    data.forEach(element => {
        let tmp = document.createElement("option");
        tmp.innerHTML = element;

        document.getElementById("class").appendChild(tmp);
    });

});

getJSON(host + "/books/subjects").then(data => {

    data.forEach(element => {
        let tmp = document.createElement("option");
        tmp.innerHTML = element;

        document.getElementById("subject").appendChild(tmp);
    });

});


searchBtn.disabled = true;
cfInput.addEventListener("input", (event) => {

    if (cfRegEx.test(cfInput.value)) {
        searchBtn.disabled = false;
    } else {
        searchBtn.disabled = true;
    }
});

searchBtn.addEventListener("click", (event) => {

    if (document.getElementById("info-table")) {
        document.getElementById("info-table").remove();
    }

    let isbn = document.getElementById("isbn").value;

    let section = document.getElementById("class").value;
    if (section == "Seleziona la classe da ricercare")
        section = "";

    let subject = document.getElementById("subject").value;

    if (subject == "Seleziona la materia da ricercare")
        subject = "";

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
            delete data[i].state;
        }

        document.getElementById("books").append(createTable(data, "in deposito"));
    }).catch(error => {
        notice(error.message, false)
    });

    buyBtn.style.display = "flex";

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

    if (!buyBtn.classList.contains("clickable")) {
        buyBtn.classList.add("clickable");
        buyBtn.onclick = buy
    }

}

/**
 * Creates a confirm window asking the confirmation about the buy.
 * Makes a request to the api server "buy" 
 */
function buy() {

    let cf = cfInput.value;

    cart.push(cf);  
    fetch(host + "/storage/buy", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    }).then(a => {
        notice("Acquisto eseguito", true);
        document.getElementById("cart-table").remove();

        buyBtn.classList.remove("clickable");
        buyBtn.onclick = null;

        document.getElementById("tot").innerHTML = "0"

        cart = []
        console.log(cart);

    });


}