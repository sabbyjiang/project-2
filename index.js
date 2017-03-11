const   express = require('express'),
        app = express(),
        mustache = require('mustache-express'),
        pgp = require('pg-promise'),
        bodyParser = require('body-parser'),
        passport = require('passport'),
        session = require('express-session'),
        cookieParser = require('cookie-parser'),
        flash = require('connect-flash'),
        logger = require('morgan'),
        bcrypt = require('bcrypt');
        PORT = process.env.PORT || 3000;

// express set up
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// passport set up
app.use(session({
        secret: 'keyboard cat', 
        resave: true,
        saveUninitialized: true
}));

app.use (passport.initialize());
app.use(passport.session());
app.use(logger('dev'));

// body-parser setup
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(flash());

const User = require('./models/user-model');
const LocalStrategy = require('passport-local').Strategy;

// Serialises the user's log in session
passport.serializeUser((user,done) => {
        done(null,user);
});

passport.deserializeUser((userObj, done) => {
        User.findByEmail(userObj.email)
                .then((user) => done(null,user))
                .catch((err) => {
                        console.log('ERROR: ', err);
                        return done(null, false);
                });
})

// For signing up a new user
passport.use(
        'local-signup',
        new LocalStrategy(
                {
                        usernameField: 'user[email]',
                        passwordField: 'user[password]',
                        passReqToCallback: true
                },
                (req, email, password, done) => {
                        User.create(req.body.user)
                        .then((user) => {
                                return done(null, user);
                        })
                        .catch((err) => {
                                console.log('Error: ', err);
                                return done(null, false);
                        });
                }
        )
);

// Checks login creditials
passport.use(
        'local-login',
        new LocalStrategy(
                {
                        usernameField: 'user[email]',
                        passwordField: 'user[password]',
                        passReqToCallback: true
                },
                (req, email, password, done) => {
                        User.findByEmail(email)
                                .then(user => {
                                        if(user){
                                                const isAuthed = bcrypt.compareSync(password, user.password_digest);
                                                if(isAuthed){
                                                        return done(null, user);
                                                } else {
                                                        return done(null, false);
                                                }
                                        } else {
                                                return done(null, false);
                                        }
                                });
                }
        )
);


app.use('/', require('./router'));

app.listen(PORT, () => console.log('Server is listening on port', PORT));