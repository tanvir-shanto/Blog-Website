require('dotenv').config();

const express = require('express');
const app = express();

const expressLayout = require('express-ejs-layouts');
//const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const PORT = 5000 || process.env.PORT;

// Connect to Database
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
//app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));

app.use(express.static('public'));

app.use(expressLayout); // Use the ejs layout middleware
app.set('layout', './layouts/main'); // Set the main layout for the app
app.set('view engine', 'ejs'); // Set the ejs view engine

app.use("/", require('./server/routes/main'));
app.use("/", require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})