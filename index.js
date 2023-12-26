// подключение модулей
const express = require("express");
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const db = require('./db.js')
const Products = require('./models/products.js');
const Categories = require('./models/categories.js');
const Admins = require('./models/admins.js');
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const session = require('express-session');
// // создаем объект приложения
const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

app.use(express.static("public"));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

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

app.get("/admin", async (req, res) => {
    try {
        if (req.session.authenticated) {
            res.sendFile(path.join(__dirname, 'public/admin.html'));
        } else {
            res.redirect("/login");
        }

    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

});

app.get("/login", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public/login.html'));
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
});

app.post("/login", urlencodedParser, async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // Check credentials in the database
        const admin = await Admins.findOne({
            where: {
                nickname: username,
                password: password
            }
        });

        if (admin) {
            // Set a session variable to track the user's authentication status
            req.session.authenticated = true;
            res.redirect("/admin");
        } else {
            res.status(401).json({
                error: "Invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/logout", async (req, res) => {
    try {
        req.session.authenticated = false;
        res.redirect("/");
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/searchProduct", urlencodedParser, async (req, res) => {
    try {
        let products;
        const whereConditions = {};

        if (req.body.productName) {
            whereConditions.name = req.body.productName;
        }

        if (req.body.ProductCategory) {
            // Используем JOIN для соединения таблиц
            products = await Products.findAll({
                where: whereConditions,
                include: [{
                    model: Categories,
                    as: 'category', // псевдоним для обращения к таблице categories
                    attributes: ['name'], // выбираем только имя категории
                    where: {
                        id: req.body.ProductCategory
                    }
                }]
            });
        } else {
            // Если категория не указана, просто выбираем товары без соединения
            products = await Products.findAll({
                where: whereConditions,
                include: [{
                    model: Categories,
                    as: 'category', // псевдоним для обращения к таблице categories
                    attributes: ['name'], // выбираем только имя категории
                }]
            });
        }

        res.send(products);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
        console.log(error.message);
    }
});



app.post("/addCategory", urlencodedParser, async (req, res) => {
    try {
        await Categories.create({
            name: req.body.category
        })
        res.redirect("/admin")
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

app.post("/addProduct", urlencodedParser, async (req, res) => {
    try {
        await Products.create({
            name: req.body.productName,
            categoryid: req.body.ProductCategory,
            price: req.body.productPrice
        })
        res.redirect("/admin")
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
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

app.post("/changeCategory", urlencodedParser, async (req, res) => {
    try {
        const product = await Products.findByPk(req.body.productId);
        await product.update({ categoryid: req.body.ProductCategory });
        res.redirect("/admin")
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

app.post("/addAdmin", urlencodedParser, async (req, res) => {
    try {
        await Admins.create({
            name: req.body.adminName,
            nickname: req.body.adminLogin,
            password: req.body.adminPassword
        })
        res.redirect("/admin")
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

// начинаем прослушивать подключения на 3000 порту
app.listen(3000);