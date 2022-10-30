const express = require('express');
const sendResponse = require('../controllers/sendResponse');
const validation = require('../controllers/validations/employee.js');
const { bankDetails } = require('../models/employees');
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.eid) {
        let bankDetail = await bankDetails.findOne({eid: req.session.eid});
        res.render('add-bank-details', sendResponse(200, '', { bankDetail: bankDetail})); 
    } else {
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try {
        if (req.session.eid) {
            let requestData = await validation.bankDetails.validateAsync(req.body);
            let bankDetail = await bankDetails.updateOne({eid: req.session.eid}, requestData);
            console.log(bankDetail);
            res.render('add-bank-details', sendResponse(200, 'OK', { bankDetail: requestData }));
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.render('add-bank-details', sendResponse(400, error.message, { error: error }, false, false));
    }
})

module.exports = router;