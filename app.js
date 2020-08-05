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


// requests targeting all articles ======================================

app.route("/articles")
    .get(
        function(req, res) {
            Article.find({}, function(err, foundArticles){
                if (!err) {
                    res.send(foundArticles);
                } else {
                    res.send(err);
                }
            });
        })

    .post(
        function(req, res) {
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content
            });
        
            newArticle.save(function(err){
                if (!err){
                    res.send("Successfully added new article");
                } else {
                    res.send(err);
                }
            });
        })

    .delete(function(req, res) {
        Article.deleteMany(function(err){
            if (!err){
                res.send("Successfully deleted all articles");
            } else {
                res.send(err);
            }
        });
    });

// requests targeting specific articles ======================================

app.route("/articles/:articleTitle").
    get(function(req, res){
        Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
            if (!err) {
                res.send(foundArticle);
            } else {
                console.log("No article with matching title found!");
            }
        });
    });

// server listen ============================================================

app.listen(3000, function(){
    console.log("Server is up and running on port 3000");
});