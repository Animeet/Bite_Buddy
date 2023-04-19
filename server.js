const express = require('express');
const PORT = process.env.PORT || 3001;
const api_routes = require('./controllers/api_routes');
const db = require('./config/connection');
const { engine } = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(express.static('public'));

app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', api_routes);

db.sync({ force: false }), then (() => {
    app.listen(PORT, () => console.log('Server listening on Port %s, PORT '))
});