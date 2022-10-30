const express = require('express');
const sendResponse = require('../controllers/sendResponse');
const validation = require('../controllers/validations/employee.js');
const { personalDetails } = require('../models/employees');
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.eid){
        let personalDetail = await personalDetails.findOne({eid: req.session.eid});
        res.render('add-personal-details', sendResponse(200, '', { personalDetail: personalDetail})); 
    }else{
        res.redirect('/');
    }
});

router.post('/', async (req,res) => {
    try {
        if (req.session.eid){
            console.log(req.body);
            let requestData = {
                name: req.body.name,
                mobile: req.body.mobile,
                dob: req.body.dob,
                gender:req.body.gender,
                address: {
                    street: req.body.street,
                    city: req.body.city,
                    district: req.body.district,
                    state: req.body.state,
                    postal: req.body.postal 
                }
            }
            requestData = await validation.personalDetails.validateAsync(requestData);
            console.log(requestData);
            let personalDetail = await personalDetails.updateOne({eid: req.session.eid}, requestData);
            console.log(personalDetail);
            res.render('add-personal-details',sendResponse(200,'ok', {personalDetail: requestData}));
        }else{
            res.redirect('/');
        }
    } catch (error) {
        res.render('add-personal-details',sendResponse(400, error.message, {error: error}, false, false));
    }
})

module.exports = router;