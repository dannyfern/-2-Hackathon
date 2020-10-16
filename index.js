const path = require('path');

const expressEdge = require('express-edge');

const express = require('express');

const app = new express();

app.use(express.static('public'));
app.use(expressEdge.engine);


app.set('views', `${__dirname}/views`);

//<----------------------ROUTES ----------------------------->

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/post', (req,res) => {
    res.render('post')
})

app.get('/contact', (req,res) => {
    res.render('contact')
})


//<---------------- PORT ----------------->
app.listen(3000, () => {
    console.log('Application is listening on port 3000')
})