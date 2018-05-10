var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose")
var app = express();


//confi mongoose
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParse.urlencoded({extended: true}));


//create schema for database
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res)=>{
    res.redirect("/blogs")
})
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs)=> {
        if(err){
            console.log(err);
        }
        else{
            res.render("index", { blogs: blogs});
        }
    })
})

app.get("/blogs/new", (req, res) => {
    res.render("new")
})

app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err){
            res.render("new")
        }
        else{
            res.redirect("/blogs")
        }
    })
})





app.listen(3000, ()=>{
    console.log('server running')
})