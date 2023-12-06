// подключение модулей
const express = require("express");
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const db = require('./db.js')
const Products = require('./models/products.js');
// // создаем объект приложения
const app = express();

// подключение к базе данных
db.authenticate()
    .catch(error => console.error(error))


// определяем обработчик для маршрута "/"
app.get("/", async (req, res) => {
    try {
        // await Products.create({
        //     id: uuidv4(),
        //     name: "Кроссовки Nike",
        //     category: "Спортивная обувь",
        //     price: 3000
        // })
        res.sendFile(path.join(__dirname, 'views/index.html'));

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

});

app.get("/searchProduct", async (req, res) => {
    try {
        console.log(req.params)
        let products = await Products.findAll();
        res.send(products)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

// app.post("/addCategory") {

// }
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);