// подключение модулей
const express = require("express");
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
        await Products.create({
            id: uuidv4(),
            name: "Кроссовки Nike",
            category: "Спортивная обувь",
            price: 3000
        })

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
        console.log(UUID())
    }

});
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);