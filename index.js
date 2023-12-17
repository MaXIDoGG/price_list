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

const urlencodedParser = express.urlencoded({ extended: false });

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

app.post("/searchProduct", async (req, res) => {
    try {
        console.log(req.body)
        let products = await Products;
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
        res.sendFile(path.join(__dirname, 'public/index.html'))
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

app.post("/addProduct", urlencodedParser, async (req, res) => {
    try {
        console.log(req.body)
        
        // let stringPrice = "" + req.body.productPrice;
        // console.log(parseInt(stringPrice))
        await Products.create({
            name: req.body.productName,
            categoryid: req.body.ProductCategory,
            price: req.body.productPrice
        })
        res.sendFile(path.join(__dirname, 'public/index.html'))
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

app.get("/loadCategories", urlencodedParser, async (req, res) => {
    try {
        let categories = await Categories.findAll();

        res.json(categories)
        res.status(200)
        // console.log(categories)
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