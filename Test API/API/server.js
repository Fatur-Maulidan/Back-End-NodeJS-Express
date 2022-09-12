const express = require('express'); // server software
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization

const User = require('./user.js'); // User Model
const port = 3000;
const app = express();

// Configure Sessions Middleware
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Configure Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Route to Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/static/register.html');
})

app.get('/logout', (req, res) => {
    res.sendFile(__dirname + '/static/')
})

// Route to Dashboard
app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
    and your session expires in ${req.session.cookie.maxAge} 
    milliseconds.<br><br>
    <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
});

// Route to Secret Page
app.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.sendFile(__dirname + '/static/secret-page.html');
});

// Route to Log out
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

app.get('/get-data', function(req, res){
    User.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err.message);
    })
})

app.get('/data/:id', function(req, res){
    User.findById(req.params.id).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    })
});

app.patch('/data/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id, {username:'Ari'}).then((result) => {
        console.log('Data Successfully Updated!')
    }).catch((err) => {
        console.log(err )
    })
});

app.post('/data/:id', function(req, res){
    User.findByIdAndDelete(req.params.id).then((result) => {
        console.log('Data Successfully Deleted!')
    }).catch((err) => {
        console.log(err)
    })
});

// Post Route: /login
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	// console.log(req.user)
	res.redirect('/dashboard');
});

app.post('/register', function(req, res) {
    if(req.body.password == req.body.confirm){
        User.register({ username: req.body.nama, active: false }, req.body.password);
        res.redirect('/')
    } else {
        res.redirect('/register')
    }
})

// assign port

app.listen(port, () => console.log(`This app is listening on port ${port}`));