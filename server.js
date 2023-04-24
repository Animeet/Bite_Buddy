require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const routes = require('./controllers');
const db = require('./config/connection');
const { engine } = require('express-handlebars');

const app = express();

app.engine('hbs', engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/', routes);

db.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Server listening on Port %s', PORT))
});