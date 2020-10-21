const expressEdge = require('express-edge');
const express = require('express');
const edge = require('edge.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const app = new express();

mongoose.connect("mongodb://localhost:27017/jsHackathon", {useNewUrlParser: true, useUnifiedTopology: true });


const mongoStore = connectMongo(expressSession)
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateCreatePostMiddleware = require('./middleware/storePost')
const auth = require("./middleware/auth")
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logoutUser')
const redirectAuth = require('./middleware/redirectAuth')
const Post = require('./DATABASE/models/Post');
const { nextTick } = require('process');
const storePost = require('./controllers/storePost');
const { connect } = require('http2');



//<-------------EXPRESS EDGE/BODY PARSER/FILE UPLOAD--------------------->
app.use(fileUpload())
app.use(express.static('public'));
app.use(expressEdge.engine);
app.set('views', `${__dirname}/views`);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/posts/store', validateCreatePostMiddleware)
app.use('/posts/store', storePost)
app.use(connectFlash())
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))
app.use('*', (req ,res ,next) => {
    edge.global('auth', req.session.userId)
    next()
})


//<----------------------ROUTES ----------------------------->

app.get('/posts/new', auth, createPostController);
app.get('/', homePageController);
app.get('/auth/logout' , redirectAuth, logoutController);
app.post('/posts/store', auth, storePost, storePostController);
app.get('/post/:id', getPostController);
app.get('/auth/register', redirectAuth, createUserController);
app.get('/auth/login', redirectAuth, loginController);
app.post('/users/register', redirectAuth, storeUserController);
app.post('/users/login', redirectAuth, loginUserController)



app.get('/contact', (req,res) => {
    res.render('contact')
})


//<---------------- PORT ----------------->
app.listen(3000, () => {
    console.log('Application is listening on port 3000')
})