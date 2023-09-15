require('dotenv').config();

const express = require('express');
const app = express();

const expressLayout = require('express-ejs-layouts');

const PORT = 5000 || process.env.PORT;

app.use(express.static('public'));

app.use(expressLayout); // Use the ejs layout middleware
app.set('layout', './layouts/main'); // Set the main layout for the app
app.set('view engine', 'ejs'); // Set the ejs view engine

app.use("/", require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})