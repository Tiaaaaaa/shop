let cfInput = document.getElementById("cf-input");
let inputBox = document.getElementById("input");
cfInput.focus();

input.addEventListener("keydown", (event) => {

    if (!(event.code == "Enter" || event.code == "NumpadEnter")) {
        return
    }

    const cf = cfInput.value;

    // check the cf
    if (cfRegEx.test(cf)) {
        notice("Codice fiscale inserito", true);

        document.getElementById("input-title").innerHTML = "Codice fiscale inserito";


    } else {
        notice("codice fiscale errato", false);

        return;
    }

    getJSON(host + "/users/get-id?cf=" + cf).then(data => {
        document.getElementById("posizione").innerHTML = "posizione <br>" + data.id;
    });

    let tab;

    getJSON(host + "/storage/given-from-cf?cf=" + cf).then(data => {
        tab = createTable(data, "Libri depositati");
        addInputRow(tab);
        document.getElementById("book-list").append(tab)
        cfInput.disabled = true;
    }).catch(error => {
        notice(error.message, false);
    });

})

/**
 * Aggiunge una riga vuota alla lista che contiene un input 
 * per aggiungere un libro
 * 
 * 
 */
function addInputRow(tab) {

    let row = document.createElement("tr");

    let input = document.createElement("input")
    input.type = "text";
    input.id = "isbn-input";

    input.value = "";

    let inputTd = document.createElement("td")
    inputTd.append(input);

    row.append(inputTd);

    row.append(document.createElement("td"));
    row.append(document.createElement("td"));

    let stateTd = document.createElement("td");
    stateTd.classList.add("state");
    stateTd.innerHTML = "ususrato";

    let state = false;

    stateTd.addEventListener("mousedown", (event) => {
        if (stateTd.classList.contains("ruined")) {
            stateTd.classList.remove("ruined");
            state = false;
        } else {
            state = true;
            stateTd.classList.add("ruined");
        }
    })

    row.append(stateTd);
    tab.appendChild(row);

    input.focus();
    input.addEventListener("keydown", (event) => {
        if (event.code != "Enter")
            return

        addBook(input.value, document.getElementById('cf-input').value, state);

    });

}

/**
 * Makes the requestes at the server for the store of a new book
 * 
 * @param {Number} book the isbn of the book
 * @param {String} seller the id code of the seller
 * @param {Boolean} state the state of usury of the book
 */
function addBook(book, seller, state) {

    getJSON(host + "/books/get-books?book=" + book).then(data => {

        let toAdd = {
            book: book,
            seller: seller,
            state: state
        }

        addRow(data[0]);

        fetch(host + "/storage/add-to-storage", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toAdd)
        }).then(a => {

            console.log(a.status);

            notice("libro inserito", true);
        });

    }).catch(error => {
        notice("formato ISBN sbagliato", false)
    });

}
