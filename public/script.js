const select = document.querySelector('#ProductCategory');
const select1 = document.querySelector('#ProductCategory1');
console.log(select);
// const select0 = document.createElement('option');

async function loadCategories() {
    let response = await fetch("/loadCategories");

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа
        let json = await response.json();
        
        for(let i = 0; i < json.length; i++) {
            let obj = json[i];
            let select0 = document.createElement('option');
            select0.innerText = obj["name"];
            select0.setAttribute("value", obj["id"]);
            let select01 = select0.cloneNode(true);
            select1.appendChild(select0);
            select.appendChild(select01);
        }

        // console.log(json);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

async function searchProduct() {
    let productName = document.querySelector("#productName1").getAttribute("name");
    let productCategory = document.querySelector("#ProductCategory1").getAttribute("name");
    let productsTable = document.querySelector("#productsTable")

    let response = await fetch('/searchProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: productName,
            categoryid: productCategory
        })
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
    productsTable.innerHTML = `<tr>
            <th>Название товара</th>
            <th>Категория товара</th>
            <th>Цена товара</th>
        </tr>` + str;
    
    
}


loadCategories();


