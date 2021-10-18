const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    lastname: {
        type: String
    },
    firstname: {
        type: String
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: "car"
    }
})
const Driver = mongoose.model('driver', driverSchema);
module.exports = Driver;