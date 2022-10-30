const { allow } = require('joi');
const joi = require('joi');

const registration = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().alphanum().min(8).max(50),
    confirmPassword: joi.ref('password')
});

const personalDetails = joi.object({
    name: joi.string().required().min(3).max(25),
    mobile: joi.number().required().min(1000000000).max(9999999999),
    dob: joi.date().required(),
    gender: joi.string().required().allow('male', 'female', 'other').lowercase(),
    address: {
        street: joi.string().required(),
        city: joi.string().required(),
        district: joi.string().required(),
        state: joi.string().required(),
        postal: joi.string().required()
    }
});
const jobDetails = joi.object({
    employeeId: joi.string().required(),
    department: joi.string().required(),
    email: joi.string().email().required(),
})
const bankDetails = joi.object({
    bankName: joi.string().required(),
    branch: joi.string().required(),
    accountNumber: joi.number().required(),
    IFSC_Code: joi.string().alphanum().required(),
});
module.exports = { registration, personalDetails, jobDetails, bankDetails };