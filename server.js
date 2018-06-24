const express = require('express')
const bodyParser = require("body-parser")
const exphbs = require("express-handlebars");
const router = require("./controllers/router.js")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router)

// Static directory
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraping_db");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, () => {
    console.log("Server is listening on Port: " + PORT)
})