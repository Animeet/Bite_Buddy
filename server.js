const express = require('express');
const PORT = process.env.PORT || 3001;
const api_routes = require('./controllers/api_routes');
const auth_routes = require('./controllers/auth_routes');
const private_routes = require('./controllers/private_routes');
const public_routes = require('./controllers/public_routes');
const db = require('./config/connection');
const session = require('express-session');
const { engine } = require('express-handlebars');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.engine('hbs', engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', [api_routes, auth_routes, private_routes, public_routes]);

db.sync({ force: false }), then (() => {
    app.listen(PORT, () => console.log('Server listening on Port %s', PORT))
});