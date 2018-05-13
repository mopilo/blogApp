var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose")
var app = express();
var methodOverride = require('method-override');


//confi mongoose
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParse.urlencoded({extended: true}));
app.use(methodOverride("_method"));


//create schema for database
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})
//model for db
var Blog = mongoose.model("Blog", blogSchema);


app.get("/", (req, res)=>{
    res.redirect("/blogs")
})

//get all items from db
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

//show 

app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundPost) => {
        if(err){
            res.render('/blogs')
        }
        else{
            res.render("show", {blog: foundPost})
        }
    })
})

//edit

app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundPost) => {
        if(err){
            res.render('/blogs')
        }
        else{
            res.render("edit", {blog: foundPost})
        }
    })
})


//update

app.put("/blogs/:id", (req, res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=> {
        if(err){
            res.redirect("/blogs")
        }
        else{
            res.redirect("/blogs/" + req.params.id)
        }
    })
})



app.delete("/blogs/:id", (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err)=> {
        if(err){
            res.redirect("/blogs")
        }
        else{
            res.redirect("/blogs")
        }
    })
})


app.listen(3000, ()=>{
    console.log('server running')
})