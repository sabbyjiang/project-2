const   express = require('express'),
        app = express(),
        mustache = require('mustache-express'),
        pgp = require('pg-promise'),
        bodyParser = require('body-parser'),
        PORT = process.env.PORT || 3000;

// express set up
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// body-parser setup
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.listen(PORT, () => console.log('Server is listening on port', PORT));