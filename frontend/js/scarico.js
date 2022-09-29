getJSON("http://localhost:3000/classes").then(data => {
    
    data.forEach(element => {
        let tmp = document.createElement("option");
        tmp.innerHTML = element;

        document.getElementById("class").appendChild(tmp);
    });

});

