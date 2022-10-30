const { date, number } = require('joi');
const mongoose = require('mongoose');
try {
    const conn = mongoose.connect('mongodb://localhost:27017/human-resource-management-system');
    let employee = new mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        joiningDate: {
            type: Date,
            default: mongoose.now()
        }
    });
    let personalDetails = new mongoose.Schema({
        eid: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        address: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            district: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            postal: {
                type: Number,
                required: true
            }
        }
    });
    let jobDetails = new mongoose.Schema({
        eid: {
            type: String,
            required: true
        },
        employeeId: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    });
    let bankDetails = new mongoose.Schema({
        eid: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        accountNumber: {
            type: Number,
            required: true
        },
        IFSC_Code: {
            type: String,
            required: true
        }
    })
    module.exports = {
        employees: mongoose.model('Employee', employee),
        personalDetails: mongoose.model('PersonalDetail',personalDetails),
        jobDetails: mongoose.model('JobDetail', jobDetails),
        bankDetails: mongoose.model('BankDetail', bankDetails)
    };
    console.log('database connected..');
} catch (error) {
    console.log('database connection error');
}