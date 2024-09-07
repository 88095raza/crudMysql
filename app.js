document.addEventListener('DOMContentLoaded', function(){
        fetch('http://localhost:8080/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
     
});

const addBtn = document.querySelector('#add-name-btn')
addBtn.onclick = function () {
        const nameInput = document.querySelector('#name-input')
        // next every grab the  value and every time we send it to our
        // back-end we are gonna reset this value to be an empty string
        const name = nameInput.value;
        nameInput.value= "";

        fetch('http://localhost:8080/insert',{
               headers:{
                'content-type' : 'application/json'
               },
               method: 'POST',
               body: JSON.stringify({name : name})
        })
        .then(response => response.json())
        .then(data => insertRowIntotable(data['data'])); 
}
function insertRowIntotable(data){
        const table = document.querySelector('table tbody')
        const isTabledata = table.querySelector(".no-data");

        let tableHtml = "<tr>";
        for(var key in data) {
                if(data.hasOwnProperty(key)) {
                        if(key === 'dateAdded') {
                                data[key] = new Date(data[key]).
                                        toLocaleString();
                        }
                        tableHtml += `<td>${data[key]}</td>`;
                }
        }

        tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

        tableHtml +="</tr>";

        if(isTabledata) {
                table.innerHTML = tableHtml;
        } else {
                const newRow = table.insertRow();
                newRow.innerHTML = tableHtml;
        }
}


function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');


        if(data.length === 0){
                table.innerHTML = "<tr><td class ='no-data' colspan = '5'>No Data </td> </tr>";
                return;
        }


        let tableHtml = "";
        
        data.forEach(function({id, name, date_added}){
                tableHtml += "<tr>";
                tableHtml += `<td>${id}</td>`;
                tableHtml += `<td>${name}</td>`;
                tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
                tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
                tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
                tableHtml += "</tr>";
        });
        table.innerHTML = tableHtml;
}

