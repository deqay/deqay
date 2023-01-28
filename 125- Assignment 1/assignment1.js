window.onload = createTable;

function createTable() {


    //get rows & collums & remove old table


    const r = document.getElementById("r").value;
    const c = document.getElementById("c").value;


    const oldTable = document.getElementById("ogtable");

    if (oldTable) {
        oldTable.remove();
    }

    // Create table element

    const mytable = document.createElement("table");
    mytable.setAttribute("id", "ogtable")
      

    // loop for rows & collums 

    for (let row = 1; row <= r; row++) {
        
        const tablerow = document.createElement("tr");
        mytable.appendChild(tablerow);

        for (let collum = 1; collum <= c; collum++) {

            const tablecollum = document.createElement("td");
            tablerow.appendChild(tablecollum);

            const multiply = row * collum;
            const value  = document.createTextNode(`${row} x ${collum} = ${multiply}`);
            tablecollum.appendChild(value); 

            document.body.appendChild(mytable);
        }
        
    }

}