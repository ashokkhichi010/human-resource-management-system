/*  

HRM (Human Resource Management) System

- Login

- Staff Module
  In this we will take staff/employee Personal Detail, Office Details and Bank Details etc

*/

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const server = express();

server.set('view engine', 'ejs');

// server.use(bodyParser.json({}));
server.use(bodyParser.urlencoded({extended: false}));
server.use(session({
  secret: 'ashokkumar',
  resave: false,
  saveUninitialized: true
}));

server.get('/', (req, res) => {
    res.render('home');
    // console.log('welcome ashok');
    // res.send('Hello ashok kumar');
});

const login = require('./routes/login.js');
server.use('/login', login);

const registration = require('./routes/registration.js');
server.use('/registration', registration);

const dashboard = require('./routes/dashboard.js');
server.use('/dashboard', dashboard);

const addPersonalDetails = require('./routes/add-personal-details.js');
server.use('/dashboard/add-personal-details', addPersonalDetails);

const addJobDetails = require('./routes/add-job-details.js');
server.use('/dashboard/add-job-details', addJobDetails);

const addBankDetails = require('./routes/add-bank-details.js');
server.use('/dashboard/add-bank-details', addBankDetails);

server.get('/logout', (req, res) => {
  req.session.eid = null;
  res.redirect('/');
})
server.listen(8080, () => console.log('server is running at http://localhost:8080'));