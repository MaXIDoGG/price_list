// подключение модулей
const express = require("express");
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const db = require('./db.js')
const Products = require('./models/products.js');
const Categories = require('./models/categories.js');
const Admins = require('./models/admins.js');
// // создаем объект приложения
const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static("public"));

// подключение к базе данных
db.authenticate()
    .catch(error => console.error(error))

// определяем обработчик для маршрута "/"
app.get("/", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public/index.html'));

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

app.post("/addCategory", urlencodedParser, async (req, res) => {
    try {
        console.log(req.body)
        await Categories.create({
            name: req.body.category
        })
        res.status(200)
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