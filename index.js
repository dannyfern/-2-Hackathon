const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const app = new express();

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateCreatePostMiddleware = require('./middleware/storePost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

const Post = require('./DATABASE/models/Post');
const { nextTick } = require('process');
const storePost = require('./controllers/storePost');


mongoose.connect("mongodb://localhost:27017/jsHackathon", {useNewUrlParser: true, useUnifiedTopology: true });




//<-------------EXPRESS EDGE/BODY PARSER/FILE UPLOAD--------------------->
app.use(fileUpload())
app.use(express.static('public'));
app.use(expressEdge.engine);
app.set('views', `${__dirname}/views`);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/posts/store', validateCreatePostMiddleware)
app.use('/posts/store', storePost)
app.use(expressSession({
    secret: 'secret'
}))


//<----------------------ROUTES ----------------------------->

app.get('/posts/new', createPostController);
app.get('/', homePageController);
app.post('/posts/store', storePostController);
app.get('/post/:id', getPostController);
app.get('/auth/register', createUserController);
app.get('/auth/login', loginController);
app.post('/users/register', storeUserController);
app.post('/users/login', loginUserController)


app.get('/contact', (req,res) => {
    res.render('contact')
})


//<---------------- PORT ----------------->
app.listen(3000, () => {
    console.log('Application is listening on port 3000')
})