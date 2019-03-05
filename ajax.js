$(document).ready(function () {

    $("#driver").click(function (event) {
        $.ajax({
            type: "GET",
            url: "https://jsonplaceholder.typicode.com/posts",
            success: function (result) {
                function creatingTable(){
                    let previoustable = document.getElementById('dynamic_table');
                    if(!!previoustable){
                        previoustable.remove();
                    }    

                var table = document.createElement('table');
                table.setAttribute('id', 'dynamic_table');
                var key = Object.keys(result[0]);
                var value = result.map((elements) => {
                    return Object.values(elements);
                });
                console.log("keys" + key)
                console.log("values" + value)

                var tr = document.createElement('tr');
                key.map(function (element) {
                    var th = document.createElement('th');
                    th.setAttribute('id', element)
                    var text = document.createTextNode(element);
                    th.appendChild(text);
                    tr.appendChild(th);
                })
                table.appendChild(tr);
                

                result.map(function(element){
                    tr = document.createElement('tr');
                    key.map(function(elementKey){
                        var td = document.createElement('td');
                        var text = document.createTextNode(element[elementKey]);
                        td.appendChild(text);
                        tr.appendChild(td);
                    })
                    table.appendChild(tr);
                })
                document.body.appendChild(table);
                addEventsToHeaders();
                
            }
            function addEventsToHeaders(){
                var header=Object.keys(result[0]);
                console.log(header);
            for(let i=0;i<header.length;i++)
            {
                document.getElementById(header[i]).addEventListener('click',function(event){
                    event.preventDefault();
                 sortTable(event.target.innerHTML)
            });
            }
        }
        
        let flag = true;
        function sortTable(param){
            result.sort(compare);
            function compare(a,b){
                if(a[param]>b[param] && flag){
                    return 1;
                }
                else
        
                return -1;
            }
            flag=!flag;
            creatingTable();
        }
        creatingTable();

        }
        
            
        });

        	

    });
});
