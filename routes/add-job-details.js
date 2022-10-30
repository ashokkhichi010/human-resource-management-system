const express = require('express');
const sendResponse = require('../controllers/sendResponse');
const validation = require('../controllers/validations/employee.js');
const { jobDetails } = require('../models/employees');
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.eid) {
        let jobDetail = await jobDetails.findOne({eid: req.session.eid});
        res.render('add-job-details', sendResponse(200, '', { jobDetail: jobDetail})); 
    } else {
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try {
        if (req.session.eid) {
            let requestData = await validation.jobDetails.validateAsync(req.body);
            console.log(requestData);
            let jobDetail = await jobDetails.updateOne({eid: req.session.eid}, requestData);
            console.log(jobDetail);
            res.render('add-job-details', sendResponse(200, 'ok', { jobDetail: requestData }));
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.render('add-job-details', sendResponse(400, error.message, { error: error }, false, false));
    }
})

module.exports = router;