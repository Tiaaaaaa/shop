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
        inputBox.classList.remove("error");
        document.getElementById("input-title").innerHTML = "Codice fiscale inserito";
    }else{
        inputBox.classList.add("error");
        document.getElementById("input-title").innerHTML = "codice fiscale errato";
        return
    }

    getJSON("http://localhost:3000/get-id?cf=" + cf).then(data => {
        document.getElementById("posizione").innerHTML = "posizione <br>" + data.id;
    });

    getJSON("http://localhost:3000/given-from-cf?cf=" + cf).then(data => {
      addInfo(data);
    }).catch(error => {
      console.error(error);
    });

    cfInput.disabled = true;
    addInputRow();
})

/**
 * Add a row for every book deposited sooner
 * 
 * @param {Array[Book]} data array containing the infos
 */
function addInfo(data) {
    
    data.forEach(element => {
        addRow(element);
    });

}

/**
 * Aggiunge una riga vuota alla lista che contiene un input 
 * per aggiungere un libro
 */
function addInputRow() {
    let tab = document.getElementById("book-table");

    let row = document.createElement("tr") ;  
    
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
        }else{
            state = true;
            stateTd.classList.add("ruined");
        }
        

    })

    row.append(stateTd);
    tab.append(row);

    input.focus();
    input.addEventListener("keydown", (event) => {
        if (event.code != "Enter")
            return
        
        addBook(input.value,document.getElementById('cf-input').value,state);
       
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

    getJSON("http://localhost:3000/books?book=" + book).then(data => {
        
        let toAdd = {
            book: book,
            seller: seller,
            state: state
        }

        addRow(data[0]);

        fetch("http://localhost:3000/add-to-storage",{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(toAdd)
        });
        
    }).catch(error => {
        console.error(error);
    });

}
