//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const ejs= require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});


// database setup ======================================================

const articleSchema = {
    title: String,
    content: String,
};

const Article = mongoose.model("Article", articleSchema);


// server listen ============================================================

app.listen(3000, function(){
    console.log("Server is up and running on port 3000");
});