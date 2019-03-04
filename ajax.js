var table = document.createElement('table');
table.setAttribute('id', 'dynamic_table');

$(document).ready(function () {

    $("#driver").click(function (event) {
        $.getJSON("https://jsonplaceholder.typicode.com/posts", function (jd) {

            var key = Object.keys(jd[0]);
            var value = jd.map((elements) => {
                return Object.values(elements);
            });
            jd.sort();
            var tr = document.createElement('tr');
            for (let i = 0; i < key.length; i++) {
                var th = document.createElement('th');
                th.setAttribute('id', key[i])
                var text = document.createTextNode(key[i]);
                th.appendChild(text);
                tr.appendChild(th);
            }
            table.appendChild(tr);

            for (let i = 0; i < value.length; i++) {
                tr = document.createElement('tr');
                for (let j = 0; j < key.length; j++) {
                    var td = document.createElement('td');
                    var text = document.createTextNode(value[i][j]);
                    td.appendChild(text);
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            document.body.appendChild(table);
            sortTable();

        });
    });
});
//sorted on the basis of title
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("dynamic_table");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}