const path = require('path');

const expressEdge = require('express-edge');

const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser')

const fileUpload = require('express-fileupload')

const app = new express();

const Post = require('./DATABASE/models/Post')

mongoose.connect("mongodb://localhost:27017/jsHackathon", {useNewUrlParser: true, useUnifiedTopology: true });





//<-------------EXPRESS EDGE/BODY PARSER/FILE UPLOAD--------------------->
app.use(fileUpload())
app.use(express.static('public'));
app.use(expressEdge.engine);
app.set('views', `${__dirname}/views`);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//<----------------------ROUTES ----------------------------->

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post("/posts/store", (req, res) => {
        const { image } = req.files
        
        image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
            Post.create(req.body, (error, post) => {
                res.redirect("/");
            });
        })
    })
    



app.get('/', async (req,res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    })
})

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/post/:id', async (req,res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})

app.get('/contact', (req,res) => {
    res.render('contact')
})


//<---------------- PORT ----------------->
app.listen(3000, () => {
    console.log('Application is listening on port 3000')
})