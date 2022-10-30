const express = require('express');
const sendResponse = require('../controllers/sendResponse');
const validation = require('../controllers/validations/employee.js');
const {employees, personalDetails, jobDetails, bankDetails } = require('../models/employees');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('registration', {message: ' '});
    // res.render('registration','registration form');
});

router.post('/', async (req, res) => {
    try {
        let requestData = await validation.registration.validateAsync(req.body);
        let isEmployee = await employees.findOne({email: requestData.email});
        if (isEmployee) {
            res.render('registration',sendResponse(400, `${requestData.email} already registred`,{employee: requestData}, false, false));
        } else {
            let employee = new employees(requestData);
            await employee.save().then(res.render('registration',sendResponse(200, 'data inserted..', {employee: requestData})));
            console.log(employee._id);
            let personalData = {
                eid: employee._id,
                name: ' ',
                mobile: ' ',
                dob: 00-00-0000,
                gender: ' ',
                email: employee.email,
                address: {
                    street:' ',
                    city:' ',
                    district:' ',
                    state:' ',
                    postal:' '
                }
            }
            let jobData = {
                eid: employee._id,
                employeeId: employee._id,
                department:' ',
                email:' ',
                joiningData:employee.joiningDate
            }
            let bankData = {
                eid: employee._id,
                bankName:' ',
                branch:' ',
                accountNumber:' ',
                IFSC_Code:' '
            }
            let personalDetail = new personalDetails(personalData);
            personalDetail.save();
            let jobDetail = new jobDetails(jobData);
            jobDetail.save();
            let bankDetail = new bankDetails(bankData);
            bankDetail.save();
        }
    } catch (error) {
        res.render('registration',sendResponse(400, error.message, error, false, false));
    }
});

module.exports = router;