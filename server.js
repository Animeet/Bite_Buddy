const express = require('express');
const PORT = process.env.PORT || 3001;
const auth_routes = require('./controllers/auth_routes');
const private_routes = require('./controllers/private_routes');
const public_routes = require('./controllers/public_routes');
const db = require('./config/connection');
const { engine } = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: false} ));
app.use(express.static('public'));

app.engine('hbs', engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', [auth_routes, private_routes, public_routes]);

db.sync({ force: false }), then (() => {
    app.listen(PORT, () => console.log('Server listening on Port %s, PORT '))
});