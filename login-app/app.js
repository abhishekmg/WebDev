const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

//connct to mongoose

mongoose.connect('mongodb://localhost/login-app')
.then(() => {
    console.log('mongoose connected')
}).catch(err => {
    console.log(err)
})

// Passport Config
require('./config/passport')(passport);

//middlewares
//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Express session midleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//falsh
app.use(flash())
//global variables
app.use(function(req,res,next)  {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.user = req.user || null
    next()
})

//load routes
const user = require('./routes/user')

//use routes
app.use('/users', user)


//routes
app.get('/' , (req,res) => {
    res.render('home')
})



//port
port = 3000

app.listen(port, () => {
    console.log(`running on port ${port}`)
})