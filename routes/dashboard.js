const express = require('express');
const sendResponse = require('../controllers/sendResponse');
const { employees, personalDetails, jobDetails, bankDetails } = require('../models/employees.js');  // this is a 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log(req.session.eid);
        // res.send(req.session.eid);
        if (req.session.eid) {
            let employee = await employees.findOne({ _id: req.session.eid });
            let personalDetail = await personalDetails.findOne({ eid: req.session.eid });
            let jobDetail = await jobDetails.findOne({ eid: req.session.eid });
            let bankDetail = await bankDetails.findOne({ eid: req.session.eid });
            
            res.render('dashboard', sendResponse(200, 'data found', {
                employee: employee,
                personalDetail: personalDetail,
                jobDetail: jobDetail,
                bankDetail: bankDetail
            }));
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.render('dashboard', sendResponse(400, error.message, { error: error }, false, false));
    }
});

module.exports = router;