const express = require('express');
const validation = require('../controllers/validations/employee.js');
const { employees } = require('../models/employees.js');  // this is a 
const sendResponse = require('../controllers/sendResponse.js');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login', { message: '' });
    // res.send('login');
});

router.post('/', async (req, res) => {
    try {
        let requestData = req.body;
        // let requestData = await validation.registration.validateAsync(req.body);
        console.log(requestData.email);
        let isEmployee = await employees.findOne({ email: requestData.email });
        console.log(isEmployee);
        if (isEmployee) {
            if (requestData.password === isEmployee.password) {
                req.session.eid = isEmployee['_id'];
                res.redirect('/dashboard');
            } else {
                res.render('login', { message: 'incorrect password' });
            }
        } else {
            res.render('login', sendResponse(400, `${requestData.email} not registred`, { error: requestData }, false, false));
        }
    } catch (error) {
        // console.log(error);
        res.render('login', sendResponse(400, error.message, { error: error }, false, false));
    }
});
// console.log(employee);
module.exports = router