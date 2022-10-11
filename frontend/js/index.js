const host = "http://localhost:3000"

const getJSON = async url => {
	const response = await fetch(url);
	if (!response.ok) // check if response worked (no 404 errors etc...)
		throw new Error(response.statusText);

	const data = response.json(); // get JSON from the response
	return data; // returns a promise, which resolves to this data value
}

const cfRegEx = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i

/**
 * Add a row in a table using all the infos 
 * contenuted into the array passed
 * 
 * @param {Object} data 
 */
function addRow(data) {

	let tab = document.getElementById("tbody");

	let row = document.createElement("tr");

	Object.values(data).forEach(element => {
		let td = document.createElement("td");
		td.innerHTML = element;
		row.appendChild(td);
	});

	tab.append(row);

}


/**
 * Create a table using the array of objects passed
 *  
 * @param {Array} data the data used to create the table
 * @param {String} name the name that the table will have
 * @param {String} id the name id that the HTMLTableElement will have
 * @returns the HTMLElement
 */
function createTable(data, name, id) {

	let table = document.createElement("table");

	if (id) {
		table.setAttribute("id", id)
	}else{
		table.setAttribute("id", "info-table")
	}

	let th = document.createElement("th");
	th.innerHTML = name;

	table.appendChild(th);

	let tab = document.createElement("tbody");

	table.appendChild(tab);

	let fr = document.createElement("tr");

	Object.keys(data[0]).forEach(element => {
		let td = document.createElement("td");
		td.innerHTML = element;
		fr.appendChild(td);
	});

	fr.style.fontWeight = "bold";

	tab.appendChild(fr);

	for (let i = 0; i < data.length; i++) {
		let row = document.createElement("tr");

		Object.values(data[i]).forEach(element => {
			th.colSpan++;
			let td = document.createElement("td");
			if (element instanceof HTMLElement) {
				td.appendChild(element);
			}else{
				td.innerHTML = element;
			}
			row.appendChild(td);
		});
		tab.append(row);
	}

	return table;

}

/**
 * Function that write a message on the notice div (present in every page)
 * 
 * @param {string} mex the message that has to be written on the notice
 * @param {boolean} type the type of message (good = true, bad = false) 
 */
function notice(mex, type) {
	let notice = document.getElementById("notice");

	notice.innerHTML = mex;

	if (type) {
		notice.classList.add("good");

        setTimeout(() => {
            notice.classList.remove("good");
            notice.innerHTML = "";
        }, 3000);
	}else{
		notice.classList.add("bad");

        setTimeout(() => {
            notice.classList.remove("bad");
            notice.innerHTML = "";
        }, 3000);
	}
}