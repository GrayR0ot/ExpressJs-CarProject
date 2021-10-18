const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    lastname: {
        type: String
    },
    firstname: {
        type: String
    },
    car_registration: {
        type: String
    }
})
const Driver = mongoose.model('driver', driverSchema);
module.exports = Driver;