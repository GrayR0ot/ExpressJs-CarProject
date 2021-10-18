const Car = require('../models/car');

exports.getCars = async function(req, res) {
    const findMany = Car.find({}, (fail, results) => {
        if(results) {
            return res.status(200).json(results);
        }
        if(fail) {
            console.log(fail);
            return res.status(200).json({error: fail});
        }
    });
}

exports.getCarByRegistration = async function(req, res) {
    const findOne = Car.find({registration: req.params.registration}, (fail, result) => {
        if(result) {
            return res.status(200).json(result);
        }
        if(fail) {
            console.log(fail);
            //return res.status(200).json({error: fail});
            return res.status(200).json({error: 'Unable to find car with registration ' + req.params.registration + ' id!'})
        }
    });
}

exports.updateCarByRegistration = async function(req, res) {
    const findOne = Car.find({registration: req.params.registration}, (fail, result) => {
        if(result) {
            const updateOne = Car.updateOne({model: req.body.model, brand: req.body.brand}, (fail, success) => {
                if(success) {
                    return res.status(200).json({success: 'Successfully updated ' + req.params.registration + ' car!'});
                }
                if(fail) {
                    console.log(fail);
                    return res.status(200).json({success: 'Unable to update ' + req.params.registration + ' car!'});
                }
            });
        }
        if(fail) {
            console.log(fail);
            return res.status(200).json({error: 'Unable to update this car!'});
        }
    });
}

exports.deleteCarByRegistration = async function(req, res) {
    const deleteOne = Car.deleteOne({registration: req.params.registration}, (fail, success) => {
        if (success) {
            if(success.deletedCount > 0) {
                return res.status(200).json({success: 'Successfully deleted car ' + req.params.registration + ' !'});
            } else {
                return res.status(200).json({success: 'This car does not exist!'});
            }
        }
        if (fail) {
            console.log(fail);
            return res.status(200).json({success: 'This car does not exist!'});
        }
    })
}

exports.createCar = async function(req, res) {
    const data = req.body;
    const newCar = {
        registration: data.registration,
        model: data.model,
        brand: data.brand
    }
    const createCar = Car.insertMany(newCar, (fail, success) => {
        if(success) {
            if(success.length > 0) {
                return res.status(200).json({success: 'Successfully created car with id #' + success[0]._id + ' !'});
            } else {
                return res.status(200).json({error: 'Unable to create the car !'});
            }
        }
        if(fail) {
            console.log(fail);
            if(fail.name === 'ValidationError') {
                return res.status(200).json({error: '`registration` fild is required!'});
            } else {
                return res.status(200).json({error: fail.name});
            }
        }
    })
}