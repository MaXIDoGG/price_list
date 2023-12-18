const select = document.querySelector('#ProductCategory');
const select1 = document.querySelector('#ProductCategory1');
const select2 = document.querySelector('#ProductCategory2');


async function loadCategories() {
    let response = await fetch("/loadCategories");

    if (response.ok) {
        let json = await response.json();
        
        for(let i = 0; i < json.length; i++) {
            let obj = json[i];
            let select0 = document.createElement('option');
            select0.innerText = obj["name"];
            select0.setAttribute("value", obj["id"]);
            let select01 = select0.cloneNode(true);
            let select02 = select0.cloneNode(true);
            select1.appendChild(select0);
            select.appendChild(select01);
            select2.appendChild(select02);
        }
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

async function searchProduct() {
    let searchForm = document.querySelector("#searchForm"); 
    let productsTable = document.querySelector("#productsTable")

    const data = new URLSearchParams();
    for (const pair of new FormData(searchForm)) {
        data.append(pair[0], pair[1]);
    }

    let response = await fetch('/searchProduct', {
        method: 'POST',
        body: data,
    });


    let result = await response.json();

    let str = "";
    for(let i = 0; i < result.length; i++) {
        let obj = result[i];
        str += `<tr>
        <th>${obj["name"]}</th>
        <th>${obj["categoryid"]}</th>
        <th>${obj["price"]}</th>
        </tr>`;
    }
    productsTable.innerHTML = `<thead>
            <tr>
                <th>Название товара</th>
                <th>Категория товара</th>
                <th>Цена товара</th>
            </tr> 
            </thead><tbody>
` + str + "</tbody>";    
}

loadCategories();


