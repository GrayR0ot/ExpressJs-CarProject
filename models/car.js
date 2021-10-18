const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    registration: {
        type: String,
        required: true
    },
    model: {
        type: String
    },
    brand: {
        type: String
    }
});
const Car = mongoose.model('car', carSchema);
module.exports = Car;