const select = document.querySelector('#ProductCategory');
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
            select.appendChild(select0);
        }

        console.log(json);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

async function addCategory() {
    let category = document.querySelector("category");
    
}

loadCategories();


