const express = require('express');
const app = express();
require('./db/mongoose');
const contactsRoute = require('./routers/contact');
const groupRoute = require('./routers/group');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'index', layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'hbs');

app.use(contactsRoute);
app.use(groupRoute);


let port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("Server is up on port", port);
})